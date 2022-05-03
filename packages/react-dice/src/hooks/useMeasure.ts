import { useEffect, useState } from 'react'

interface SceenDimensions {
  width: number
  height: number
}

/**
 * Measure width and height of reference element
 * TODO: throttle? Also use ref to canvas instead?
 */
export const useMeasure = (): SceenDimensions => {
  const [state, setState] = useState<SceenDimensions>({ width: 0, height: 0 })

  useEffect(() => {
    const setSize = () => {
      setState(() => ({ width: window.innerWidth, height: window.innerHeight }))
    }

    window.addEventListener('resize', setSize)

    setSize()

    return () => window.removeEventListener('resize', setSize)
  }, [])

  return state
}
