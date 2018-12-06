import React, { Component } from 'react'
import Box from 'components/Box'
import { Form, Input, Label, FormField } from 'components/Form'
import Button from 'components/Button'
import Auth from 'components/Auth'

export default class LoginForm extends Component {

  constructor(props) {
    super(props)
    this.auth = new Auth()
    this.state = {
      username: "",
      password: "",
      submitting: false,
      error: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const username = this.state.username
    const password = this.state.password

    this.auth.authenticateUser(username, password, (err, res) => {
      if (err) { return alert(err) }
      alert("Logged In")
      console.log(res);
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
      <Box style={{maxWidth: "600px", margin: "2em auto"}}>
        <Form onSubmit={this.handleSubmit}>
          {this.state.error? <p>{this.state.error.message}</p> : null}
          <h2>Login</h2>
          <FormField>
            <Label>Username</Label>
            <Input
              name="username"
              disabled={this.submitting}
              onChange={this.handleChange}
              value={this.state.username}
              fluid
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
            />
          </FormField>
          <Button disabled={this.submitting}>Submit</Button>
        </Form>


      </Box>
    )
  }
}
