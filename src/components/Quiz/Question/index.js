import React, { Component } from 'react'

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

  render = () => (
    <div>
      <h2>Question</h2>
      <h2>{this.props.question.question}</h2>
      <ul>
        {this.props.question.answers.map((ans, i) => (
          <button
            key={i}
            value={ans.isCorrect}
            answered={this.state.answered}
            onClick={this.onAnswerQuestion}>
            {ans.answer}
          </button>
        ))}
      </ul>
    </div>
  )
}
