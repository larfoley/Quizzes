import React from 'react'
import { Table, Button, Icon, Loader } from 'semantic-ui-react'
import styled from 'styled-components'
import axios from 'axios'
import { NotificationManager } from 'react-notifications'
import Confirm from 'components/Confirm'
import {  Link } from 'react-router-dom'

const Wrapper = styled.div`
  margin: 2em 0;
`


export default class UsersQuizzes extends React.Component {
  constructor() {
    super()
    this.state = {
      quizzes: [],
      loading: true,
    }
  }

  componentWillMount() {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const userName = user.userName
    console.log(userName);
    axios({
      url: `/api/users/${userName}`
    })
    .then(res => {
      console.log(res.data);
      this.setState({quizzes: res.data.quizzes, loading: false})
    })
    .catch(err => {
      console.log(err.response);
      this.setState({loading: false})
    })
  }

  deleteQuiz(quizId) {
    axios.delete(`/api/quizzes/${quizId}`)
      .then(res => {
        this.setState(prevState => {
          prevState.quizzes = prevState.quizzes.filter(q => q.quizId !== quizId)
          NotificationManager.success("Quiz deleted.")
          return prevState
        })
      })
      .catch(err => {
        console.log(err);
        console.log(err.response);
      })
  }

  render() {
    const quizzes = this.state.quizzes

    return (
      <Wrapper>

      {quizzes.length? (
          <Table celled padded>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Times Played</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
            {quizzes.map((quiz, index) => (
              <Table.Row key={quiz.quizId}>
                <Table.Cell singleLine >
                  {quiz.name}
                </Table.Cell>
                <Table.Cell>
                  {quiz.description? quiz.description : "No Description"}
                </Table.Cell>
                <Table.Cell >
                  {quiz.timesPlayed}
                </Table.Cell>
                <Table.Cell textAlign="center">

                  <Button icon color="green" as="a" href={`/quiz/${quiz.quizId}/start`}>
                    <Icon name='eye' />
                  </Button>

                  <Button icon primary as="a" href={`/quiz/${quiz.quizId}/edit`}>
                    <Icon name='edit'/>
                  </Button>

                  <Confirm
                    message="Are you sure you want to delte this quiz?"
                    onConfirm={() => {
                      this.deleteQuiz(quiz.quizId)
                    }}
                    trigger={(
                      <Button icon color="red">
                        <Icon name='trash' />
                      </Button>
                    )}
                  />

                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
    ) : ( this.state.loading ? <Loader active/> : (

      <div style={{textAlign: "center"}}>
        <p>You haven't created any Quizzes yet</p>
        <Button primary >
          <Link to="/create-quiz" style={{color: "white", padding: "1em"}}>Create One</Link>
        </Button>
      </div>
    )
    ) }
  </Wrapper>
    )
  }
}
