import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import PrivateRoute from 'components/PrivateRoute'
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
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
        <PrivateRoute path="/create-quiz" component={CreateQuizPage} />
        <Route path="/search" component={SearchPage} />
        <Route exact path="/quiz/:id" component={QuizPreviewPage} />
        <Route exact path="/quiz/:id/start" component={QuizPage} />
        <Route exact path="/tags" component={TagsPage} />
        <Route exact path="/tags:tag" component={TagsPage} />
        <PrivateRoute exact path="/dashboard" component={QuizPage} />
        <Route exact path="/profile" component={QuizPage} />
        <PrivateRoute exact path="/account" component={QuizPage} />
      </div>
    </BrowserRouter>
  )
}

export default App
