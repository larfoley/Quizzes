import React from 'react'
import PageContainer from 'components/PageContainer'
import Navigation from 'components/Navigation'
import UsersQuizzes from 'components/UsersQuizzes'
import PageHeader from 'components/PageHeader'

const DashboardPage = props => (
  <div>
    <Navigation />
    <PageHeader>
      <h1>Dashboard</h1>
    </PageHeader>
    <PageContainer>
      <UsersQuizzes />
    </PageContainer>
  </div>
)

export default DashboardPage
