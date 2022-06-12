// TODO for now, my puny brain cannot do this maths in general way.
// someone please help

import { Dice, DiceType, PolyhedronDefinition } from '../types'

const t = (1 + Math.sqrt(5)) / 2
const r = 1 / t

const a = 1 / Math.sqrt(2)

export const getDiceDefinition = (type: DiceType): PolyhedronDefinition =>
  model[type]

export const getFaces = (definition: PolyhedronDefinition) => definition.faces
export const getIndices = (definition: PolyhedronDefinition) =>
  definition.indices
export const getVertices = (definition: PolyhedronDefinition) =>
  definition.vertices

const model: Dice = {
  d4: {
    vertices: [1, 0, -a, -1, 0, -a, 0, 1, a, 0, -1, a],
    indices: [0, 1, 3, 1, 2, 3, 0, 3, 2, 0, 2, 1],
    faces: [
      [0, 1, 3],
      [1, 2, 3],
      [0, 3, 2],
      [0, 2, 1]
    ]
  },
  d6: {
    vertices: [
      -1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
      -1, 1, 1
    ],
    indices: [
      2, 1, 0, 0, 3, 2, 0, 4, 7, 7, 3, 0, 0, 1, 5, 5, 4, 0, 1, 2, 6, 6, 5, 1, 2,
      3, 7, 7, 6, 2, 4, 5, 6, 6, 7, 4
    ],
    faces: [
      [0, 4, 5, 1],
      [3, 7, 4, 0],
      [2, 6, 7, 3],
      [1, 5, 6, 2],
      [4, 7, 6, 5],
      [0, 1, 2, 4]
    ]
  },
  d8: {
    vertices: [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
    indices: [
      0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2
    ],
    faces: [
      [0, 2, 4],
      [0, 4, 3],
      [0, 3, 5],
      [0, 5, 2],
      [1, 2, 5],
      [1, 5, 3],
      [1, 3, 4],
      [1, 4, 2]
    ]
  },
  d10: {
    vertices: [],
    indices: [],
    faces: []
  },
  d12: {
    vertices: [
      // (±1, ±1, ±1)
      -1,
      -1,
      -1,

      -1,
      -1,
      1,

      -1,
      1,
      -1,

      -1,
      1,
      1,

      1,
      -1,
      -1,

      1,
      -1,
      1,

      1,
      1,
      -1,

      1,
      1,
      1,

      // (0, ±1/φ, ±φ)
      0,
      -r,
      -t,

      0,
      -r,
      t,

      0,
      r,
      -t,

      0,
      r,
      t,

      // (±1/φ, ±φ, 0)
      -r,
      -t,
      0,

      -r,
      t,
      0,

      r,
      -t,
      0,

      r,
      t,
      0,

      // (±φ, 0, ±1/φ)
      -t,
      0,
      -r,

      t,
      0,
      -r,

      -t,
      0,
      r,

      t,
      0,
      r
    ],
    indices: [
      3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8,
      17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0,
      18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18,
      1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5,
      19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5,
      9
    ],
    faces: [[]]
  },
  d20: {
    vertices: [
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      0,
      0,
      -1,
      t,
      0,
      1,
      t,
      0,
      -1,
      -t,
      0,
      1,
      -t,
      t,
      0,
      -1,
      t,
      0,
      1,
      -t,
      0,
      -1,
      -t,
      0,
      1
    ],
    indices: [
      0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11,
      10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4,
      9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1
    ],
    faces: [
      [0, 11, 5],
      [0, 5, 1],
      [0, 1, 7],
      [0, 7, 10],
      [0, 10, 11],
      [1, 5, 9],
      [5, 11, 4],
      [11, 10, 2],
      [10, 7, 6],
      [7, 1, 8],
      [3, 9, 4],
      [3, 4, 2],
      [3, 2, 6],
      [3, 6, 8],
      [3, 8, 9],
      [4, 9, 5],
      [2, 4, 11],
      [6, 2, 10],
      [8, 6, 7],
      [9, 8, 1]
    ]
  }
}
