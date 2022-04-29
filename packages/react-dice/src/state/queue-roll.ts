import { Triplet } from '@react-three/cannon'
import { add, multiply, multiplyScalar, randomUnitVector } from '../lib/vector'
import { DiceType } from '../types'
import { RootState } from './state'

export interface QueueRollPayload {
  readonly type: DiceType
}

let id = 0

const uniqueId = (): string => {
  return `${id++}`
}

/** generate random roll from */
export const queueRoll = (
  state: RootState,
  payload: QueueRollPayload
): RootState => {
  const { xmax, zmax, y } = state.scene
  return {
    ...state,
    rolls: [
      ...state.rolls,
      {
        ...payload,
        rotation: rotation(),
        position: position(xmax, zmax, y),
        id: uniqueId()
      }
    ]
  }
}

/** random starting orientation */
const rotation = (): Triplet => multiplyScalar(randomUnitVector(), 2 * Math.PI)

/** random start position for roll within bounds of screen */
const position = (xmax: number, zmax: number, y: number): Triplet =>
  add(multiply(randomUnitVector(), [xmax / 2 - 1, zmax / 2 - 1, 0]), [0, 0, y])
