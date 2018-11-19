import React, { Component } from 'react'
import Box from 'components/Box'
import { Form, Input, Label, FormField } from 'components/Form'
import Button from 'components/Button'

export default class LoginForm extends Component {

  render() {
    return (
      <Box style={{maxWidth: "600px", margin: "auto"}}>
        <Form>
          <h2>Login</h2>
          <FormField>
            <Label>Email</Label>
            <Input fluid/>
          </FormField>
          <FormField>
            <Label>Password</Label>
            <Input fluid/>
          </FormField>
          <Button>Submit</Button>
        </Form>
      </Box>
    )
  }
}
