import React, { useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  ConvexPolyhedronProps,
  Physics,
  Triplet,
  useConvexPolyhedron,
  usePlane
} from '@react-three/cannon'
import { DiceType, getDiceDefinition } from '../polyhedron-config'
import { BufferGeometry, Mesh, PolyhedronGeometry } from 'three'
import { Geometry } from 'three-stdlib/deprecated/Geometry'

// Returns legacy geometry vertices, faces for ConvP
function toConvexProps(
  bufferGeometry: BufferGeometry
): ConvexPolyhedronProps['args'] {
  const geo = new Geometry().fromBufferGeometry(bufferGeometry)
  // Merge duplicate vertices resulting from glTF export.
  // Cannon assumes contiguous, closed meshes to work
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

export const Plane = (): JSX.Element => {
  const ref = useRef<Mesh>(null!)
  usePlane(
    () => ({
      type: 'Static',
      rotation: [-Math.PI / 2, 0, 0],
      position: [0, -2, 1]
    }),
    ref
  )
  return (
    <mesh ref={ref}>
      <planeBufferGeometry args={[10, 10]} />
      <shadowMaterial color={'#171717'} />
    </mesh>
  )
}

const Dice = ({ position, rotation, type }: Props): JSX.Element => {
  const ref = useRef<Mesh>(null!)
  const definition = getDiceDefinition(type)
  const geometry = new PolyhedronGeometry(
    definition.verticies,
    definition.indices
  )

  const args = useMemo(() => toConvexProps(geometry), [geometry])
  useConvexPolyhedron(() => ({ args, mass: 100, position, rotation }), ref)

  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh rotation={[0, 1, 0]} ref={ref}>
      <polyhedronGeometry
        args={[definition.verticies, definition.indices, 1, 0]}
      />
      <meshPhysicalMaterial color='rebeccapurple' />
    </mesh>
  )
}

const HelloWorld = (): JSX.Element => {
  const [dicetype, setDiceType] = useState<DiceType>('d20')

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <button onClick={() => setDiceType('d20')}>D20</button>
      <button onClick={() => setDiceType('d8')}>D8</button>
      <button onClick={() => setDiceType('d6')}>D6</button>
      <Canvas shadows camera={{ fov: 50, position: [-1, 1, 5] }}>
        <pointLight position={[10, 10, 10]} />
        <ambientLight />
        <Physics gravity={[0, -5, 0]}>
          <Plane />
          <Dice
            type={dicetype}
            rotation={[0.5, 0.4, -1]}
            position={[0, 10, 0]}
          />
        </Physics>
      </Canvas>
    </div>
  )
}

export default HelloWorld
