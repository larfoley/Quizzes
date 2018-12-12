import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import PrivateRoute from 'components/PrivateRoute'
import { NotificationContainer } from 'react-notifications';
import Logout from 'components/Logout'
import Auth from 'components/Auth'

import {
  LandingPage,
  HomePage,
  CreateQuizPage,
  SearchPage,
  QuizPage,
  LoginPage,
  RegisterPage,
  QuizPreviewPage,
  TagsPage,
  TagPage,
  ProfilePage,
  DashboardPage,
  SettingsPage,
  ErrorPage
} from 'pages'

const auth = new Auth()

class App extends React.Component {

  constructor() {
    super()
    auth.isAuthenticated()
  }

  render = () => (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/user/:username" component={ProfilePage} />
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/logout" render={Logout} />
        <Route path="/landing" component={LandingPage} />
        <PrivateRoute path="/create-quiz" component={CreateQuizPage} />
        <Route path="/search" component={SearchPage} />
        <Route exact path="/quiz/:id" component={QuizPreviewPage} />
        <Route exact path="/quiz/:id/start" component={QuizPage} />
        <Route exact path="/tags" component={TagsPage} />
        <Route exact path="/tags/:tagName" component={TagPage} />
        <PrivateRoute exact path="/account" component={QuizPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        <PrivateRoute exact path="/settings" component={SettingsPage} />
        <Route exact path="/error" component={ErrorPage} />
        <NotificationContainer />
      </div>
    </BrowserRouter>
  )
}

export default App
