import React from 'react'
import axios from 'axios'
import { Icon } from "semantic-ui-react"
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
    axios.get(`/api/quizzes/tag/${this.props.match.params.tagName}`)
      .then(res => {
        return res.data
      })
      .then(quizzes => this.setState({ quizzes }))
      .catch(err => console.log)
  }

  render() {

    return (
      <div>
        <Navigation />
        <PageHeader>
          <h1> #{this.props.match.params.tagName.toUpperCase()}</h1>
        </PageHeader>
        <PageContainer>
            <QuizList quizzes={this.state.quizzes}/>
        </PageContainer>
      </div>
    )
  }
}
