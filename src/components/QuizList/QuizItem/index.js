import React from 'react'
import PropTypes from 'prop-types'
import TagList from 'components/TagList'
import Wrapper from './Wrapper'
import Title from './Title'
import ButtonLink from 'components/ButtonLink'
import Author from './Author'
import { Icon } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import { withRouter } from 'react-router-dom'
import Auth from 'components/Auth'
import MetaData from './MetaData'
import { Grid } from 'semantic-ui-react'

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
        color={isFavorite ? "red" : "blue"}
        link
        name="heart"
        title={!isFavorite? "Save Quiz" : "Remove from favorites"}
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
      const userId = JSON.parse(window.localStorage.getItem('user')).userId
      console.log(userId);
      axios({
        method: "POST",
        url: `api/quizzes/${this.props.quizId}/favorite/${userId}`,
        headers: {
          'Authorization': auth.getAccessToken()
        },
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
    const { name, quizId, tags, author, totalQuestions, timesPlayed, dateCreated } = this.props

    return (
      <Wrapper>
        <Header>
          <Title quizId={quizId} title={name}/>
          <MetaData>
            <Author to={`/user/${author}`}>{author}</Author>
            <i>, {new Date(dateCreated).toLocaleDateString()} | Questions {totalQuestions}</i>
            <TagList tags={tags}/>
          </MetaData>
        </Header>
        <Footer>
          <Grid>
            <Grid.Row columns="equal">
              <Grid.Column >
                <ButtonLink to={`/quiz/${quizId}`}>View</ButtonLink>
              </Grid.Column>
              <Grid.Column textAlign="right">
                <FavoriteButton
                  isFavorite={this.state.isFavorite}
                  onClick={this.updateFavorite.bind(this)}
                />
                {" "}
                <Icon
                  title="Times quiz has Been played"
                  circular inverted color="orange" link name="fire"/>
                  {timesPlayed}
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
