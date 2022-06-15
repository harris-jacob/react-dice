import { Debug, Physics } from '@react-three/cannon'
import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useCallback, useEffect, useReducer, useRef } from 'react'
import { DiceContext } from '../DiceContext'
import { useMeasure } from '../hooks/useMeasure'
import { defaultConfig } from '../lib/dice-config'
import { reduce, RootState } from '../state/state'
import { DiceType } from '../types'
import { BoundingBox } from './BoundingBox'
import { Dice } from './Dice'
import { useTransition } from '@react-spring/three'
import { ResultObserver } from '../lib/result-observer'

const initialState: RootState = {
  rolls: [],
  scene: { xmax: 40, zmax: 20, y: -17 }
}

const ZOOM = 40

export const DiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reduce, initialState)

  const screenSize = useMeasure()

  useEffect(() => {
    dispatch({
      type: 'SET_SCREEN_SIZE',
      payload: {
        xmax: screenSize.width / ZOOM,
        zmax: screenSize.height / ZOOM,
        y: -17
      }
    })
  }, [screenSize])

  const roll = useCallback((type: DiceType) => {
    dispatch({
      type: 'QUEUE_ROLL',
      payload: { type }
    })
  }, [])

  const transition = useTransition(state.rolls, {
    from: { scale: 1 },
    enter: { scale: 1 },
    leave: { scale: 0 }
  })

  const resultObserver = useRef(new ResultObserver())

  return (
    <DiceContext.Provider value={{ roll }}>
      <Canvas orthographic camera={{ zoom: ZOOM, near: 1, far: 1000 }}>
        <axesHelper args={[5]} />
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
                onResult={(result) =>
                  resultObserver.current.execute(v.id, result)
                }
                scale={scale}
                onStop={() => dispatch({ type: 'REMOVE_ROLL', payload: v.id })}
                radius={2}
                key={v.id}
                type={v.type}
                rotation={[0, 0, 0]}
                position={v.position}
                config={defaultConfig}
              />
            ))}
            <OrbitControls />
          </Debug>
        </Physics>
      </Canvas>
      {children}
    </DiceContext.Provider>
  )
}
