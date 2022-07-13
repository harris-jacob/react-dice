import { DiceTray, useRoll } from 'react-dice'
import ReactDOM from 'react-dom/client'
import Toaster, { ToastList } from './components/Toaster'
import './index.css'
import React, { useCallback, useState } from 'react'
import { useInterval } from './useInterval'

let id = 0

const getId = () => `${id++}`
const MAX_TOAST = 3
const TOAST_TIMEOUT = 100000

const App = () => {
  // TODO auto timeout & max toast
  const [toasts, setToasts] = useState<ToastList>([])

  const dismissToast = useCallback(
    (id: string) => setToasts((toasts) => toasts.filter((v) => v.id !== id)),
    []
  )

  const pushToast = useCallback(
    (result: number) =>
      setToasts((toasts) => {
        const newToasts = [
          ...toasts,
          {
            id: getId(),
            result,
            timestamp: Date.now()
          }
        ]

        return newToasts.length > MAX_TOAST ? newToasts.splice(1) : newToasts
      }),
    []
  )

  useInterval(() => {
    setToasts((s) =>
      s.filter((toast) => toast.timestamp + TOAST_TIMEOUT > Date.now())
    )
  }, TOAST_TIMEOUT)

  return (
    <>
      <Toaster toasts={toasts} dismiss={dismissToast} />
      <DiceTray onResult={(result) => pushToast(result)} />
      <RollMe />
    </>
  )
}

const RollMe = (): JSX.Element => {
  const { roll, processing } = useRoll()

  return (
    <button disabled={processing} id='button' onClick={() => roll('d20')}>
      Roll
    </button>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
