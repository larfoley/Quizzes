import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
// import { Link } from 'react-router-dom'

const StyledLink = styled.span`
  color: #1DA1F2;
  margin-right: 1em;
  display: ${props => props.inline === "true" ? "inline" : "block"};
  margin-bottom: 1em;
`

const Wrapper = styled.div`
  margin-bottom: 1em;
`

const Tag = props => (
  <StyledLink
    inline={props.inline}
    to={`/tags/${props.name}`}>
    #{props.displayName}
  </StyledLink>
)

const TagList = props => (
  <Wrapper>
    {props.tags.map((tag, key) => (
      <Tag inline={props.inline} key={key} displayName={tag}/>
    ))}
  </Wrapper>
)

TagList.propTypes = {
  tags: PropTypes.array,
  inline: PropTypes.string
}

export default TagList
