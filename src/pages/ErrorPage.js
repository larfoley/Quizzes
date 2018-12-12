import React from 'react'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import { Link } from 'react-router-dom'

const ErrorPage = ({ statusCode, statusText }) => (
  <PageContainer>
    <Box>
      <h1>{statusCode}</h1>
      <h3>{statusText}</h3>
      {statusCode === 404 ? (
        <Link to="/">Return to Home Page</Link>
      ) : (
        <p>The server was unable to handle your request. Please try again later.</p>
      )}
    </Box>
  </PageContainer>
)

export default ErrorPage
