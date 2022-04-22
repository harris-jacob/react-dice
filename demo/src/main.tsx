import React from 'react'
import ReactDOM from 'react-dom/client'
import { DiceProvider, useDice } from 'react-dice'
import './index.css'

const App = () => (
  <DiceProvider>
    <RollMe />
  </DiceProvider>
)

const RollMe = (): JSX.Element => {
  const roll = useDice()

  return (
    <button id='button' onClick={() => roll('d20')}>
      Roll
    </button>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
