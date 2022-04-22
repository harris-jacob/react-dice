import { Debug, DebugProps, Physics } from '@react-three/cannon'
import { Canvas } from '@react-three/fiber'
import React, { PropsWithChildren, useCallback, useReducer } from 'react'
import { DiceContext } from '../DiceContext'
import { reduce } from '../state'
import { DiceType } from '../types'
import { BoundingBox } from './BoundingBox'
import { Dice } from './Dice'

/** Patched until @react-three/cannon upgrades to react-18 types */
const DebugPatched = Debug as any as React.FC<PropsWithChildren<DebugProps>>

export const DiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reduce, [])

  const roll = useCallback((type: DiceType) => {
    dispatch({ type: 'QUEUE_ROLL', payload: type })
  }, [])

  return (
    <DiceContext.Provider value={{ roll }}>
      <Canvas orthographic camera={{ zoom: 42 }}>
        <ambientLight />
        <Physics gravity={[0, 0, -10]}>
          {/* <DebugPatched color='black' scale={1.1}> */}
          <BoundingBox width={40} height={20} />
          {state.map((v) => (
            <>
              <Dice type={v.type} rotation={[0, 0, 0]} position={[0, 0, -9]} />
            </>
          ))}
          {/* </DebugPatched> */}
        </Physics>
      </Canvas>
      {children}
    </DiceContext.Provider>
  )
}
