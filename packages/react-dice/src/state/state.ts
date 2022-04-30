import { Triplet } from '@react-three/cannon'
import { DiceType } from '../types'
import { queueRoll, QueueRollPayload } from './queue-roll'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type ID<T> = string

interface Roll {
  readonly id: string
  readonly type: DiceType
  readonly position: Triplet
  readonly rotation: Triplet
  readonly result?: number
}

// For now just defines the camera size but could do more
interface SceneConfig {
  xmax: number
  zmax: number
  y: number
}

/** State model of dice provider */
export type RootState = { rolls: Array<Roll>; scene: SceneConfig }

export type RootAction =
  | { type: 'INIT'; payload: SceneConfig }
  | { type: 'QUEUE_ROLL'; payload: QueueRollPayload }
  | { type: 'REPORT_RESULT'; payload: { id: ID<Roll>; result: number } }
  | { type: 'REMOVE_ROLL'; payload: ID<Roll> }

export const reduce = (state: RootState, action: RootAction): RootState => {
  switch (action.type) {
    case 'INIT':
      return { ...state, scene: action.payload }
    case 'QUEUE_ROLL':
      return queueRoll(state, action.payload)
    case 'REMOVE_ROLL':
      return {
        ...state,
        rolls: state.rolls.filter((v) => v.id !== action.payload)
      }
    case 'REPORT_RESULT':
      return {
        ...state,
        rolls: state.rolls.map((v) =>
          v.id === action.payload.id
            ? { ...v, result: action.payload.result }
            : v
        )
      }
    default:
      throw new Error('unreachable code')
  }
}
