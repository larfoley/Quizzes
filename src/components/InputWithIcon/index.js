import styled from 'styled-components'
import { Input }  from 'semantic-ui-react'
import css from 'css.js'

const StyledInput = styled(Input)`
  width: 100%;
  margin-bottom: 2em;
  margin-top: 2em;
  
  &&&& .button {
    background-color: var(--primary-color);
    color: white;
    padding: 1.5em;
  }

  &&&& input {
    position: absolute;
    border: none;
    top: 0;
    bottom: 0;
    padding-left: calc(72.54px + 1em);
    &:focus {
      outline-
    }
  }

  &&&&& button {
    z-index: 2;
    padding-left: 2em;
    padding-right: 2em;
  }
`

export default StyledInput
