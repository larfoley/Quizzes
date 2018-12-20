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
      let errorMessage

      if (error) {
        if (error.status === 400) {
          errorMessage = "Username or Password is invalid."
        } else {
          errorMessage = "Internal Server Error. Try again later."
        }
        this.setState({submitting: false, error: errorMessage})
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
                <p>{this.state.error}</p>
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
