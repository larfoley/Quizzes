import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const StyledLink = styled(Link)`
  color: #1DA1F2;
  margin-right: 1em;
  display: ${props => props.display? props.display : "inline"};
  font-size: 1.1em;
`

const Wrapper = styled.div`
  position: absolute;
  margin-bottom: 1em;
`

const Tag = ({ name, displayName, inline }) => (
  <StyledLink
    inline={inline}
    to={`/tags/${name}`}>
    #{displayName}
  </StyledLink>
)

const TagList = ({ tags, inline }) => {
  return (
    <Wrapper>
      {tags.map((tag, key) => (
        <Tag inline={inline} key={key} name={tag.tagName} displayName={tag.displayName}/>
      ))}
    </Wrapper>
  )
}

TagList.propTypes = {
  tags: PropTypes.array,
  inline: PropTypes.string
}

export default TagList
