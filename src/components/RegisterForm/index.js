import React, { Component } from 'react'
import Box from 'components/Box'
import { Form, Input, Label, FormField } from 'components/Form'
import Button from 'components/Button'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: "",
      password: "",
      submitting: false,
      error: null,
      succesfullyRegistered: false
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({submitting: true})
    const { email, password } = this.state
    axios.post('/api/users/register', { email, password })
      .then(res => {
        this.setState({succesfullyRegistered: true})
      })
      .catch(err => {
        this.setState({error: err})
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
        {this.state.succesfullyRegistered? (
          <div style={{textAlign: "center"}}>
            <h2>Thanks For Registering</h2>
            <p><Link to="/login">Click here</Link> to login</p>
          </div>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            {this.state.error? <p>{this.state.error.message}</p> : null}
            <h2>Register</h2>
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
        )}

      </Box>
    )
  }
}
