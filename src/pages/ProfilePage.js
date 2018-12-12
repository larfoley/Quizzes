import React from 'react'
import axios from 'axios'
import { Icon, Loader } from 'semantic-ui-react'
import PageContainer from 'components/PageContainer'
import Navigation from 'components/Navigation'
import PageHeader from 'components/PageHeader'
import QuizList from 'components/QuizList'
import ErrorPage from 'pages/ErrorPage'

class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      username: "",
      quizzes: [],
      statusError: 0,
      statusText: "",
      loading: true
    }

  }

  componentWillMount() {
    axios.get(`/api/${this.props.match.params.username}`)
      .then()
      .catch(err => {
        const { response } = err
        this.setState({
          loading: false,
          statusCode: response.status,
          statusText: response.statusText
        })
      })
  }

  render() {
    const { username, statusText, statusCode } = this.state

    return (
      <React.Fragment>
        <Loader active={this.state.loading} />
        {this.state.loading === false? (
          this.state.statusCode === 0 ? (
            <React.Fragment>
              <Navigation noShadow/>
                <PageHeader>
                  <Icon name="user circle" size="massive"/>
                  <h1>{username}</h1>
                </PageHeader>
              <PageContainer>
                <h2>Created Quizzes</h2>
                <QuizList quizzes={this.state.quizzes}/>
              </PageContainer>
            </React.Fragment>
          ) : ( <ErrorPage statusCode={statusCode} statusText={statusText} /> )
        ) : null }
      </React.Fragment>
    )
  }
}

export default ProfilePage
