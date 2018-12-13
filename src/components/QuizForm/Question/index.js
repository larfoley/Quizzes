import React, { Component } from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'
import Answer from './Answer'
import Box from '../../Box'

export default class Question extends Component {
  constructor(props) {
    super(props)
    this.state = {
      answer: "",
      modalOpen: false
    }

    this.addAnswer = this.addAnswer.bind(this)
    this.addCorrectAnswer = this.addCorrectAnswer.bind(this)
    this.addWrongAnswer = this.addWrongAnswer.bind(this)
  }

  handleOpen = () => this.setState({ modalOpen: true })

  handleClose = () => this.setState({ modalOpen: false })

  handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    this.setState(prevState => {
      prevState[name] = value
      return prevState
    })
  }

  addAnswer(correct) {
    const answer = {
      answer: this.state.answer,
      isCorrect: correct,
    }
    this.setState({ modalOpen: true })
    this.props.addAnswer(this.props.id, answer)
  }

  addCorrectAnswer() {
    this.addAnswer(true)
  }

  addWrongAnswer() {
    this.addAnswer(false)
  }



  render() {
    // const { answerIsCorrect } = this.state

    return (
      <div>

        <h3>{this.props.question}</h3>

        <Modal
          trigger={(
            <Form.Field>
              <Button onClick={this.handleOpen}>Add Correct Answer</Button>
              <Button onClick={this.handleOpen}>Add Wrong Answer</Button>
            </Form.Field>
          )}
          open={this.state.modalOpen}
          onClose={this.handleClose}
          basic
          size='small'
        >
          <Modal.Content>
            <Box>
              <Form>
                <Form.Field>
                  <input
                    label="Correct Answer"
                    onChange={this.handleChange}
                    value={this.state.answer}
                    name="answer"
                  />
                </Form.Field>
                <Button onClick={this.addAnswer}>Add Answer</Button>
              </Form>
            </Box>
          </Modal.Content>
        </Modal>

        {this.props.answers.map(a => (
          <Answer answer={a.answer} isCorrect={a.isCorrect}/>
        ))}
      </div>
    )
  }
}
