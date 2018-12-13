import React, { Component } from 'react'
import { Form }from 'semantic-ui-react'
import QuizList from 'components/QuizList'
import SearchBar from './SearchBar'
import axios from 'axios'
import { Loader } from 'semantic-ui-react'

export default class SearchQuiz extends Component {
  constructor(props) {
    super()
    this.state = {
      searchTerm: "",
      searchResults: null,
      loading: false,
    }
  }

  onSearch(e) {
    e.preventDefault()
    if (this.state.searchTerm.length === 0) {
      return
    }
    this.setState({loading: true})
    axios.get('/api/quizzes/search/' + this.state.searchTerm)
      .then(({ data }) => {
        this.setState(
          {searchResults: data, loading: false, searchTerm: ""}
        )
      })
      .catch(err => {
        console.log(err)
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
        <Loader active={this.state.loading}>Loading</Loader>
        {
          this.state.searchResults !== null ?
          this.state.searchResults.length + " Quizzes found": null
        }
        {this.state.searchResults? <QuizList
          quizzes={this.state.searchResults}
          loading={this.state.loading}
        /> : null}
      </React.Fragment>
    )
  }
}
