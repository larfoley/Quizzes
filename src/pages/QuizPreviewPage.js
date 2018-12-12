import React from 'react'
import axios from 'axios'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import QuizPreview from 'components/QuizPreview'

class QuizPreviewPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quiz: null}
  }

  componentWillMount() {
    const quizId = this.props.match.params.id
    axios.get(`/api/quizzes/${quizId}`)
      .then(res => this.setState({quiz: res.data}))
      .catch(err => console.log)
  }


  render() {
    const quiz = this.state.quiz
    
    return (
      <Main>
        <PageContainer>
          <Box>
            {quiz? <QuizPreview {...quiz}/> : null}
          </Box>
        </PageContainer>
      </Main>

    )
  }
}

export default QuizPreviewPage
