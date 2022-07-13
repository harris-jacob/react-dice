import styled from 'styled-components'
import theme from './theme'
import Toast from './Toast'

interface ToastState {
  timestamp: number
  id: string
  result: number
}

export type ToastList = Array<ToastState>

interface ToasterProps {
  toasts: ToastList
  dismiss: (id: string) => void
}

const ToasterContainer = styled.div`
  position: fixed;
  z-index: 99999;
  box-sizing: border-box;
  bottom: ${theme.spacing(3)};
  right: ${theme.spacing(3)};
`

const Toaster = ({ toasts, dismiss }: ToasterProps): JSX.Element => {
  return (
    <ToasterContainer>
      {toasts.map((toast) => (
        <Toast
          dismiss={() => dismiss(toast.id)}
          key={toast.id}
          result={toast.result}
        />
      ))}
    </ToasterContainer>
  )
}

export default Toaster
