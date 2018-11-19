import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
import {
  LandingPage,
  HomePage,
  CreateQuizPage,
  SearchPage,
  QuizPage,
  LoginPage,
  RegisterPage
} from 'pages'

class App extends React.Component {
  render = () => (
    <BrowserRouter>
      <div>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route path="/landing" component={LandingPage} />
        <Route path="/create-quiz" component={CreateQuizPage} />
        <Route path="/search" component={SearchPage} />
        <Route exact path="/quiz/:id" component={QuizPage} />
        <Route exact path="/quiz/:id/start" component={QuizPage} />
      </div>
    </BrowserRouter>
  )
}

export default App
