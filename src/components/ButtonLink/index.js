import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ButtonLink = styled(Link)`
  background-color: var(--primary-color);
  color: white;
  padding: .4em 1.5em;
  border-radius: 5px;
  display: inline-block;
  &:hover {
    color: white;
  }
`

export default ButtonLink
