import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import DropdownLink from './DropdownLink'
import Auth from 'components/Auth'

const auth = new Auth()

const Wrapper = styled.div`
  display: none;
  z-index: 10;
  @media screen and (max-width: 800px) {
    display: block;
    background-color: white;
    position: fixed;
    bottom: 0;
    width: 100%;
    display: flex;
  }
`

const Item = styled.span`
  flex-grow: 1;
  flex-basis: 0;
  text-align: center;
  padding: 2em 0;
  color: blue;
`

const BottomNav = (props) => (
  <Wrapper>
    <Item>
      <Link to="/">
        <Icon name="home" size="large"/>
      </Link>
    </Item>
    <Item>
      <Link to="/search">
        <Icon name="search" size="large"/>
      </Link>
    </Item>
    <Item>
      <Link to="/tags">
        <Icon name="tag" size="large"/>
      </Link>
    </Item>
    <Item>
      <Link to="/create-quiz">
        <Icon name="plus" size="large"/>
      </Link>
    </Item>
      {auth.isAuthenticated() ? (
        <Item>
          <span>
            <DropdownLink />
          </span>
        </Item>
      ) : null}
  </Wrapper>
)

export default BottomNav
