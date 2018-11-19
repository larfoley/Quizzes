import React, { Component } from 'react'
import { Button, Form, Icon } from 'semantic-ui-react'
import Box from '../Box'
import Question from './Question'
import Tags from './Tags'
import FormField from './FormField'
import Label from './Label'
import Input from 'components/Input'
import TextArea from 'components/TextArea'

export default class CreateQuizForm extends Component {
  constructor() {
    super()
    this.state = {
      questionID: 1,
      questions: [],
      tags: [],
      question: "",
      name: "",
      description: "",
      tag: ""
    }

    this.addQuestion = this.addQuestion.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.addTag = this.addTag.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
  }

  handleInputChange(event) {
    const name = event.target.name
    const value = event.target.value

    this.setState(prevState => {
      prevState[name] = value
      return prevState
    })
  }

  addTag(e) {
    e.preventDefault()
    if (this.state.tag && this.state.tags.length < 10) {
      this.setState(({ tag, tags }) => {
        if (!tags.find(tag => tag === this.state.tag)) {
          tags.push(this.state.tag)
          tag = ""
          return {tags, tag}
        }
      })
    }
  }

  deleteTag(e) {
    const tagName = e.target.getAttribute('data-tag-name')
    this.setState((prevState) => {
      prevState.tags = prevState.tags.filter(tag => tag !== tagName)
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

      <Box>
        <Form>
          <FormField>
            <Label>Name</Label>
            <Input fluid placeholder='First Name' />
          </FormField>
          <FormField>
            <Label>Description</Label>
            <TextArea placeholder='Last Name' />
          </FormField>
        </Form>

        <Form onSubmit={this.addTag}>
          <FormField>
            <Label>Tags</Label>
            <Tags tags={this.state.tags} deleteTag={this.deleteTag}/>
            <Input
              fluid
              placeholder='add tag...'
              actionPosition="left"
              action={{icon: 'tag', color: 'blue'}}
              value={this.state.tag}
              name="tag"
              onChange={this.handleInputChange}
            />
          </FormField>
        </Form>

        <FormField>
          <Label>Questions</Label>
          <Button primary><Icon name="plus"/> Add Question</Button>

          {this.state.questions.map((q, i) => (
            <Question
              key={q.id}
              id={q.id}
              question={q.question}
              answers={q.answers}
              addAnswer={this.addAnswer}
            />
          ))}
        </FormField>
      </Box>
    )
  }
}
