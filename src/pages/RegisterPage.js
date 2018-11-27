import React from 'react'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import RegisterForm from 'components/RegisterForm'

const RegisterPage = props => (
  <Main>
    <PageContainer>
      <RegisterForm />
    </PageContainer>
  </Main>
)

export default RegisterPage
