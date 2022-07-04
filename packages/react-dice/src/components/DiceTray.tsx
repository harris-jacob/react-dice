import { Debug, Physics, Triplet } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import { DiceType } from '../types'
import { defaultConfig } from '../lib/dice-config'
import React from 'react'
import create from 'zustand'
import { BoundingBox } from './BoundingBox'
import { Dice } from './Dice'
import { useTransition } from '@react-spring/three'
import { uniqueId, position, rotation } from '../state/queue-roll'
import { useMeasure } from '../hooks/useMeasure'

interface Roll {
  id: string
  position: Triplet
  rotation: Triplet
  type: DiceType
}

interface DiceState {
  rolls: Array<Roll>
  addRoll: (roll: Roll) => void
  removeRoll: (id: string) => void
}

const useStore = create<DiceState>((set) => ({
  rolls: [],
  addRoll: (roll: Roll) => set((state) => ({ rolls: [...state.rolls, roll] })),
  removeRoll: (id: string) =>
    set((state) => ({ rolls: state.rolls.filter((v) => v.id !== id) }))
}))

export const useRoll = (type: DiceType) => {
  const addRoll = useStore((state) => state.addRoll)

  return () =>
    addRoll({
      id: uniqueId(),
      rotation: rotation(),
      position: position(40, 20, -17),
      type
    })
}

const ZOOM = 40

export const DiceTray = (): JSX.Element => {
  const { rolls, removeRoll } = useStore()
  const screenSize = useMeasure()

  const transition = useTransition(rolls, {
    from: { scale: 1 },
    enter: { scale: 1 },
    leave: { scale: 0 }
  })

  return (
    <Canvas orthographic camera={{ zoom: ZOOM, near: 1, far: 1000 }}>
      <ambientLight />
      <spotLight
        intensity={1}
        position={[0, 0, 50]}
        angle={0.5}
        castShadow
        penumbra={0.5}
      />
      <Physics gravity={[0, 0, -10]}>
        <Debug>
          <BoundingBox
            width={screenSize.width / ZOOM}
            height={screenSize.height / ZOOM}
          />
          {transition(({ scale }, v) => (
            <Dice
              onResult={(result) => console.log(result)}
              onStop={() => removeRoll(v.id)}
              scale={scale}
              radius={2}
              key={v.id}
              type={v.type}
              rotation={[0, 0, 0]}
              position={v.position}
              config={defaultConfig}
            />
          ))}
        </Debug>
      </Physics>
    </Canvas>
  )
}
