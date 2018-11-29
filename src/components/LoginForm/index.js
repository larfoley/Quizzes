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
      email: "",
      password: "",
      submitting: false,
      error: null,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    const email = this.state.email
    const password = this.state.password

    this.auth.authenticateUser(email, password, (err, res) => {
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
      <Box style={{maxWidth: "600px", margin: "auto"}}>
        <Form onSubmit={this.handleSubmit}>
          {this.state.error? <p>{this.state.error.message}</p> : null}
          <h2>Login</h2>
          <FormField>
            <Label>Email</Label>
            <Input
              name="email"
              disabled={this.submitting}
              onChange={this.handleChange}
              value={this.state.email}
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
