import React, { Component } from 'react'
import Answers from './Answers'

export default class Question extends Component  {
  constructor(props) {
    super(props)
    this.state = {
      answerState: 0,
      answered: false
    }
    this.onAnswerQuestion = this.onAnswerQuestion.bind(this)
  }

  onAnswerQuestion(e) {
    this.props.answerQuestion(e.target.value)
    this.setState({answerState: 1, answered: true})
  }

  render() {
    const question = this.props.question
    console.log(question.answers);
    return (
      <div>
        <h2>{question.question}</h2>
        <Answers answers={question.answers}/>
    </div>
    )
  }

}
