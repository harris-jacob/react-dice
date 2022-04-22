export interface PolyhedronDefinition {
  verticies: number[]
  indices: number[]
}

export interface Dice {
  d6: PolyhedronDefinition
  d8: PolyhedronDefinition
  d10: PolyhedronDefinition
  d12: PolyhedronDefinition
  d20: PolyhedronDefinition
}

export type DiceType = keyof Dice
