import React from 'react'
import { NavLink } from "react-router-dom"
import styled from 'styled-components'
import { Icon, Grid, Button } from 'semantic-ui-react'
import PageContainer from 'components/PageContainer'
import Auth from 'components/Auth'

const auth = new Auth()

const StyledNav = styled.nav`
  background-color: white;
  margin-bottom: 3.5em;
  box-shadow: 1px 1px 5px lightgrey;
  .column {
    padding-bottom: 0 !important;
  }
`

const activeStyle = {
  // color: 'white'
}


const Link = styled(NavLink)`
  text-decoration: none;
  display: inline-block;
  ${'' /* padding: 25px 0; */}
  transition: .1s;
  margin-left: 2em;
  font-weight: bold;
  line-height: 70px;
`

const Logo = styled(Link)`
  margin-left: 0;
  font-family: "Fredoka One";
  font-size: 2em;
  letter-spacing: 1px;
  line-height: 70px;
`

const Navigation = props => (
  <StyledNav>
    <PageContainer>
    <Grid columns='equal'>
      <Grid.Column width={5}>
        <Logo to="/" activeStyle={activeStyle}>
        Quizzes
      </Logo>
      </Grid.Column>
      <Grid.Column textAlign="right">
        {/* <Link to="/create-quiz" activeStyle={activeStyle}>
          <Icon name="plus" /> New Quiz
        </Link> */}
        <Link to="/create-quiz" activeStyle={activeStyle}>
          <Button primary><Icon name="plus"/> Create Quiz</Button>
        </Link>

        <Link to="/search" activeStyle={activeStyle}>
          <Icon name="search" size="large"/>
        </Link>

        <Link to="/tags" activeStyle={activeStyle}>
          <Icon name="tag" size="large"/>
        </Link>

        {!auth.isAuthenticated()? (
          <React.Fragment>
            <Link to="/login" activeStyle={activeStyle}>
              Login
            </Link>
            <Link to="/register" activeStyle={activeStyle}>
              Register
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Link to="/create-quiz" activeStyle={activeStyle}>
              <Icon name="user" size="large"/>
            </Link>
            <Link to="/create-quiz" activeStyle={activeStyle}>
              <Icon name="sign-out" size="large"/>
            </Link>
          </React.Fragment>
        )}
      </Grid.Column>
    </Grid>
  </PageContainer>
  </StyledNav>
)

export default Navigation
