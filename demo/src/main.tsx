import { DiceTray, useRoll } from 'react-dice'
import ReactDOM from 'react-dom/client'
import Toaster, { ToastList } from './components/Toaster'
import './index.css'
import React, { useCallback, useState } from 'react'

let id = 0

const getId = () => `${id++}`

const App = () => {
  // TODO auto timeout & max toast
  const [toasts, setToasts] = useState<ToastList>([])

  const dismissToast = useCallback(
    (id: string) => setToasts((toasts) => toasts.filter((v) => v.id !== id)),
    []
  )

  const pushToast = useCallback(
    (result: number) =>
      setToasts((toasts) => [
        ...toasts,
        {
          id: getId(),
          result,
          timestamp: Date.now()
        }
      ]),
    []
  )

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
