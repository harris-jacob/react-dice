import { createContext } from 'react'
import { DiceType } from './types'

export interface DiceContext {
  /** roll a dice */
  roll: (type: DiceType) => void
}

const defaultContext: DiceContext = {
  roll: (_: DiceType) => {
    throw new Error('Dice context not initialised')
  }
}

export const DiceContext = createContext<DiceContext>(defaultContext)
