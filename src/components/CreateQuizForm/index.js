import React, { Component } from 'react'
import { Button, Form, Icon, Modal } from 'semantic-ui-react'
import { NotificationManager } from 'react-notifications'
import axios from 'axios'
import Box from '../Box'
import Tags from './Tags'
import FormField from './FormField'
import Label from './Label'
import Input from 'components/Input'
import TextArea from 'components/TextArea'
import styled from 'styled-components'
import AddQuestionForm from 'components/AddQuestionForm'

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
      tag: "",
      modalIsOpen: false,
    }

    this.addQuestion = this.addQuestion.bind(this)
    this.addAnswer = this.addAnswer.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.addTag = this.addTag.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  postQuiz(e) {
    e.preventDefault()
    const quiz = {
      name: "Test",
      description: "test quiz",
      questions: [
        {
          questionName: "What?",
          answers: [
            {
              Name: "a",
              isCorrect: true
            },
            {
              Name: "b",
              isCorrect: true
            }
          ]
        }
      ],
      tags: [
        {tagName: "java"}
      ]
    }

    axios({
      method: 'post',
      url: '/api/Quizzes',
      data: quiz
    })
    .then(res => {
      console.log(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }

  updateQuiz(callback) {
    this.setState(callback(this.state))
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
    if ((this.state.tag && this.state.tags.length < 10) && this.state.tag.length < 25) {
      this.setState(prevState => {
        let { tags, tag } = prevState
        if (!tags.find(tag => tag === this.state.tag)) {
          prevState.tags.push(this.state.tag)
          prevState.tag = ""
          console.log(prevState);
          return prevState
        } else {

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

  toggleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen})
  }

  render() {
    const questions = this.state.questions

    return (
      <Box maxWidth="600px">

        <Form onSubmit={this.handleSubmit}>
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
            <Input
              fluid
              placeholder='add tag...'
              actionPosition="left"
              action={{icon: 'tag', color: 'blue'}}
              value={this.state.tag}
              name="tag"
              onChange={this.handleInputChange}
            />
            <Tags tags={this.state.tags} deleteTag={this.deleteTag}/>
          </FormField>
        </Form>

        <FormField>
          <Label>Questions</Label>
          <Modal
            trigger={(
              <Form.Field>
                <Button fluid size="huge" onClick={this.toggleModal} primary>
                  <Icon name="plus"/> Add Question
                </Button>
              </Form.Field>
            )}
            open={this.state.modalIsOpen}
            onClose={this.toggleModal.bind(this)}
            basic
            size='small'
          >
            <Modal.Content>
              <AddQuestionForm updateQuiz={this.updateQuiz.bind(this)}/>
            </Modal.Content>
          </Modal>

        </FormField>
        {questions.map((q, key)=> <p key={key}>{q.question}</p>)}

        <Button fluid size="huge" onClick={this.postQuiz.bind(this)} primary>
          <Icon name="plus" onClick={this.postQuiz.bind(this)}/> Save Quiz
        </Button>
      </Box>
    )
  }
}
