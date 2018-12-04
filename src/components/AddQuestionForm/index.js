import React, { Component } from 'react'
import { Button, Form } from 'semantic-ui-react'
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
      wrongAnswer1: "",
      wrongAnswer2: "",
      wrongAnswer3: ""
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit() {
    const {
      question,
      correctAnswer,
      wrongAnswer1,
      wrongAnswer2,
      wrongAnswer3
    } = this.state

    const newQuestion = {
      question,
      answers: [
        {answer: correctAnswer, isCorrect: true},
        {answer: wrongAnswer1, isCorrect: false},
        {answer: wrongAnswer2, isCorrect: false},
        {answer: wrongAnswer3, isCorrect: false}
      ]
    }

    this.props.updateQuiz(prevState => {
      prevState.questions.push(newQuestion)
      prevState.modalIsOpen = false;
      return prevState
    })

  }

  handleChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.setState(prevState => {
      prevState[name] = value
      return prevState
    })
  }

  render() {
    return (
      <Wrapper>
        <Form onSubmit={this.handleSubmit.bind(this)}>
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
          <FormField>
            <Label>Wrong Answer</Label>
            <Input
              fluid
              placeholder='Wrong Answer'
              name="wrongAnswer1"
              onChange={this.handleChange}
              value={this.state.wrongAnswer1}
            />
          </FormField>
          <FormField>
            <Label>Wrong Answer</Label>
            <Input
              fluid
              placeholder='Wrong Answer'
              name="wrongAnswer3"
              onChange={this.handleChange}
              value={this.state.wrongAnswer3}
            />
          </FormField>
          <FormField>
            <Button type="submit" fluid primary size="large">Add Question</Button>
          </FormField>
        </Form>
      </Wrapper>
    )
  }
}
