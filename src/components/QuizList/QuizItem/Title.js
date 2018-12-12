import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  color: black;
  display: block;
  &:hover {
    color: initial;
  }
`
const StyledH2 = styled.h2`
  margin: 0;
  font-size: 1.4em;
  ${'' /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */}
`
const Title = ({ quizId, title }) =>  (
  <StyledH2>
    <StyledLink to={"/quiz/" + quizId}>
      {title}
    </StyledLink>
  </StyledH2>
)
export default Title
