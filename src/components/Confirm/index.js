import React from 'react'
import { Modal, Button, Icon } from 'semantic-ui-react'


class Confirm extends React.Component {
  constructor(props) {
    super(props)
    const { message, onConfirm, trigger } = props
    this.state = { open: false, message, onConfirm, trigger }
    this.toggleModal = this.toggleModal.bind(this)
  }

  toggleModal() {
    this.setState({open: !this.state.open})
  }

  render() {
    const { message, onConfirm, trigger, open } = this.state
    return (
      <Modal trigger={trigger} open={open} onOpen={this.toggleModal} size='small'>
        <Modal.Content>
          <h3>
            { message }
          </h3>
        </Modal.Content>
        <Modal.Actions>
          <Button color='red' inverted onClick={() => {
            this.toggleModal()
          }}>
            <Icon name='remove' /> No
          </Button>
          <Button color='green' inverted onClick={() => {
            onConfirm()
            this.toggleModal()
          }}>
            <Icon name='checkmark' /> Yes
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default Confirm
