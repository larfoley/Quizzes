import React, { Component } from 'react'
import styled from 'styled-components'
import { Icon } from 'semantic-ui-react'

const Wrapper = styled.div`
  background-color: #f5f5f5;
  padding: 1em;
  margin-bottom: 1em;
`

export default class Answer extends Component {

  render() {
    return (
      <Wrapper>
        <Icon name={this.props.isCorrect? "check" : "times"} /> {this.props.answer}
      </Wrapper>
    )
  }
}
