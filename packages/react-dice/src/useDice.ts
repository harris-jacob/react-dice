import { useContext } from 'react'
import { DiceContext } from './DiceContext'
import { DiceType } from './types'

export const useDice = (
  onResult: (result: number) => void
): ((type: DiceType) => void) => {
  const context = useContext(DiceContext)
  context.onResult = onResult

  return context.roll
}
