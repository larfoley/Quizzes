import React from 'react'
import QuizItem from './QuizItem'
import PropTypes from 'prop-types'
import { Dimmer, Loader } from 'semantic-ui-react'

const QuizList = props => (
  <div>
    <Loader active={props.loading} inline="centered">Loading</Loader>    
    {props.quizzes.map((quiz, i) => (
      <QuizItem
        key={i}
        name={quiz.name}
        description={quiz.description}
        author={quiz.author}
        tags={quiz.tags}
      />
    ))}
  </div>
)

QuizList.propTypes = {
  quizzes: PropTypes.array
}

export default QuizList
