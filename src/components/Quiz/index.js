import React, { Component } from 'react'
import axios from 'axios'
import Button from 'components/Button'
import Question from './Question'
import Answer from './Answer'
import QuizResults from './QuizResults'

export default class Quiz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      quizInProgress: false,
      questionIndex: 0,
      answeredQuestions: [],
      questions: props.questions,
      questionAnswered: false,
      quizIsFinished: false,
    }
    this.playAgain = this.playAgain.bind(this)
  }

  incrementTimesPlayed() {
    axios.put(`/api/quizzes/${this.props.quizId}/increment-times-played`)
      .catch(err => {
        console.log("Unable to increment quiz times played");
        console.log(err.response);
      })
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
      this.setState(prevState => {
        prevState.questionAnswered = false
        prevState.questions[prevState.questionIndex].answers.forEach(ans => {
          delete ans['answeredCorrectly']
        })
        prevState.quizIsFinished = true
        return prevState
      })
    }

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

  playAgain() {
    this.setState({
      quizInProgress: true,
      questionIndex: 0,
      answeredQuestions: [],
      questionAnswered: false,
      quizIsFinished: false,
    })
  }

  render() {
    const questions = this.state.questions
    const questionIndex = this.state.questionIndex
    const currentQuestion = questions[questionIndex].questionName
    const currentAnswers = questions[questionIndex].answers

    if (this.state.quizIsFinished) {
      this.incrementTimesPlayed()
    }
    return (
      <div>
        {!this.state.quizIsFinished?
          <div style={{marginTop: "2em"}}>
            <span>Question {questionIndex + 1 } of {questions.length}</span>
            <Question>{currentQuestion}</Question>
            {currentAnswers.map((ans, i) => (
              <Answer
                key={i}
                data-id={i}
                onClick={this.onAnswerQuestion.bind(this)}
                answered={this.state.questionAnswered}
                answeredCorrectly={ans.answeredCorrectly}
                isCorrect={ans.isCorrect}
                >
                  {ans.name}
                </Answer>
              ))}
              {this.state.questionAnswered? (
                questionIndex < questions.length - 1 ?
                <Button onClick={this.nextQuestion.bind(this)}>Next Question</Button>
                :
                <Button onClick={this.nextQuestion.bind(this)}>Finish Quiz</Button>
              ) : null }
            </div>
          : (
            <QuizResults
              results={this.state.answeredQuestions}
              playAgain={this.playAgain}
            />
          )
        }
      </div>
    )
  }
}
