import React from 'react'
import Navigation from 'components/Navigation'

const Page = props => {
  const user = props.user
  const Content = props.content

  return (
    <div>
      <Navigation userIsAuthenticated={props.user}/>
      { <Content user={props.user}/> }
    </div>
  )

}

export default Page
