import React, { Component } from 'react'
import Box from 'components/Box'
import { Form, Input, Label, FormField } from 'components/Form'
import Button from 'components/Button'
import { Link } from 'react-router-dom'
import Auth from 'components/Auth'
import { Message } from 'semantic-ui-react'

const auth = new Auth()

export default class RegisterForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      submitting: false,
      errors: [],
      succesfullyRegistered: false
    }

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()
    this.setState({submitting: true, errors: []})
    const { userName, email, password, confirmPassword } = this.state

    auth.registerUser({ userName, email, password, confirmPassword }, error => {
      if (error) {
        const modelState = error.response.data.modelState
        const errors = []

        if (modelState) {
          Object
            .keys(modelState)
            .forEach(key => modelState[key].forEach(err => errors.push(err)) )
        }

        if (errors.length === 0) {
          errors.push("Internal Server Error")
        }

        this.setState({ errors, submitting: false })
      } else {
        this.setState({succesfullyRegistered: true, submitting: false})
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
      <Box style={{maxWidth: "600px", margin: "2em auto"}}>
        {this.state.succesfullyRegistered? (
          <div style={{textAlign: "center"}}>
            <h2>Thanks For Registering</h2>
            <p><Link to="/login">Click here</Link> to login</p>
          </div>
        ) : (
          <Form onSubmit={this.handleSubmit}>
            {this.state.errors.map((error, key) => (
              <Message key={key} negative>
                <p>{error}</p>
              </Message>
            ))}
            <h2>Register</h2>
            <FormField>
              <Label>Email</Label>
              <Input
                name="email"
                disabled={this.submitting}
                onChange={this.handleChange}
                value={this.state.email}
                fluid
                required
              />
            </FormField>
            <FormField>
              <Label>User Name</Label>
              <Input
                name="userName"
                disabled={this.submitting}
                onChange={this.handleChange}
                value={this.state.userName}
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
            <FormField>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirmPassword"
                onChange={this.handleChange}
                value={this.state.confirmPassword}
                disabled={this.submitting}
                fluid
                required
              />
            </FormField>
            <Button fluid size="huge" disabled={this.state.submitting}>
              {this.state.submitting? "Submitting..." : "Register"}
            </Button>
          </Form>
        )}

      </Box>
    )
  }
}
