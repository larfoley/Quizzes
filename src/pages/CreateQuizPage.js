import React from 'react'
import { Main } from '../layouts'
import PageContainer from '../components/PageContainer'
import CreateQuizForm from '../components/CreateQuizForm'

const CreateQuizPage = props => (
  <Main>
    <PageContainer>
      <CreateQuizForm />
    </PageContainer>
  </Main>
)

export default CreateQuizPage
