import React, { Component } from 'react'
import Question from './Question'
import Button from 'components/Button'

export default class Quiz extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quizInProgress: false,
      questionIndex: 0,
      answerdQuestions: [],
      questions: props.questions,
    }

    this.answerQuestion = this.answerQuestion.bind(this)
  }

  nextQuestion() {
  }

  answerQuestion(correct) {
    const questionIndex = this.state.questionIndex
    const numberOfQuestions = this.state.questions.length

    if (questionIndex < numberOfQuestions - 1) {
      this.setState({questionIndex: this.state.questionIndex + 1})
    }
  }

  render() {
    const questions = this.state.questions
    const questionIndex = this.state.questionIndex
    return (
      <div>
        <Question question={questions[this.state.questionIndex]}/>
        <Button onClick={() => {}}>Next Question</Button>
      </div>
    )
  }
}
