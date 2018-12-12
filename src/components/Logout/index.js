import React from 'react'
import Auth from 'components/Auth'
import { Redirect } from 'react-router-dom'

const Logout = props => {
  new Auth().logout()
  return <Redirect to="/" />
}

export default Logout
