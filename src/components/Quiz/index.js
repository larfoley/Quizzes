import React, { Component } from 'react'
import Question from './Question'

export default class Quiz extends Component {
  constructor(props) {
    super(props)

    this.state = {
      questionIndex: 0,
      answerdQuestions: [],
      questions: [
        {
          question: "What is foo?",
          answers: [
            { answer: "foo", isCorrect: true},
            { answer: "bar", isCorrect: false},
            { answer: "baz", isCorrect: false}
          ]
        },
        {
          question: "What is bar?",
          answers: [
            { answer: "foo", isCorrect: true},
            { answer: "bar", isCorrect: false},
            { answer: "baz", isCorrect: false}
          ]
        }
      ],
    }

    this.answerQuestion = this.answerQuestion.bind(this)
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
        {questionIndex < questions.length? (
          <Question
            question={questions[questionIndex]}
            answerQuestion={this.answerQuestion}
          />
        ) : (
          <h2>Quiz Over</h2>
        )}
      </div>
    )
  }
}
