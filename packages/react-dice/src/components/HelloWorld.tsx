import React, {
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { Canvas } from '@react-three/fiber'
import {
  ConvexPolyhedronProps,
  Debug,
  DebugProps,
  Physics,
  Triplet,
  useConvexPolyhedron
} from '@react-three/cannon'
import { DiceType, getDiceDefinition } from '../polyhedron-config'
import { BufferGeometry, Mesh, PolyhedronGeometry } from 'three'
import { Geometry } from 'three-stdlib/deprecated/Geometry'
import { BoundingBox } from './BoundingBox'

/** Patched until @react-three/cannon upgrades to react-18 types */
const DebugPatched = Debug as any as React.FC<PropsWithChildren<DebugProps>>

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

interface Props {
  position: Triplet
  type: DiceType
  rotation: Triplet
}

const Dice = ({ position, rotation, type }: Props): JSX.Element => {
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

const HelloWorld = (): JSX.Element => {
  return (
    <Canvas orthographic camera={{ zoom: 42 }}>
      <ambientLight />
      <Physics gravity={[0, 0, -10]}>
        {/* <DebugPatched color='black' scale={1.1}> */}
        <BoundingBox width={40} height={20} />
        <Dice type={'d20'} rotation={[0, 0, 0]} position={[0, 0, -9]} />
        {/* </DebugPatched> */}
      </Physics>
    </Canvas>
  )
}

export default HelloWorld
