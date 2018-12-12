import React from 'react'
import { NavLink, Route } from "react-router-dom"
import styled from 'styled-components'
import { Icon, Grid, Button, Dropdown } from 'semantic-ui-react'
import PageContainer from 'components/PageContainer'
import Auth from 'components/Auth'

const auth = new Auth()

const StyledNav = styled.nav`
  background-color: white;
  ${'' /* margin-bottom: 3.5em; */}
  box-shadow: ${props => props.noShadow ? 'none' : '1px 1px 5px lightgrey'};
  &:before, &:after {
    content: " ";
    display: table;
  }

  &:after {
    clear: both;
  }

  .column {
    ${'' /* padding-bottom: 0 !important; */}
  }
`


const Link = styled(NavLink)`
  text-decoration: none;
  display: inline-block;
  transition: .1s;
  margin-left: 2em;
  font-weight: bold;
  line-height: 70px;
`

const StyledDropdown = styled(Dropdown)`
  color: #4183c4;
  display: inline-block;
  transition: .1s;
  margin-left: 2em;
`

const redirect = (history, path) => () => history.push(path)

const DropdownLink = () => (
  <Route render={({ history }) => (
    <StyledDropdown
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
            onClick: redirect(history, `/uesr/${auth.getUserName()}`)
          },
          {
            key: 'settings',
            text: 'Settings',
            icon: 'settings',
            onClick: redirect(history, '/settings')
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

const Logo = styled(Link)`
  margin-left: 0;
  font-family: "Fredoka One";
  font-size: 2em;
  letter-spacing: 1px;
  line-height: 70px;
`

class Navigation extends React.Component {

  render() {
    return (
      <StyledNav noShadow={this.props.noShadow}>
        <PageContainer>
        <Grid columns='equal'>
          <Grid.Column width={5}>
            <Logo to="/">
            Quizzes
          </Logo>
          </Grid.Column>
          <Grid.Column textAlign="right">

            <Link to="/create-quiz">
              <Button primary><Icon name="plus"/> Create Quiz</Button>
            </Link>

            <Link to="/search">
              <Icon name="search" size="large"/>
            </Link>

            <Link to="/tags">
              <Icon name="tag" size="large"/>
            </Link>

            {}
            {!auth.isAuthenticated()? (
              <React.Fragment>
                <Link to="/login">
                  Login
                </Link>
                <Link to="/register">
                  Register
                </Link>
              </React.Fragment>
            ) : (
              <React.Fragment>

                <DropdownLink />

                <Link to="/logout">
                  <Icon name="sign-out" size="large"/>
                </Link>
              </React.Fragment>
            )}
          </Grid.Column>
        </Grid>
      </PageContainer>
      </StyledNav>
    )
  }
}

export default Navigation
