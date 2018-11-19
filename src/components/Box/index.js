import styled from 'styled-components'
import css from 'css.js'
import { darken } from 'polished'

const Box = styled.div`
  ${'' /* background-color: ${darken(0.1, css.bgColor)}; */}
  background-color: white;
  padding: 2em;
  margin-bottom: 2em;
  border-radius: 5px;
  box-shadow: 0 1px 1px 0 rgba(10, 16, 34, .2);
`

export default Box
