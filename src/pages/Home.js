import React from 'react'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import QuizList from 'components/QuizList'

const quizzes = [
  {
    id: 1,
    name: "Java",
    author: "John Doe",
    description: "",
    tags: ["Java", "Programing", "Computer Science"]
  },
  {
    id: 2,
    name: "Java",
    author: "John Doe",
    description: "",
    tags: ["Java", "Programing", "Computer Science"]
  },
  {
    id: 3,
    name: "Java",
    author: "John Doe",
    description: "",
    tags: ["Java", "Programing", "Computer Science"]
  }
]

const Home = props => (
  <Main>
    <PageContainer>
      <h3>My Quizes</h3>
      <QuizList quizzes={quizzes} />
    </PageContainer>
  </Main>
)

export default Home
