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
      questions: [{question: "What is foo?", answers: [{answer: "foo", isCorrect: true}, {answer: "bar", isCorrect: false}]}],
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

  validateInput() {
    const { name, questions, description, tags } = this.state

    if (name === "") {
      NotificationManager.warning("You have not given your quiz a name.")
      return false
    }

    if (questions.length === 0) {
      NotificationManager.warning("You must have at least one question.")
      return false
    }

    for (let i = 0; i < questions.length; i++) {
      let question = questions[i]

      if (question.question == "") {
        return false
      }

      if (question.answers.length === 0) {
        return false
      }

      if (!!question.answers.find(answer => answer.isCorrect)) {
        return false
      }

      if (!!question.answers.find(answer => !answer.isCorrect)) {
        return false
      }
    }

    return true
  }

  postQuiz() {
    if (!this.validateInput()) {
      return
    }
    const { name, questions, description, tags } = this.state

    const quiz = {
      name,
      description,
      questions,
      tags
    }

    axios.post("/api/Quizzes", quiz)
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
      prevState[name] = value.trim()
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
          return prevState
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
            <Label>Name *</Label>
            <Input
              name="name"
              fluid
              placeholder='Quiz Name'
              onChange={this.handleInputChange}
              required
            />
          </FormField>
          <FormField>
            <Label>Description <small>(Optional)</small></Label>
            <TextArea name="description" placeholder='Quiz Description' onChange={this.handleInputChange} />
          </FormField>
        </Form>

        <Form onSubmit={this.addTag}>
          <FormField>
            <Label>Tags <small>(Optional)</small></Label>
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

        <Form>
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
        </Form>

        {questions.map((q, questionKey)=> {
          const correctAnswer = q.answers.find(ans => ans.isCorrect).answer

          return (
            <div key={"question " + questionKey}>
              <h3>Question {questionKey + 1}</h3>

              <h3>{q.question}</h3>
              <h5>Correct Answer</h5>
              <h4><Input fluid value={correctAnswer} onChange={(e) => {
                const value = e.target.value
                this.setState(prevState => {
                  prevState.questions[questionKey].answers = prevState
                    .questions[questionKey]
                    .answers.map(ans => {
                      if (ans.isCorrect) {
                        ans.answer = value
                      }
                      return ans
                  })
                  return prevState
                })
              }}/></h4>
              <h5>Wrong Answers</h5>
              {q.answers.map((ans, answerKey) => (

                !ans.isCorrect ? (
                  <FormField key={"answer " + answerKey}>
                    <Input fluid  value={ans.answer} onChange={(e) => {
                      const value = e.target.value
                      this.setState(prevState => {
                        prevState.questions[questionKey].answers[answerKey].answer = value
                        return prevState
                      })
                    }}/>
                  </FormField>
                ) : null

              ))}
              <FormField>
                <Button onClick={() => {
                  const question = this.state.questions[questionKey]
                  this.setState(prevState => {
                    prevState.questions.splice(questionKey, 1)
                    return prevState
                  })

                }}>Delete Question</Button>
              </FormField>
            </div>
          )
        })}

        <Button fluid size="huge" onClick={this.postQuiz.bind(this)} primary>
          Publish Quiz
        </Button>
      </Box>
    )
  }
}
