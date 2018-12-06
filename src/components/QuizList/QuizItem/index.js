import React from 'react'
import PropTypes from 'prop-types'
import TagList from 'components/TagList'
import Wrapper from './Wrapper'
import Title from './Title'
import Description from './Description'
// import Author from './Author'

const QuizItem = ({name, description, quizID, tags}) => {
  tags = tags.map(tag => tag.tagName)
  return (
    <Wrapper>
      <Title quizID={quizID} title={name}/>
      <TagList tags={tags}/>
      <Description>{description}</Description>
    </Wrapper>
  )
}

QuizItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.array
}

export default QuizItem
