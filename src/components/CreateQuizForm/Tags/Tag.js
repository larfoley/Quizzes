import React from 'react'
import styled from 'styled-components'
// import PropTypes from 'prop-types'
import { Button, Label, Icon } from 'semantic-ui-react'

const Wrapper = styled.span`
  display: inline-block;
  margin-right: 1em;
  margin-bottom: 1em;
  margin-top: 1em;
`
const Tag = ({ name, deleteTag }) => (
  <Wrapper>
    <Button as='div' labelPosition='left'>
      <Label as='a' basic pointing='right'>
        {name}
      </Label>
      <Button icon onClick={deleteTag} type="button" data-tag-name={name}>
        <Icon name='times' data-tag-name={name} />
      </Button>
    </Button>
  </Wrapper>
)

export default Tag
