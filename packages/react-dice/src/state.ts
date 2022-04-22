import { DiceType } from './types'

let id = 0

const uniqueId = (): string => {
  return `${id++}`
}

type ID<T> = string

interface Roll {
  readonly id: string
  readonly type: DiceType
  readonly result?: number
}

/** State model of dice provider */
export type RootState = Array<Roll>

type RootAction =
  | { type: 'QUEUE_ROLL'; payload: DiceType }
  | { type: 'REPORT_RESULT'; payload: { id: ID<Roll>; result: number } }
  | { type: 'REMOVE_ROLL'; payload: ID<Roll> }

export const reduce = (state: RootState, action: RootAction): RootState => {
  switch (action.type) {
    case 'QUEUE_ROLL':
      return [...state, { type: action.payload, id: uniqueId() }]
    case 'REMOVE_ROLL':
      return state.filter((v) => v.id !== action.payload)
    case 'REPORT_RESULT':
      return state.map((v) =>
        v.id === action.payload.id ? { ...v, result: action.payload.result } : v
      )
    default:
      throw new Error('unreachable code')
  }
}
