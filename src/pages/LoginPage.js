import React from 'react'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import LoginForm from 'components/LoginForm'

const LoginPage = props => (
  <Main>
    <PageContainer>
      <LoginForm />
    </PageContainer>
  </Main>
)

export default LoginPage
