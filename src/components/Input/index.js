import styled from 'styled-components'
import { Input }  from 'semantic-ui-react'
import css from 'css.js'

const StyledInput = styled(Input)`
  input {
    border: none !important;
    padding: 1.1em !important;
    background-color: ${css.bgColor} !important;

    &~i {
      top: .70em !important
    }
  }

  &&& button {
    padding: 1.5em;
  }
`



export default StyledInput
