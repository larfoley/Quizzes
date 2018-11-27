import styled from 'styled-components'
import { Input }  from 'semantic-ui-react'
import css from 'css.js'

const StyledInput = styled(Input)`
  input {
    border: none !important;
    padding: 1.1em !important;
    background-color: ${css.bgColor} !important;
  }
`

export default StyledInput
