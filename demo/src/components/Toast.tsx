import styled, { keyframes } from 'styled-components'
import theme from './theme'
import Card from './Card'
import H2 from './H2'
import H3 from './H3'
import H4 from './H4'
import { FaDiceD20 } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'

export interface ToastProps {
  result: number
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
  position: relative;
  color: ${theme.palette.light};
  background: ${theme.palette.dark};
  margin-top: ${theme.spacing(3)};
  border-radius: 12px;
  animation: ${animation} 0.5s;
  transition: transform 0.5s ease-in-out;
  display: flex;
  min-height: 100px;
`

const LHS = styled.div`
  margin: ${theme.spacing(3)};
  min-width: 150px;
  border-right: 2px solid ${theme.palette.attention};
`

const RHS = styled.div`
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  > h2 {
    padding-right: ${theme.spacing(6)};
  }
  > button {
    all: unset;
    position: absolute;
    right: 0px;
    top: 0px;
    &:hover {
      > svg {
        transition: all 0.2s ease-in-out;
        transform: scale(1.1);
        color: ${theme.palette.attention};
      }
    }
  }
`

const IconContainer = styled.div`
  display: flex;
  > * {
    margin-right: ${theme.spacing(4)};
  }
`

const Toast = ({ result, dismiss }: ToastProps): JSX.Element => (
  <ToastCard>
    <LHS>
      <H4>roll</H4>
      <IconContainer>
        <FaDiceD20 size={32} />
        <H3>{result}</H3>
      </IconContainer>
    </LHS>
    <RHS>
      <H2>{result}</H2>
      <button onClick={dismiss} aria-label='close'>
        <AiOutlineCloseCircle size={28} />
      </button>
    </RHS>
  </ToastCard>
)

export default Toast
