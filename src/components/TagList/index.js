import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Link = styled.a`
  color: #1DA1F2;
  margin-right: 1em;
  display: ${props => props.inline === "true" ? "inline" : "block"};
  margin-bottom: 1em;
`

const Wrapper = styled.div`
  margin-bottom: 1em;
`

const Tag = props => (
  <Link
    inline={props.inline}
    href={`/quiz/search/${props.name}`}>
    #{props.name}
  </Link>
)

const TagList = props => (
  <Wrapper>
    {props.tags.map((tag, key) => (
      <Tag inline={props.inline} key={key} name={tag}/>
    ))}
  </Wrapper>
)

TagList.propTypes = {
  tags: PropTypes.array,
  inline: PropTypes.bool
}

export default TagList
