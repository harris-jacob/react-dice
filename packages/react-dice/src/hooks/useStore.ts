import { Triplet } from '@pmndrs/cannon-worker-api'
import create from 'zustand'
import { position, rotation, uniqueId } from '../lib/initialize-roll'

import { DiceType } from '../types'

interface Roll {
  id: string
  position: Triplet
  rotation: Triplet
  type: DiceType
}

interface ScreenDimensions {
  x: number
  y: number
}

export interface State {
  dice: Array<Roll>
  screen: ScreenDimensions
  setScreen: (x: number, y: number) => void
  addDice: (type: DiceType) => void
  removeDice: () => void
}

export const useStore = create<State>((set) => ({
  dice: [],
  screen: { x: 0, y: 0 },
  setScreen: (x, y) => set(() => ({ screen: { x, y } })),
  addDice: (type) =>
    set((state) => ({
      dice: [
        {
          id: uniqueId(),
          rotation: rotation(),
          position: position(state.screen.x, state.screen.y, -17),
          type
        }
      ]
    })),
  removeDice: () => set(() => ({ dice: [] }))
}))
