import React from 'react'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import TagList from 'components/TagList'
import Navigation from 'components/Navigation'
import axios from 'axios'
import PageHeader from 'components/PageHeader'
import { Icon } from "semantic-ui-react"

export default class TagPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quizzes: []}
  }

  componentWillMount() {
    axios.get(`/api/quizzes/${this.props.tagName}`)
      .then(res => this.setState({quizzes: res.data}))
      .catch(err => console.log)
  }

  render() {
    return (
      <div>
        <Navigation userIsAuthenticated={this.props.user}/>
        <PageHeader>
          <h1><Icon name="tag"/> {this.props.match.params.tagName.toUpperCase()} QUIZZES</h1>
        </PageHeader>
        <PageContainer>
          <Box>


          </Box>
        </PageContainer>
      </div>
    )
  }
}
