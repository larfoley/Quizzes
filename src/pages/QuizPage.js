import React from 'react'
import axios from 'axios'
import Quiz from '../components/Quiz'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'

class QuizPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {quiz: null}
  }

  componentWillMount() {
    const quizId = this.props.match.params.id
    console.log(quizId);
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
            {quiz? <Quiz {...quiz}/> : null}
          </Box>
        </PageContainer>
      </Main>

    )
  }
}

export default QuizPage
