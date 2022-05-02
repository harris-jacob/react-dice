import { Triplet } from '@react-three/cannon'
import { DiceConfig } from '../lib/dice-config'
import { DiceType } from '../types'

export interface DiceProps {
  position: Triplet
  type: DiceType
  rotation: Triplet
  radius: number
  config: DiceConfig
}

export interface DiceGeometryProps extends DiceProps {}
