import React, { Component } from 'react'
import Button from 'components/Button'
import Answer from './Answer'

export default class Quiz extends Component {
  constructor(props) {
    super(props)

    this.state = {
      quizInProgress: false,
      questionIndex: 0,
      answeredQuestions: [],
      questions: props.questions,
      questionAnswered: false
    }

    this.answerQuestion = this.answerQuestion.bind(this)
  }

  getCurrentQuestion() {
    return this.state.questions[this.state.questionIndex]
  }

  nextQuestion() {
    if (this.state.questionIndex < this.state.questions.length - 1) {

      this.setState(prevState => {
        prevState.questionAnswered = false
        prevState.questions[prevState.questionIndex].answers.forEach(ans => {
          delete ans['answeredCorrectly']
        })
        prevState.questionIndex = prevState.questionIndex + 1
        return prevState
      })

    } else {
      alert('over')
    }

  }

  answerQuestion(answer) {
    console.log(this.getCurrentQuestion());
  }

  onAnswerQuestion({ target }) {
    if (!this.state.questionAnswered) {
      const { answers } = this.getCurrentQuestion()
      const selectedAnswer = target.getAttribute('data-id')
      const correct = answers[selectedAnswer]['isCorrect'];

      this.setState(prevState => {
        prevState.questionAnswered = true
        prevState.answeredCorrectly = correct
        prevState
        .questions[this.state.questionIndex]
        .answers[selectedAnswer]['answeredCorrectly'] = correct
        prevState.answeredQuestions.push({
          correct, index: prevState.questionIndex
        })
        return prevState
      })
    }
  }

  render() {
    const questions = this.state.questions
    const questionIndex = this.state.questionIndex
    const currentQuestion = questions[questionIndex].question
    const currentAnswers = questions[questionIndex].answers
    return (
      <div>
        <h2>{currentQuestion}</h2>
        {currentAnswers.map((ans, i) => (
          <Answer
            key={i}
            data-id={i}
            onClick={this.onAnswerQuestion.bind(this)}
            answered={this.state.questionAnswered}
            answeredCorrectly={ans.answeredCorrectly}
            isCorrect={ans.isCorrect}
          >
            {ans.answer}
          </Answer>
        ))}
        {this.state.questionAnswered? (
          <Button onClick={this.nextQuestion.bind(this)}>Next Question</Button>
        ) : null}

      </div>
    )
  }
}
