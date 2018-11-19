import React from 'react'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import QuizList from 'components/QuizList'
import SearchQuiz from 'components/SearchQuiz'
import quizzes from 'mock-quizzes'

const Home = props => (
  <Main>
    <PageContainer>
      <SearchQuiz />
      <QuizList quizzes={quizzes} />
    </PageContainer>
  </Main>
)

export default Home
