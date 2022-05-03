import { Physics } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useCallback, useEffect, useReducer } from 'react'
import { DiceContext } from '../DiceContext'
import { useMeasure } from '../hooks/useMeasure'
import { defaultConfig } from '../lib/dice-config'
import { reduce, RootState } from '../state/state'
import { DiceType } from '../types'
import { BoundingBox } from './BoundingBox'
import { Dice } from './Dice'

const initialState: RootState = {
  rolls: [],
  scene: { xmax: 40, zmax: 20, y: 2 }
}

export const DiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reduce, initialState)

  const screenSize = useMeasure()

  useEffect(() => {
    dispatch({
      type: 'SET_SCREEN_SIZE',
      payload: {
        xmax: screenSize.width / 35,
        zmax: screenSize.height / 35,
        y: 2
      }
    })
  }, [screenSize])

  const roll = useCallback((type: DiceType) => {
    dispatch({
      type: 'QUEUE_ROLL',
      payload: { type }
    })
  }, [])

  return (
    <DiceContext.Provider value={{ roll }}>
      <Canvas shadows orthographic camera={{ zoom: 35, position: [0, 0, 10] }}>
        <ambientLight />
        <spotLight
          intensity={1}
          position={[0, 0, 50]}
          angle={0.5}
          castShadow
          penumbra={0.5}
        />
        <Physics gravity={[0, 0, -10]}>
          <BoundingBox
            width={screenSize.width / 35}
            height={screenSize.height / 35}
          />
          {state.rolls.map((v) => {
            return (
              <Dice
                radius={2}
                key={v.id}
                type={v.type}
                rotation={[0, 0, 0]}
                position={v.position}
                config={defaultConfig}
              />
            )
          })}
          <OrbitControls />
        </Physics>
      </Canvas>
      {children}
    </DiceContext.Provider>
  )
}
