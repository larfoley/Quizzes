import React from 'react'
import axios from 'axios'
import QuizItem from './QuizItem'
import PropTypes from 'prop-types'
import { Loader } from 'semantic-ui-react'

class QuizList extends React.Component {
  constructor() {
    super()
    this.state = {
      quizzes: [],
      loading: false,
      errorLoadingQuizzes: false
    }
  }

  componentWillMount() {
    this.setState({loading: true})
    axios.get('/api/quizzes')
      .then(({data}) => {
        this.setState({quizzes: data, loading: false})
      })
      .catch(err => {
        console.log(err);
        this.setState({loading: false, errorLoadingQuizzes: true})
      })
  }
  render() {
    return (
      <div>
        <Loader active={this.state.loading} inline="centered">Loading</Loader>
        <div>
          {this.state.errorLoadingQuizzes? (
            <p>Unable to load quizzes. Try again later.</p>
          ) : null}
          {this.state.quizzes.map((quiz, i) => (
            <QuizItem
              key={quiz._id}
              quizID={quiz._id}
              name={quiz.name}
              description={quiz.description}
              author={quiz.author}
              tags={quiz.tags}
            />
          ))}
        </div>
      </div>
    )
  }
}

QuizList.propTypes = {
  quizzes: PropTypes.array
}

export default QuizList
