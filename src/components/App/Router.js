import React from 'react'
import { BrowserRouter, Route } from "react-router-dom"
// Pages
import HomePage from '../../pages/Home'
import AboutPage from '../../pages/About'
import LandingPage from '../../pages/LandingPage'
import CreateQuizPage from '../../pages/CreateQuizPage'
import QuizPage from '../../pages/QuizPage'
import SearchPage from '../../pages/SearchPage'

const Router = props => (
  <BrowserRouter>
    <div>
      <Route exact path="/landing" component={LandingPage} />
      <Route exact path="/" component={HomePage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/create-quiz" component={CreateQuizPage} />
      <Route exact path="/search" component={SearchPage} />
      <Route exact path="/quiz" component={QuizPage} />
    </div>
  </BrowserRouter>
)

export default Router
