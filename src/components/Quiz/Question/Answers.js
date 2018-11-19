import React from 'react'
import styled from 'styled-components'
import css from 'css.js'

const Answer = styled.li`
  background-color: ${css.bgColor};
  list-style-type: none;
  padding: 1em;
  margin-bottom: 1em;
`

const Answers = ({ answers }) => (
  answers.map(answer => <Answer>{answer.answer}</Answer>)
)

export default Answers
