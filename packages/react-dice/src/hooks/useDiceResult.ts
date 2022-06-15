import { PublicApi } from '@react-three/cannon'
import { useEffect, useMemo } from 'react'
import { Mesh, Raycaster, Vector3 } from 'three/src/Three'
import { assertDefined } from '../lib/utils'

const VELOCITY_THRESHOLD = 0.05

/**
 * Track velocity of dice and use raycasting
 * to intersect upward face
 */
export const useDiceResult = (
  ref: React.MutableRefObject<Mesh>,
  api: PublicApi,
  onResult: (result: number) => void
) => {
  const raycaster = useMemo(() => new Raycaster(), [])

  useEffect(() => {
    const unsub = api.velocity.subscribe((velocity) => {
      if (
        velocity.filter((v) => Math.abs(v) > VELOCITY_THRESHOLD).length === 0
      ) {
        const origin = ref.current
          .getWorldPosition(new Vector3())
          .add(new Vector3(0, 0, 100))
        const direction = new Vector3(0, 0, -1)

        raycaster.set(origin, direction)
        const intersect = raycaster.intersectObject(ref.current, false)

        if (intersect.length !== 1) {
          // TODO: what to do about this?
          throw new Error('dice cocked')
        } else {
          // TODO only works for deltahedrons
          assertDefined(intersect[0].faceIndex)
          onResult(intersect[0].faceIndex)
        }

        unsub()
      }
    })

    return () => unsub()
  })
}
