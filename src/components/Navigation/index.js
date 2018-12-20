import React from 'react'
import { NavLink } from "react-router-dom"
import styled from 'styled-components'
import { Icon, Grid, Button, Dropdown, Responsive } from 'semantic-ui-react'
import PageContainer from 'components/PageContainer'
import BottomNav from './BottomNav'
import DropdownLink from './DropdownLink'

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
        <BottomNav />
        <PageContainer>
        <Grid columns='equal'>
          <Grid.Column width={5}>
            <Logo to="/">
              Quizzes
            </Logo>
          </Grid.Column>

          <Grid.Column textAlign="right">

            <Responsive minWidth={800}>

              <Link to="/create-quiz">
                <Button primary><Icon name="plus"/> Create Quiz</Button>
              </Link>

              <Link to="/search">
                <Icon name="search" size="large"/>
              </Link>

              <Link to="/tags">
                <Icon name="tag" size="large"/>
              </Link>


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
                </React.Fragment>
              )}
            </Responsive>
            {!auth.isAuthenticated()? (
              <Responsive maxWidth={800}>
                <React.Fragment>
                  <Link to="/login">
                  Login
                  </Link>
                  <Link to="/register">
                    Register
                  </Link>
                </React.Fragment>
              </Responsive>
            ) : null}
          </Grid.Column>
        </Grid>
      </PageContainer>
      </StyledNav>
    )
  }
}

export default Navigation
