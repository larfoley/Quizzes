import React from 'react'
import InputWithIcon from 'components/InputWithIcon'

const SearchBar = props => (
  <InputWithIcon
    action={{icon: 'search'}}
    actionPosition='left'
    placeholder='Search for a Quiz...'
    value={props.value}
    onChange={props.onChange}
    autoFocus={true}
  />
)

export default SearchBar
