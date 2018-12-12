import React from 'react'
import PropTypes from 'prop-types'
import TagList from 'components/TagList'
import Wrapper from './Wrapper'
import Title from './Title'
import Author from './Author'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { withRouter } from 'react-router-dom'
import Auth from 'components/Auth'

const auth = new Auth()

const Header = styled.div`
  padding: 2em;
`

const Footer = styled.div`
  padding: 1em 2em;
  background-color: #f5f5f5;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background-color: #343a40;
  color: white
`

const FavoriteButton = withRouter(({history, onClick, isFavorite}) => {
  return (
      <Icon
        history={history}
        onClick={() => {
          onClick(history)
        }}
        circular
        inverted
        color={isFavorite ? "red" : null}
        link
        name="heart"
      />
  )
})


class QuizItem extends React.Component {

  constructor(props) {
    super(props)
      this.state = {
        isFavorite: props.isFavorite
      }
  }

  updateFavorite(history) {

    if (!auth.isAuthenticated()) {
      history.push('/login')
    } else {
      axios({
        method: "POST",
        url: `api/quizzes/${this.props.quizId}/favorite`,
        headers: {
          'Authorization': auth.getAccessToken()
        }
      })
      .then(res => {
        const { isFavorite } = this.state
        this.setState({isFavorite: !isFavorite}, () => {
          NotificationManager.success("Favorites Updated")
        })
      })
      .catch(err => {
        console.log(err.response);
      })
    }

  }

  render() {
    const { name, quizId, tags, author } = this.props

    return (
      <Wrapper>
        <Header>
          <Title quizId={quizId} title={name}/>
          <Author>{author} , Dec 18 | Questions 10</Author>
          <TagList tags={tags}/>
        </Header>
        <Footer>
          {
            <FavoriteButton
              isFavorite={this.state.isFavorite}
              onClick={this.updateFavorite.bind(this)}
            />
          }
            10 {" "}
          { " " } <Icon circular inverted color="orange" link name="fire"/> 341 { " "}
          {/* <Button>Play</Button> */}
        </Footer>
      </Wrapper>
    )
  }
}

QuizItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.array
}

export default QuizItem
