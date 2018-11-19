import React from 'react'
import Quiz from '../components/Quiz'
import quizzes from 'mock-quizzes'
import { Redirect } from 'react-router'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import Button from 'components/Button'

const QuizPage = ({ match }) => {
  const quiz = quizzes.find(quiz => quiz.id == match.params.id)

  return (quiz? (

    <Main>
      <PageContainer>
        <Box>
          {/* <h1>{quiz.name}</h1>
          <QuizTags tags={quiz.tags}/>
          <p>{quiz.description}</p>
          <Button>Begin Quiz</Button> */}
          <Quiz {...quiz}/>
        </Box>
      </PageContainer>
    </Main>

  ): <Redirect to="/" />)
}

export default QuizPage
