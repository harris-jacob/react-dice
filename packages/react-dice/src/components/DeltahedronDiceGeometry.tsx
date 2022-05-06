import React, { forwardRef, useMemo } from 'react'
import { Matrix4, Mesh, Quaternion, Triangle, Vector3 } from 'three'
import { getVertexByIndex } from '../lib/geometry-helpers'
import { Text } from '@react-three/drei'
import { DiceGeometryProps } from './props'
import { getDiceDefinition } from '../lib/polyhedron-config'
import { TextConfig } from '../lib/dice-config'

/**
 * A deltahedron is a polyhedron whose faces are all equalateral triangles
 * In the dice world these are: d4, d8, d20. For these dice, we can handle
 * the positioning of dice numbers in a generic way (by finding the midpoint
 * of each triangle buffer)
 */
export const DeltrahedronDiceGeometry = forwardRef<Mesh, DiceGeometryProps>(
  ({ type, position, rotation, radius, config }, ref) => {
    const definition = useMemo(() => getDiceDefinition(type), [type])

    const poly = (
      <polyhedronGeometry
        args={[definition.verticies, definition.indices, radius, 0]}
      />
    )
    return (
      <mesh castShadow position={position} rotation={rotation} ref={ref}>
        (
        <meshPhysicalMaterial
          color={config.color}
          polygonOffset
          polygonOffsetFactor={10}
          envMapIntensity={0.4}
          clearcoat={0.8}
          clearcoatRoughness={0}
          roughness={1}
          metalness={0}
        />
        {createText(
          definition.verticies,
          definition.indices,
          radius,
          config.textConfig
        )}
        {poly}
      </mesh>
    )
  }
)

/**
 * The logic here is to iterate through indices (which in the case of Deltahedrons
 * directly map to faces), and transform text such that it is centered and parallel
 * to each face
 *
 * TODO: in a D4 the text is usually not at the center of the face but toward one of the edges
 */
function createText(
  vertices: number[],
  indices: number[],
  radius: number,
  textConfig?: TextConfig
) {
  const textElems: JSX.Element[] = []

  for (let i = 0; i < indices.length; i += 3) {
    const a = applyRadius(getVertexByIndex(vertices, indices[i]), radius)
    const b = applyRadius(getVertexByIndex(vertices, indices[i + 1]), radius)
    const c = applyRadius(getVertexByIndex(vertices, indices[i + 2]), radius)

    const position = getCenterOfFace(a, b, c)
    const matrix = new Matrix4().setPosition(position)
    matrix.lookAt(position, new Vector3(), new Vector3(0, 1, 0))

    const rotation = new Quaternion()
    matrix.decompose(position, rotation, new Vector3())
    textElems.push(
      <Text
        key={i}
        matrix={matrix}
        quaternion={rotation}
        position={position}
        fontSize={0.3}
        {...textConfig}
      >
        {i / 3 + 1}
      </Text>
    )
  }

  return textElems
}

function applyRadius(vertex: Vector3, radius: number): Vector3 {
  return vertex.normalize().multiplyScalar(radius)
}

function getCenterOfFace(a: Vector3, b: Vector3, c: Vector3): Vector3 {
  const center = new Vector3()
  new Triangle(a, b, c).getMidpoint(center)

  return center
}
