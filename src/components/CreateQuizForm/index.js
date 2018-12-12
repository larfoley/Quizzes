import React, { Component } from 'react'
import { Button, Form, Icon, Modal, Loader } from 'semantic-ui-react'
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
import { Link } from 'react-router-dom'
import Auth from 'components/Auth'

const auth = new Auth()

const QuestionWrapper = styled.div`
  background-color: #f5f5f5;
  padding: 1.5em;
  margin: 3.5em 0;
  input {
    background-color: white !important;
  }
`

export default class CreateQuizForm extends Component {
  constructor() {
    super()
    this.state = {
      createdQuizId: 0,
      questions: [
        {
          questionName: "What is foo?",
          answers: [{name: "foo", isCorrect: true}, {name: "bar", isCorrect: false}],

        },
        {questionName: "What is bar?", answers: [{name: "foo", isCorrect: true}, {name: "bar", isCorrect: false}]}
      ],
      tags: [{tagName: "java", displayName: "java"}],
      question: "",
      wrongAnswer: "",
      correctAnswer: "",
      name: "Foo Quiz",
      description: "a quiz about foo",
      tag: "",
      modalIsOpen: false,
      submitting: false,
      quizSubmitted: false
    }

    this.handleInputChange = this.handleInputChange.bind(this)
    this.addTag = this.addTag.bind(this)
    this.deleteTag = this.deleteTag.bind(this)
    this.toggleModal = this.toggleModal.bind(this)
  }

  validateInput() {
    const { name, questions, description } = this.state

    if (name === "") {
      NotificationManager.warning("You have not given your quiz a name.")
      return false
    }

    if (description.length > 100) {
      NotificationManager.warning("Quiz Description is to long.")
      return false
    }

    if (questions.length === 0) {
      NotificationManager.warning("You must have at least one question.")
      return false
    }

    for (let i = 0; i < questions.length; i++) {
      let question = questions[i]

      if (question.question === "") {
        NotificationManager.warning(`Question ${i+1} is left blank.`)
        return false
      }

      if (question.answers.length === 0) {
        NotificationManager.warning(`Question ${i+1} has no answers.`)
        return false
      }

      if (!question.answers.find(answer => answer.isCorrect)) {
        NotificationManager.warning(`Question ${i+1} has no correct answer.`)
        return false
      }

      if (!question.answers.find(answer => answer.isCorrect === false)) {
        NotificationManager.warning(`Question ${i+1} has no wrong answer.`)
        return false
      }
    }

    return true
  }

  postQuiz() {
    let user = window.localStorage.getItem('user')
    let userId

    if (user) {
      userId = JSON.parse(user).userId
    } else {
      return console.log("Error getting user id from localStorage");
    }

    if (!this.validateInput()) {
      return false
    }
    
    const { name, questions, description, tags } = this.state

    const quiz = {
      name,
      description,
      questions,
      tags,
      userId: userId
    }

    this.setState({submitting: true})
    axios({
      method: "POST",
      url: "/api/quizzes",
      headers: {
        'Authorization': auth.getAccessToken()
      },
      data: quiz
    })
    .then((res) => {
      NotificationManager.success("Your Quiz has been publised")
      this.setState({submitting: false, quizSubmitted: true, createdQuizId: 1})
    })
    .catch(err => {
      console.log(err.response);
      NotificationManager.warning(err.message)
    })
  }

  updateQuiz(callback) {
    this.setState(callback(this.state), () => {
    })
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
    const formatTag = tag => tag.split(" ").join("-")
    e.preventDefault()
    if ((this.state.tag && this.state.tags.length < 10) && this.state.tag.length < 25) {
      this.setState(prevState => {
        let { tags } = prevState
        if (!tags.find(tag => tag.tagName === this.state.tag)) {
          prevState.tags.push({tagName: formatTag(this.state.tag), displayName: this.state.tag})
          prevState.tag = ""
          return prevState
        }
      })
    }
  }

  deleteTag(e) {
    const tagName = e.target.getAttribute('data-tag-name')
    this.setState((prevState) => {
      prevState.tags = prevState.tags.filter(tag => tag.tagName !== tagName)
      return prevState
    })
  }



  removeAnswer(questionIndex, answerIndex) {
    this.setState(prevState => {
      prevState.questions[questionIndex].answers.splice(answerIndex, 1)
      return prevState
    })
  }

  toggleModal() {
    this.setState({modalIsOpen: !this.state.modalIsOpen})
  }

  render() {
    const questions = this.state.questions

    return (
      <Box maxWidth="600px">

        {this.state.quizSubmitted? (
          <div style={{textAlign: "center"}}>
            <h2>Your quiz has been Publised</h2>
            <p>
              <Link to={`/quiz/${this.state.createdQuizId}`} >
              Click Here {" "}
            </Link>
            to view your quiz.
          </p>
        </div>

        ): (
          <React.Fragment>

            <Form onSubmit={this.handleSubmit}>
              <FormField>
                <Label>Name *</Label>
                <Input
                  name="name"
                  fluid
                  placeholder='Quiz Name'
                  onChange={this.handleInputChange}
                  required
                  value={this.state.name}
                />
              </FormField>
              <FormField>
                <Label>Description <small>(Optional)</small></Label>
                <TextArea
                  name="description"
                  placeholder='Quiz Description'
                  onChange={this.handleInputChange}
                  value={this.state.description}
                />
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
                <Modal
                  trigger={(
                    <Form.Field>
                      <Button fluid size="huge" onClick={this.toggleModal} primary>
                        <Icon name="plus"/> Add Question
                      </Button>
                    </Form.Field>
                  )}
                  open={this.state.modalIsOpen}
                  onClose={this.toggleModal}
                  basic
                  size='small'
                  >
                    <Modal.Content>
                      <AddQuestionForm updateQuiz={this.updateQuiz.bind(this)}/>
                    </Modal.Content>
                  </Modal>
                </FormField>
            </Form>

            {questions.map((q, questionIndex)=> {

              const correctAnswer = this.state
                .questions[questionIndex]
                .answers.find(ans => ans.isCorrect)
                .name

              return (
                <QuestionWrapper key={"question " + questionIndex}>

                  <FormField>
                    <Label>Question {questionIndex + 1}</Label>
                    <Input
                      fluid
                      value={this.state.questions[questionIndex].questionName}
                      onChange={(e) => {
                        const value = e.target.value
                        this.setState(prevState => {
                          prevState.questions[questionIndex].questionName = value
                          return prevState
                        })
                      }}
                    />
                  </FormField>

                  <FormField>
                    <Label>Correct Answer</Label>
                    <Input fluid value={correctAnswer} onChange={(e) => {
                      const value = e.target.value
                      this.setState(prevState => {
                        prevState.questions[questionIndex].answers = prevState
                        .questions[questionIndex]
                        .answers.map(ans => {
                          if (ans.isCorrect) {
                            ans.name = value
                          }
                          return ans
                        })
                        return prevState
                      })
                    }}/>
                  </FormField>

                  <Form onSubmit={(e) => {
                    e.preventDefault()
                    const value = this.state.wrongAnswer
                    this.setState(prevState => {

                      if (prevState.questions[questionIndex].answers.length > 4) {
                        return prevState
                      }
                      prevState.questions[questionIndex]
                      .answers
                      .push({answer: value, isCorrect: false})
                      prevState.wrongAnswer = ""
                      return prevState
                    })
                  }}>
                  <Label>
                    Wrong Answers {" "}
                  </Label>
                  <FormField>
                    <Input
                      fluid
                      placeholder='add wrong answer...'
                      actionPosition="left"
                      action={{icon: 'plus', color: 'blue'}}
                      value={this.state.wrongAnswer}
                      name="wrongAnswer"
                      onChange={this.handleInputChange}
                    />
                  </FormField>
                </Form>
                {q.answers.map((ans, answerIndex) => (

                  !ans.isCorrect ? (
                    <FormField key={"answer " + answerIndex}>
                      <Input
                        fluid
                        value={ans.name}
                        icon={(
                          <Icon
                            name="times"
                            color="red"
                            inverted
                            circular
                            link
                            onClick={() => {
                              this.removeAnswer(questionIndex, answerIndex)
                            }}
                          />
                        )}
                        onChange={(e) => {
                          const value = e.target.value
                          this.setState(prevState => {
                            prevState.questions[questionIndex].answers[answerIndex].answer = value
                            return prevState
                          })
                        }}
                      />
                    </FormField>
                  ) : null

                ))}
                <FormField>
                  {this.state.submitting? <Loader /> : (
                    <Button onClick={() => {

                      this.setState(prevState => {
                        prevState.questions.splice(questionIndex, 1)
                        return prevState
                      })
                    }}>Delete Question</Button>
                  )}
                </FormField>
              </QuestionWrapper>
            )
          })}

          {this.state.submitting? (
            <Button fluid primary>
              <Loader active inline="centered" />
            </Button>
          ) : (
            <Button fluid size="huge" onClick={this.postQuiz.bind(this)} primary>
              Publish Quiz
            </Button>
          )}
        </React.Fragment>
        )}
        </Box>
      )
  }
}
