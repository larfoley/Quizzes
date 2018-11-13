import React from 'react'
import Navigation from './Navigation'

const Main = props => (
  <div>
    <Navigation />
    {props.children}
  </div>
)

export default Main
