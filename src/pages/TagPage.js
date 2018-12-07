import React from 'react'
import axios from 'axios'
import { Icon } from "semantic-ui-react"
import Box from 'components/Box'
import TagList from 'components/TagList'
import PageContainer from 'components/PageContainer'
import Navigation from 'components/Navigation'
import PageHeader from 'components/PageHeader'
import QuizList from 'components/QuizList'

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
            <QuizList quizzes={this.state.quizzes}/>

        </PageContainer>
      </div>
    )
  }
}
