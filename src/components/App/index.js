import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import {
  LandingPage,
  HomePage,
  CreateQuizPage,
  SearchPage,
  QuizPage,
  LoginPage,
  RegisterPage,
  QuizPreviewPage,
  TagsPage
} from 'pages'


class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      user: false
    }
  }


  registerUser() {
    window.alert("reg")
  }

  componentWillMount() {
    if (sessionStorage.user) {
      this.setState({user: true})
    }
  }

  render = () => (
    <BrowserRouter>
      <div>
        <Route exact path="/" render={props => (
          <HomePage user={this.state.user} />
        )} />
        <Route exact path="/register" render={props => (
          <RegisterPage
          />
        )} />
        <Route exact path="/login" render={props => (
          <LoginPage
          />
        )} />
        <Route exact path="/tags" render={props => (
          <TagsPage
          />
        )} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/create-quiz" component={CreateQuizPage} />
        <Route path="/search" component={SearchPage} />
        <Route exact path="/quiz/:id" component={QuizPreviewPage} />
        <Route exact path="/quiz/:id/start" component={QuizPage} />
      </div>
    </BrowserRouter>
  )
}

export default App
