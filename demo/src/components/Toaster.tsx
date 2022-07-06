import React, { useEffect } from 'react'
import styled from 'styled-components'
import theme from './theme'
import Toast from './Toast'

export interface DispatchProps {
  pollStale: () => void
  dismissToast: (id: string) => void
}

interface ToastDef {
  id: string
  timestamp: number
  description: string
}

type ToastList = Array<ToastDef>

const ToasterContainer = styled.div`
  position: fixed;
  z-index: 99999;
  box-sizing: border-box;
  bottom: ${theme.spacing(3)};
  right: ${theme.spacing(3)};
`

const Toaster = (): JSX.Element => {
  const [toast, setToast] = useT

  useEffect(() => {}, [])

  return (
    <ToasterContainer>
      {toasts.map((toast: StoreToast) => (
        <Toast
          dismiss={() => dismissToast(toast.id)}
          key={toast.id}
          title={toast.title}
          description={toast.description}
        />
      ))}
    </ToasterContainer>
  )
}

export default Toaster
