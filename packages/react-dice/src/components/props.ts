import { Triplet } from '@react-three/cannon'
import { DiceConfig } from '../lib/dice-config'
import { DiceType } from '../types'

export interface BaseProps {
  position: Triplet
  type: DiceType
  rotation: Triplet
  radius: number
  config: DiceConfig
}

export interface DiceProps extends BaseProps {
  onStop: () => void
}

export interface DiceGeometryProps extends BaseProps {}
