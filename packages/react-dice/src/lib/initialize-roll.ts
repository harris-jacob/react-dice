import { Triplet } from '@react-three/cannon'
import { add, multiply, multiplyScalar, randomUnitVector } from '../lib/vector'
import { DiceType } from '../types'

export interface QueueRollPayload {
  readonly type: DiceType
}

let id = 0

export const uniqueId = (): string => {
  return `${id++}`
}

/** random starting orientation */
export const rotation = (): Triplet =>
  multiplyScalar(randomUnitVector(), 2 * Math.PI)

/** random start position for roll within bounds of screen */
export const position = (xmax: number, ymax: number, z: number): Triplet =>
  add(multiply(randomUnitVector(), [xmax / 2 - 1, ymax / 2 - 1, 0]), [0, 0, z])
