import React from 'react'
import QuizItem from './QuizItem'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'

const QuizList = props => (
  <div>
    <Loader active={props.loading} inline="centered">Loading</Loader>
    <div>
      {props.quizzes.map((quiz, i) => (
        <QuizItem
          key={quiz.id}
          quizID={quiz.id}
          name={quiz.name}
          description={quiz.description}
          author={quiz.author}
          tags={quiz.tags}
        />
      ))}
    </div>
  </div>
)

QuizList.propTypes = {
  quizzes: PropTypes.array
}

export default QuizList
