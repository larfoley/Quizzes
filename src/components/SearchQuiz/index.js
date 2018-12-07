import React, { Component } from 'react'
import { Form }from 'semantic-ui-react'
import QuizList from 'components/QuizList'
import SearchBar from './SearchBar'
import quizzes from 'mock-quizzes.js'
import axios from 'axios'


export default class SearchQuiz extends Component {
  constructor(props) {
    super()
    this.state = {
      searchTerm: "",
      searchResults: [],
      loading: false
    }
  }

  onSearch(e) {
    e.preventDefault()
    this.setState({loading: true})
    axios.get('/api/quizzes/' + this.state.searchTerm)
      .then(res => {
        const quizzes = res.data
        console.log(quizzes);
        this.setState({searchResults: quizzes, loading: false, searchTerm: "" })
        return res
      })
      .catch(err => {
        console.log(err)
      })
      .then(res => {
        console.log("res", res);
        this.setState({searchTerm: "", searchResults: [] })
      })

  }

  handleChange(e) {
    this.setState({searchTerm: e.target.value})
  }

  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.onSearch.bind(this) }>
          <SearchBar
            value={this.state.searchTerm}
            onChange={this.handleChange.bind(this)}
          />
        </Form>
        {this.state.searchResults? <QuizList
          quizzes={this.state.searchResults}
          loading={this.state.loading}
        /> : null}
      </React.Fragment>
    )
  }
}
