import styled from 'styled-components'
import { TextArea }  from 'semantic-ui-react'
import css from 'css.js'

const StyledTextArea = styled(TextArea)`
    border: none !important;
    padding: 1.1em !important;
    background-color: ${css.bgColor} !important;
`

export default StyledTextArea
