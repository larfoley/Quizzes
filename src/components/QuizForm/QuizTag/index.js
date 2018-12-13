import React from 'react'
import styled from 'styled-components'

const QuizTag = styled.span`
  color: #1DA1F2;
`

export default (props) => (
  <QuizTag>
    #{props.tag}
  </QuizTag>
)
