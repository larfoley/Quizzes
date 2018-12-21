import React, { Component } from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications'
import FormField from './FormField'
import Label from './Label'
import Input from 'components/Input'
import styled from 'styled-components'

const Wrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  background-color: white;
  padding: 1em;
  margin: 2em 0;

`
export default class AddQuestionForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      question: "",
      correctAnswer: "",
      wrongAnswer: "",
      wrongAnswers: [],
    }
    this.onAddQuestion = this.onAddQuestion.bind(this)
    this.onAddWrongAnswer = this.onAddWrongAnswer.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleWrongAnswerChange = this.handleWrongAnswerChange.bind(this)
    this.removeWrongAnswer = this.removeWrongAnswer.bind(this)
    this.validate = this.validate.bind(this)
  }

  validate() {
    const { question, correctAnswer, wrongAnswers } = this.state

    if (question === "") {
      NotificationManager.warning("You must enter a question.")
      return false
    }

    if (correctAnswer === "") {
      NotificationManager.warning("You must enter a correct answer.")
      return false
    }

    if (wrongAnswers.length === 0) {
      NotificationManager.warning("You must have at least one wrong answer.")
      return false
    }

    return true
  }

  onAddQuestion() {
    if (!this.validate()) {return}

    let {
      question,
      correctAnswer,
      wrongAnswers
    } = this.state

    const newQuestion = {
      questionName: question,
      answers: [{name: correctAnswer, isCorrect: true}]
    }

    wrongAnswers = wrongAnswers.map(ans => {
      return {name: ans, isCorrect: false}
    })

    newQuestion.answers = newQuestion.answers.concat(wrongAnswers)

    this.props.addQuestion(newQuestion)

  }

  onAddWrongAnswer(event) {
    event.preventDefault()
    if (this.state.wrongAnswers.length >= 5) {
      NotificationManager.info("You are only allowed to add up to 5 wrong answers!")
    } else if (this.state.wrongAnswer.trim() === "") {
      NotificationManager.info("You did not enter a wrong answer!")
    } else {
      this.setState(prevState => {
        prevState.wrongAnswers.push(this.state.wrongAnswer)
        prevState.wrongAnswer = ""
        return prevState
      })
    }

  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.setState(prevState => {
      prevState[name] = value
      return prevState
    })
  }

  handleWrongAnswerChange({ target }) {
    this.setState(prevState => {
      const id = target.getAttribute('id')
      prevState.wrongAnswers[id] = target.value
      return prevState
    })
  }

  removeWrongAnswer(e) {
    const id = parseInt(e.target.getAttribute('deletewronganswerid'), 10)

    this.setState(prevState => {
      prevState.wrongAnswers = prevState.wrongAnswers.filter((ans, i) => i !== id)
      console.log(prevState.wrongAnswers.filter((ans, i) => i !== id));
      return prevState
    })

  }

  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.onAddQuestion.bind(this)}>
          <FormField>
            <Label>Question</Label>
            <Input
              fluid
              placeholder='Question'
              name="question"
              onChange={this.handleChange}
              value={this.state.question}
            />
          </FormField>
          <FormField>
            <Label>Correct Answer</Label>
            <Input
              fluid
              placeholder='Correct Answer'
              name="correctAnswer"
              onChange={this.handleChange}
              value={this.state.correctAnswer}
            />
          </FormField>
          {this.state.wrongAnswers.map((ans, i) => (
            <FormField key={i}>
              <Label>Wrong Answer {i + 1}</Label>

              <Input
                fluid
                id={i}
                placeholder='Wrong Answer'
                name="wrongAnswer"
                onChange={this.handleWrongAnswerChange}
                value={this.state.wrongAnswers[i]}
                icon={(
                  <Icon
                    name="times"
                    deletewronganswerid={i}
                    color="red"
                    onClick={this.removeWrongAnswer}
                    inverted
                    circular
                    link
                  />
                )}
              />

            </FormField>
          ))}
        </Form>
        <Form onSubmit={this.onAddWrongAnswer}>
          <FormField>
            <Label>Add Wrong Answer</Label>
            <Input
              fluid
              placeholder='add wrong answer...'
              actionPosition="left"
              action={{icon: 'plus', color: 'blue'}}
              name="wrongAnswer"
              onChange={this.handleChange}
              value={this.state.wrongAnswer}
            />
          </FormField>
        </Form>
          <FormField>
            <Button
              type="submit"
              fluid
              primary
              size="large"
              onClick={this.onAddQuestion}>Add Question</Button>
          </FormField>
      </Wrapper>
    )
  }
}
