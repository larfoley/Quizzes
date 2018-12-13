import React from 'react'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import Navigation from 'components/Navigation'
import QuizForm from 'components/QuizForm'
import { Link } from 'react-router-dom'

const EditQuizPage = (props) => {
  const quizId = props.match.params.id
  return (
    <div>
      <Navigation />
      <PageContainer>
        <QuizForm mode="edit" quizId={quizId} />
      </PageContainer>
    </div>
  )
}

export default EditQuizPage
