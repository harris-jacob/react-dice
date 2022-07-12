import styled, { keyframes } from 'styled-components'
import theme from './theme'
import Card from './Card'
import H4 from './H4'

interface Props {
  title: string
  description: string
  dismiss: () => void
}

const animation = keyframes`
    from {
        transform: translateX(100%);
        
    }
    to {
        transform: translateX(0);
    }
`

const ToastCard = styled(Card)`
  height: 50px;
  width: 280px;
  position: relative;
  background: ${theme.palette.primary.light};
  margin-top: ${theme.spacing(3)};
  animation: ${animation} 0.5s;
  transition: transform 0.5s ease-in-out;
`

const Toast = (props: Props): JSX.Element => (
  <ToastCard>
    <H4>{props.title}</H4>
    {props.description}
  </ToastCard>
)

export default Toast
