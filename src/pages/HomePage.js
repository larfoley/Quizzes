import React from 'react'
import PageContainer from 'components/PageContainer'
import QuizList from 'components/QuizList'
import Navigation from 'components/Navigation'
import axios from 'axios'
import { Loader } from 'semantic-ui-react'
import Auth from 'components/Auth'

const auth = new Auth()

export default class Home extends React.Component {

  constructor(props) {
    super()
    this.state = {
      quizzes: [],
      loading: true,
      error: null
    }
  }

  componentWillMount() {
    let userId

    if (auth.isAuthenticated()) {
      const user = JSON.parse(window.localStorage.getItem("user"))
      userId = user.userId
    }

    axios.get(`/api/quizzes?userId=${userId}`)
      .then(({ data }) => {
        console.log(data);
        this.setState({quizzes: data, loading: false})
      })
      .catch(error => {
        console.log(error.response);
        this.setState({
          loading: false,
          error: error.response
        })
      })
  }

  render() {
    const { error, quizzes, loading } = this.state

    return (
      <div>
        <Navigation />
        <PageContainer>
          <Loader active={loading}/>
          {error ? (
              <h3>Unable to load quizzes. Try again later.</h3>
            ) : (
              <QuizList quizzes={quizzes} />
            )
          }
        </PageContainer>
      </div>
    )
  }

}
