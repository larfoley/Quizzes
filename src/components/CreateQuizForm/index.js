import React, { Component } from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import Box from '../Box'
import Question from './Question'
import QuizTag from './QuizTag'

export default class CreateQuizForm extends Component {
  constructor() {
    super()
    this.state = {
      questionID: 1,
      questions: [],
      tags: ["java"],
      question: "",
      name: "",
      description: "",
      tag: ""
    }

    this.addQuestion = this.addQuestion.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event) {
    const name = event.target.name
    const value = event.target.value
    this.setState(prevState => {
      prevState[name] = value
      return prevState
    })
  }

  addQuestion() {
    this.setState(prevState => {
      prevState.questions.push({
        id: prevState.questionID,
        question: prevState.question,
        answers: [],
      })
      prevState.questionID = prevState.questionID + 1
      return prevState
    })
  }

  addAnswer(questionID, answer) {
    this.setState(prevState => {
      const question = prevState.questions.find(q => q.id === questionID)
      if (question) {
        question.answers.push(answer)
        return prevState
      }
    })
  }

  render() {
    return (
      <Form>
        <Box>
          <Form.Field>
            <label>Quiz Name</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <label>Quiz Description</label>
            <input placeholder='Last Name' />
          </Form.Field>
        </Box>

        <Box>
          <Form.Field>
            <label>Add Question</label>
            <input name="question" onChange={this.handleInputChange} placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            {/* <Input placeholder='Search...' actionPosition="left" action={{icon: 'plus', color: 'teal'}} /> */}
            {/* <Input
              action={{
                color: 'teal',
                // labelPosition: 'left',
                icon: 'plus',
                // content:'Question'
              }}
              actionPosition='left'
              placeholder='Add Question...'
              defaultValue=''
            /> */}
          </Form.Field>
          {this.state.questions.map((q, i) => (
            <Question
              key={q.id}
              id={q.id}
              question={q.question}
              answers={q.answers}
              addAnswer={this.addAnswer}
            />
          ))}
        </Box>

        <Box>
          <Form.Field>
            <label>Quiz Tag</label>
            <input placeholder='First Name' />
          </Form.Field>
          <Form.Field>
            <Button primary>Add Tag</Button>
          </Form.Field>
          {this.state.tags.map(tag => <QuizTag tag={tag} />)}
        </Box>

        {/* <Form.Field>
          <Button primary fluid size='huge'>Create Quiz</Button>
        </Form.Field> */}

      </Form>
    )
  }
}
