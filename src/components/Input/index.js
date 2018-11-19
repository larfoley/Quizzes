import styled from 'styled-components'
import { Input }  from 'semantic-ui-react'
import { lighten } from 'polished'
import css from 'css.js'

const StyledInput = styled(Input)`
  input {
    ${'' /* background-color: ${lighten(0.2, css.primaryColor)} !important; */}
    border: none !important;
    padding: 1.1em !important;
    background-color: ${css.bgColor} !important;
  }
`

export default StyledInput
