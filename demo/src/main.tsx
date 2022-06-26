import React from 'react'
import ReactDOM from 'react-dom/client'
import { DiceTray, useRoll } from 'react-dice'
import './index.css'

const App = () => (
  <>
    <DiceTray />
    <RollMe />
  </>
)

const RollMe = (): JSX.Element => {
  const roll = useRoll()

  return (
    <button id='button' onClick={() => roll('d20')}>
      Roll
    </button>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
)
