import React from 'react'
import axios from 'axios'
import { Icon, Loader, Tab } from 'semantic-ui-react'
import PageContainer from 'components/PageContainer'
import Navigation from 'components/Navigation'
import PageHeader from 'components/PageHeader'
import QuizList from 'components/QuizList'
import ErrorPage from 'pages/ErrorPage'
import styled from 'styled-components'

const StyledTab = styled(Tab)`
  margin-top: 2em;
  .segment {
    background: none !important;
    border: none !important;
    box-shadow: none !important;
    padding: 0 !important;
  }
`

class ProfilePage extends React.Component {
  constructor(props) {
    super(props)
    this.state= {
      username: "",
      quizzes: [],
      favorites: [],
      statusError: 0,
      statusText: "",
      loading: true,
      panes: [
        { menuItem: 'Created Quizzes', render: () => (
          <Tab.Pane attached={false} >
            <QuizList quizzes={this.state.quizzes} />
          </Tab.Pane>
        ) },
        { menuItem: 'Favorite Quizzes', render: () => (
          <Tab.Pane attached={false}>
            <QuizList quizzes={this.state.favorites}/>
          </Tab.Pane>
        ) },

      ]
    }

  }

  componentWillMount() {
    console.log(3, this.state);
    let userName, quizzes, favorites

    axios.get(`/api/users/${this.props.match.params.username}`)
      .then(({ data }) => {
        userName = data.userName
        quizzes = data.quizzes
        console.log("data", data);
        return axios.get(`/api/users/${this.props.match.params.username}/favorites`)
      })
      .then(({ data }) => {
        this.setState({
          loading: false,
          statusCode: 200,
          favorites: data,
          userName,
          quizzes
        })
      })
      .catch(err => {
        console.log(err);
        const { response } = err
        this.setState({
          loading: false,
          statusCode: response.status,
          statusText: response.statusText
        })
      })
  }

  render() {
    const { userName, statusText, statusCode } = this.state

    return (
      <React.Fragment>
        <Loader active={this.state.loading} />
        {this.state.loading === false? (
          this.state.statusCode === 200 ? (
            <React.Fragment>
              <Navigation noShadow/>
                <PageHeader>
                  <Icon name="user circle" size="massive"/>
                  <h1>{userName}</h1>
                </PageHeader>
              <PageContainer>
                <StyledTab menu={{ secondary: true, pointing: true }} panes={this.state.panes} />

              </PageContainer>
            </React.Fragment>
          ) : ( <ErrorPage statusCode={statusCode} statusText={statusText} /> )
        ) : null }
      </React.Fragment>
    )
  }
}

export default ProfilePage
