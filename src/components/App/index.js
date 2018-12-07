import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import PrivateRoute from 'components/PrivateRoute'
import { NotificationContainer } from 'react-notifications';
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
  SettingsPage
} from 'pages'


class App extends React.Component {

  render = () => (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/register" component={RegisterPage}/>
        <Route exact path="/login" component={LoginPage} />
        <Route path="/landing" component={LandingPage} />
        <PrivateRoute path="/create-quiz" component={CreateQuizPage} />
        <Route path="/search" component={SearchPage} />
        <Route exact path="/quiz/:id" component={QuizPreviewPage} />
        <Route exact path="/quiz/:id/start" component={QuizPage} />
        <Route exact path="/tags" component={TagsPage} />
        <Route exact path="/tags/:tagName" component={TagPage} />
        <PrivateRoute exact path="/account" component={QuizPage} />
        <PrivateRoute exact path="/dashboard" component={DashboardPage} />
        <PrivateRoute exact path="/profile" component={ProfilePage} />
        <PrivateRoute exact path="/settings" component={SettingsPage} />
        <NotificationContainer />
      </div>
    </BrowserRouter>
  )
}

export default App
