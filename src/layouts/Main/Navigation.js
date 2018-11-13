import React from 'react'
import { NavLink } from "react-router-dom"
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const StyledNav = styled.nav`
  background-color: var(--primary-color);
  margin-bottom: 2em;
  overflow: auto;

  a {
    font-size: 1.2em;
    text-decoration: none;
    display: inline-block;
    padding: 1.2em 1em;
    color: white;
    transition: .1s;
    margin-right: 3em;
    float: right;
    ${'' /* border-bottom: 3px solid; */}

    &:hover {
      ${'' /* color: teal;
      border-color: teal; */}
      color: #f5f5f5;
    }
  }
`

const activeStyle = {
  // color: 'white'
}

const Navigation = props => (
  <StyledNav>
    <NavLink to="/account" activeStyle={activeStyle}>
    <Icon name="user" /> Account
    </NavLink>
    <NavLink to="/search" activeStyle={activeStyle}>
      <Icon name="search" /> Search
    </NavLink>
    <NavLink to="/create-quiz" activeStyle={activeStyle}>
      <Icon name="plus" /> New Quiz
    </NavLink>
    {/* <NavLink to="/quiz" activeStyle={activeStyle}>
      <Icon name="graduation" /> Quiz
    </NavLink> */}
  </StyledNav>
)

export default Navigation
