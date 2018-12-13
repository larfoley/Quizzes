import React from 'react'
import { Route } from "react-router-dom"
import { Icon, Grid, Button, Dropdown, Responsive } from 'semantic-ui-react'
import styled from 'styled-components'
import Auth from 'components/Auth'

const auth = new Auth()
const redirect = (history, path) => () => history.push(path)

const StyledDropdown = styled(Dropdown)`
  color: #4183c4;
  display: inline-block;
  transition: .1s;
  margin-left: 2em;
`

const DropdownLink = () => (
  <Route render={({ history }) => (
    <StyledDropdown
      direction="left"
      trigger={<Icon name="user" size="large"/>}
      options={
        [
          {
            key: 'user',
            text: 'Dashboard',
            icon: 'dashboard',
            onClick: redirect(history, '/dashboard')
          },
          {
            key: 'profile',
            text: 'Profile',
            icon: 'user',
            onClick: redirect(history, `/user/${auth.getUserName()}`)
          },
          {
            key: 'logout',
            text: 'Logout',
            icon: 'log out',
            onClick: function() {
              auth.logout()
              redirect(history, '/')()
            }
          }
        ]
      } pointing='top left' icon={null} />
  )} />
)

export default DropdownLink
