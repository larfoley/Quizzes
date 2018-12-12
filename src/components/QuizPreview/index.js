import React from 'react'
import Button from 'components/Button'
import { Link } from 'react-router-dom'

const QuizPreview = props => {
  const { name, description, quizId } = props
  return (
    <div>
      <h1>{name}</h1>
      <p>{description}</p>
      <Link to={`/quiz/${quizId}/start`}>
        <Button>Start</Button>
      </Link>
    </div>
  )
}

export default QuizPreview
