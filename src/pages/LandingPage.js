import React, { Component } from 'react'
import {
  Button,
  Container,
  Header,
  Icon,
  Menu,
  Segment,

} from 'semantic-ui-react'

class DesktopContainer extends Component {
  state = {}

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  render() {
    const { fixed } = this.state
    const mobile = false

    return (
      <Segment
        inverted
        textAlign='center'
        style={{ minHeight: 700, padding: '1em 0em' }}
        vertical
      >
        <Menu
          fixed={fixed ? 'top' : null}
          inverted={!fixed}
          pointing={!fixed}
          secondary={!fixed}
          size='large'
        >
          <Container>
            <Menu.Item position='right'>
              <Button as='a' inverted={!fixed}>
                Log in
              </Button>
              <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>
                Sign Up
              </Button>
            </Menu.Item>
          </Container>
        </Menu>
        <Container text>
          <Header
            as='h1'
            content='Imagine-a-Company'
            inverted
            style={{
              fontSize: mobile ? '2em' : '4em',
              fontWeight: 'normal',
              marginBottom: 0,
              marginTop: mobile ? '1.5em' : '3em',
            }}
          />
          <Header
            as='h2'
            content='Do whatever you want when you want to.'
            inverted
            style={{
              fontSize: mobile ? '1.5em' : '1.7em',
              fontWeight: 'normal',
              marginTop: mobile ? '0.5em' : '1.5em',
            }}
          />
          <Button primary size='huge'>
            Sign Up
            <Icon name='right arrow' />
          </Button>
          <Button basic size='huge' color="primary">
            Login
            <Icon name='right arrow' />
          </Button>
        </Container>
      </Segment>
    )
  }
}


const LandingPage = ({ children }) => (
  <div>
    <DesktopContainer>{children}</DesktopContainer>
  </div>
)
export default LandingPage
