import React from 'react'
import Navigation from 'components/Navigation'

const Main = props => (
  <div>
    <Navigation />
    {props.children}
  </div>
)

export default Main
