import React from 'react'
import styled from 'styled-components'
import Box from 'components/Box'

const StyledBox = styled(Box)`
  max-width: 600px;
  margin: auto;
  margin-bottom: 2em;
  padding: 0;

  @media screen and (min-width: 700px) {
    ${'' /* width: 45%;
    display: inline-block; */}
  }

  @media screen and (min-width: 900px) {
    ${'' /* width: 31.333333333333332%;
  margin-right: 3%;

    &:nth-child(3n) {
      margin-right: 0;
    } */}
  }
`

const StyledLink = styled.a`
  color: black;
  padding: 2em;
  display: block;
  &:hover {
    color: initial;
  }
`

const Wrapper = ( { children, quizID }) => (
  <StyledBox>
    <StyledLink href={"/quiz/" + quizID}>
      {children}
    </StyledLink>
  </StyledBox>
)



export default Wrapper
