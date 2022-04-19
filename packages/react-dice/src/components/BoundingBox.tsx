import { Triplet, usePlane } from '@react-three/cannon'
import React, { useRef } from 'react'
import { Mesh } from 'three'

interface Props {
  width: number
  height: number
}

/**
 * Extension of plane that surrounds canvas with a bounding box
 * orthogonal to Z to contain dice
 */
export const BoundingBox = ({ width, height }: Props): JSX.Element => {
  return (
    <>
      <Plane position={[0, 0, -10]} rotation={[0, 0, 0]} />
      <Plane position={[width / 2, 0, -10]} rotation={[0, -Math.PI / 2, 0]} />
      <Plane position={[-width / 2, 0, -10]} rotation={[0, Math.PI / 2, 0]} />
      <Plane position={[0, height / 2, -10]} rotation={[Math.PI / 2, 0, 0]} />
      <Plane position={[0, -height / 2, -10]} rotation={[-Math.PI / 2, 0, 0]} />
    </>
  )
}

interface PlaneProps {
  position: Triplet
  rotation: Triplet
}

export const Plane = ({ position, rotation }: PlaneProps): JSX.Element => {
  const ref = useRef<Mesh>(null!)
  usePlane(
    () => ({
      type: 'Static',
      position,
      rotation
    }),
    ref
  )
  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      <planeBufferGeometry args={[10, 10]} />
      {/* <meshPhysicalMaterial color='blue' /> */}
      <shadowMaterial color={'#171717'} />
    </mesh>
  )
}
