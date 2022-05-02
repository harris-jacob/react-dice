import { ConvexPolyhedronProps } from '@react-three/cannon'
import { useConvexPolyhedron } from '@react-three/cannon'
import React, { useEffect, useMemo } from 'react'
import { useRef } from 'react'
import { BufferGeometry, Mesh, PolyhedronGeometry, Vector3 } from 'three'
import { Geometry } from 'three-stdlib'
import { getDiceDefinition } from '../lib/polyhedron-config'
import { multiply } from '../lib/vector'
import { DeltrahedronDiceGeometry } from './DeltahedronDiceGeometry'
import { DiceProps } from './props'

export const Dice = ({
  type,
  radius,
  position,
  rotation,
  ...rest
}: DiceProps): JSX.Element => {
  const ref = useRef<Mesh>(null!)

  const definition = getDiceDefinition(type)

  const args = useMemo(() => {
    const geometry = new PolyhedronGeometry(
      definition.verticies,
      definition.indices,
      radius
    )

    return toConvexProps(geometry)
  }, [radius, definition])

  const [, api] = useConvexPolyhedron(
    () => ({ args, mass: 0.1, position, rotation }),
    ref
  )

  useEffect(() => {
    const forceDir = new Vector3()
      .sub(new Vector3(position[0], position[1], position[2]))
      .normalize()
    const force = multiply(forceDir.toArray(), [200, 200, 0])
    api.applyLocalForce(force, [0, 0, 0])
  }, [position, api])

  switch (type) {
    case 'd4':
    case 'd8':
    case 'd20':
      return (
        <DeltrahedronDiceGeometry
          ref={ref}
          type={type}
          position={position}
          rotation={rotation}
          radius={radius}
          {...rest}
        />
      )

    case 'd10':
      throw new Error('D10 not implememented')
    case 'd12':
      throw new Error('D12 not implememented')
    case 'd6':
      throw new Error('D6 not implememented')

    default:
      throw new Error('Unknown dice type')
  }
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
