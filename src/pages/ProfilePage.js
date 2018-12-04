import React from 'react'
import { Icon } from 'semantic-ui-react'
import PageContainer from 'components/PageContainer'
import Navigation from 'components/Navigation'
import PageHeader from 'components/PageHeader'
import Box from 'components/Box'

const ProfilePage = props => (
  <div>
    <Navigation userIsAuthenticated={props.user} noShadow/>
    <PageHeader>
      <Icon name="user circle" size="massive"/>
      <h1>Laurence Foley</h1>
    </PageHeader>
    <PageContainer>
      <Box>
        <h2>Created Quizzes</h2>
        
      </Box>
    </PageContainer>
  </div>
)

export default ProfilePage
