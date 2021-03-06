import styled from 'styled-components'
import theme from './theme'

const Card = styled.div`
  background-color: ${theme.palette.dark};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing(3)};
`

export default Card
