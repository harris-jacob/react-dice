import {
  ConvexPolyhedronProps,
  Triplet,
  useConvexPolyhedron
} from '@react-three/cannon'
import React, { useEffect } from 'react'
import { useMemo, useRef } from 'react'
import { BufferGeometry, Mesh, PolyhedronGeometry, Vector3 } from 'three'
import { Geometry } from 'three-stdlib/deprecated/Geometry'
import { getDiceDefinition } from '../lib/polyhedron-config'
import { DiceType } from '../types'
import { multiply } from '../lib/vector'

interface Props {
  position: Triplet
  type: DiceType
  rotation: Triplet
  radius: number
}

export const Dice = ({
  position,
  rotation,
  type,
  radius
}: Props): JSX.Element => {
  const ref = useRef<Mesh>(null!)
  const definition = getDiceDefinition(type)
  const geometry = new PolyhedronGeometry(
    definition.verticies,
    definition.indices,
    radius
  )

  const forceDir = new Vector3()
    .sub(new Vector3(position[0], position[1], position[2]))
    .normalize()

  const args = useMemo(() => toConvexProps(geometry), [geometry])

  const [_, api] = useConvexPolyhedron(
    () => ({ args, mass: 0.1, position, rotation }),
    ref
  )

  useEffect(() => {
    const force = multiply(forceDir.toArray(), [200, 200, 0])
    api.applyLocalForce(force, [0, 0, 0])
  }, [])

  const poly = (
    <polyhedronGeometry
      args={[definition.verticies, definition.indices, radius, 0]}
    />
  )

  return (
    <mesh position={position} rotation={rotation} ref={ref}>
      <meshBasicMaterial color='purple' />
      {poly}
      <mesh>
        <meshBasicMaterial wireframe transparent color='black' />
        {poly}
      </mesh>
    </mesh>
  )
}

function toConvexProps(
  bufferGeometry: BufferGeometry
): ConvexPolyhedronProps['args'] {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry)
  geo.mergeVertices()
  return [
    geo.vertices.map((v) => [v.x, v.y, v.z]),
    geo.faces.map((f) => [f.a, f.b, f.c]),
    []
  ]
}
