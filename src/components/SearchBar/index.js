import React from 'react'
import { Input }from 'semantic-ui-react'
import styled from 'styled-components'

const StyledInput = styled(Input)`
  width: 100%;
  margin-top: 2em;
  margin-bottom: 2em;

  &&&& .button {
    background-color: var(--primary-color);
    color: white;
    padding: 1.5em;
  }

  &&&& input {
    position: absolute;
    border: none;
    top: 0;
    bottom: 0;
    padding-left: calc(72.54px + 1em);
    &:focus {
      outline-
    }
  }

  &&&&& button {
    z-index: 2;
    padding-left: 2em;
    padding-right: 2em;
  }
`


const SearchBar = props => (
  <StyledInput
    action={{icon: 'search'}}
    actionPosition='left'
    placeholder='Search for a Quiz...'
    value={props.searchTerm}
    onChange={props.handleChange}
  />
)

export default SearchBar
