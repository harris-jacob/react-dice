import { useContext } from 'react'
import { DiceContext } from './DiceContext'
import { DiceType } from './types'

export const useDice = (): ((type: DiceType) => void) => {
  const context = useContext(DiceContext)

  return context.roll
}
