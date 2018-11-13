import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'semantic-ui-react'
import QuizTags from 'components/QuizTags'
import Wrapper from './Wrapper'
import Title from './Title'
import Author from './Author'
import Description from './Description'

const QuizItem = props => {

  return (
    <Wrapper>
      <header>
        <Title>{props.name}</Title>
        {/* <Author>{props.author}</Author> */}
      </header>
      <QuizTags tags={props.tags}/>
      {/* <Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae pariatur sapient
      </Description> */}
      {/* {props.description ? <p>{props.description}</p> : null} */}
      <p>
        <a href="/">Start Quiz</a>
      </p>
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
