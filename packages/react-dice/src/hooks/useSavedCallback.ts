import { useEffect, useRef } from 'react'

/** provide stable ref to callback that may change so components don't need to re-render */
export const useSavedCallback = <T extends Function>(callback: T): T => {
  const ref = useRef(callback)

  useEffect(() => {
    ref.current = callback
  }, [callback])

  return ref.current
}
