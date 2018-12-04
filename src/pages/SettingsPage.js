import React from 'react'
import PageContainer from 'components/PageContainer'
import QuizList from 'components/QuizList'
import Navigation from 'components/Navigation'
import quizzes from 'mock-quizzes'

const Home = props => (
  <div>
    <Navigation userIsAuthenticated={props.user}/>
    <PageContainer>
      <QuizList quizzes={quizzes} />
    </PageContainer>
  </div>
)

export default Home
