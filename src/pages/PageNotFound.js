import React from 'react'
import PageContainer from 'components/PageContainer'
import { Link } from 'react-router-dom'

const PageNotFound = props => (
  <div>
    <PageContainer>
      <h1>Page Not Found</h1>
      <Link to="/">Return to Home Page</Link>
    </PageContainer>
  </div>
)

export default PageNotFound
