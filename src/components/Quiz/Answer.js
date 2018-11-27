import styled from 'styled-components'
import css from 'css.js'

const Answer = styled.li`
  border-radius: 5px;
  background-color: ${props => {
    if (
      props.answeredCorrectly === true ||
      (props.answered && props.isCorrect)
      ) {
      return "#55efc4"
    } else if (props.answeredCorrectly === false) {
      return "#d63031"
    } else {
      return css.bgColor
    }
  }};
  color: ${props => {
    if (
      props.answeredCorrectly === true ||
      (props.answered && props.isCorrect) ||
      props.answeredCorrectly === false
      ) {
      return "white"
    }
  }};
  list-style-type: none;
  padding: 1em;
  margin-bottom: 1em;

  &:hover {
    cursor: ${props => props.answered? "default" : "pointer"};
  }
`


export default Answer
