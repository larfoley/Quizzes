import React, { Component } from 'react'
import Box from 'components/Box'
import { Form, Input, Label, FormField } from 'components/Form'
import Button from 'components/Button'
import Auth from 'components/Auth'
import { Message } from "semantic-ui-react"
import { NotificationManager } from 'react-notifications'
import { Redirect } from 'react-router-dom'

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.auth = new Auth()
    this.state = {
      username: "",
      password: "",
      submitting: false,
      error: null,
      succesfullyLoggedin: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const username = this.state.username
    const password = this.state.password

    this.setState({submitting: true})
    this.auth.authenticateUser(username, password, (error, res) => {
      if (error) {
        this.setState({submitting: false, error})
      } else {
        this.setState({submitting: false, succesfullyLoggedin: true})
        NotificationManager.success('Logged In')
      }
    })
  }

  handleChange({ target }) {
    const name = target.name
    const value = target.value
    this.setState(prevState => {
      prevState[name] = value
      return prevState
    })
  }


  render() {
    return (

      this.state.succesfullyLoggedin? <Redirect to="/" /> :

        <Box style={{maxWidth: "600px", margin: "2em auto"}}>
          <Form onSubmit={this.handleSubmit}>
            {this.state.error?
              <Message negative>
                <Message.Header>Login Failed</Message.Header>
                <p>{this.state.error.message}</p>
              </Message>
             : null}
            <h2>Login</h2>
            <FormField>
              <Label>Username</Label>
              <Input
                name="username"
                disabled={this.submitting}
                onChange={this.handleChange}
                value={this.state.username}
                fluid
                required
              />
            </FormField>
            <FormField>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                onChange={this.handleChange}
                value={this.state.password}
                disabled={this.submitting}
                fluid
                required
              />
            </FormField>
            <Button disabled={this.submitting} type="submit">
              {this.state.submitting? "Submitting..." : "Submit"}
            </Button>
          </Form>
        </Box>
    )
  }

}
