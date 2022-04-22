import {
  ConvexPolyhedronProps,
  Triplet,
  useConvexPolyhedron
} from '@react-three/cannon'
import React, { useEffect } from 'react'
import { useMemo, useRef } from 'react'
import { BufferGeometry, Mesh, PolyhedronGeometry } from 'three'
import { Geometry } from 'three-stdlib/deprecated/Geometry'
import { getDiceDefinition } from '../polyhedron-config'
import { DiceType } from '../types'

interface Props {
  position: Triplet
  type: DiceType
  rotation: Triplet
}

export const Dice = ({ position, rotation, type }: Props): JSX.Element => {
  const ref = useRef<Mesh>(null!)
  const definition = getDiceDefinition(type)
  const geometry = new PolyhedronGeometry(
    definition.verticies,
    definition.indices
  )

  const args = useMemo(() => toConvexProps(geometry), [geometry])

  const [_, api] = useConvexPolyhedron(
    () => ({ args, mass: 0.1, position, rotation }),
    ref
  )

  const velocity = useRef([0, 0, 0])
  useEffect(() => {
    api.applyLocalForce([200, 0, -200], [1, 0, 0])
    const unsub = api.velocity.subscribe((v) => (velocity.current = v))

    return unsub
  }, [])

  const poly = (
    <polyhedronGeometry
      args={[definition.verticies, definition.indices, 2, 0]}
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
