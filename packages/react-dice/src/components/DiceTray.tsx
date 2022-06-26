import { useTransition } from '@react-spring/three'
import { Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import React from 'react'
import { useMeasure } from '../hooks/useMeasure'
import { defaultConfig } from '../lib/dice-config'
import { BoundingBox } from './BoundingBox'
import { Dice } from './Dice'
import { useStore } from '../hooks/useStore'

const ZOOM = 40

export const useRoll = () => {
  return useStore((state) => state.addDice)
}

export const DiceTray = (): JSX.Element => {
  const dice = useStore((state) => state.dice)
  const screenSize = useStore((state) => state.screen)
  const setScreenSize = useStore((state) => state.setScreen)
  useMeasure((x, y) => setScreenSize(x / ZOOM, y / ZOOM))

  const transition = useTransition(dice, {
    from: { scale: 1 },
    enter: { scale: 1 },
    leave: { scale: 0 }
  })

  return (
    <Canvas orthographic camera={{ zoom: ZOOM, near: 1, far: 50 }}>
      <ambientLight />
      <spotLight
        intensity={1}
        position={[0, 0, 50]}
        angle={0.5}
        castShadow
        penumbra={0.5}
      />
      <Physics gravity={[0, 0, -10]}>
        <BoundingBox width={screenSize.x} height={screenSize.y} />
        {transition(({ scale }, v) => {
          console.log(v)
          return (
            <Dice
              onResult={(res) => console.log(res)}
              scale={scale}
              radius={2}
              key={v.id}
              type={v.type}
              rotation={[0, 0, 0]}
              position={v.position}
              config={defaultConfig}
            />
          )
        })}
      </Physics>
    </Canvas>
  )
}
