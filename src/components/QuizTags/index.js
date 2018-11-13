import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Link = styled.a`
  color: #1DA1F2;
  margin-right: 1em;
`

const Wrapper = styled.div`
  margin-bottom: 1em;
`

const Tag = props => (
  <Link href={`/quiz/search/${props.name}`}>#{props.name}</Link>
)

const QuizTags = props => (
  <Wrapper>
    {props.tags.map((tag, key) => <Tag key={key} name={tag}/>)}
  </Wrapper>
)

QuizTags.propTypes = {
  tags: PropTypes.array
}

export default QuizTags
