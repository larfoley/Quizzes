import React, { Component } from 'react'
import { Form }from 'semantic-ui-react'
// import QuizList from 'components/QuizList'
import SearchBar from './SearchBar'
import quizzes from 'mock-quizzes.js'


export default class SearchQuiz extends Component {
  constructor(props) {
    super()
    this.state = {
      searchTerm: "",
      searchResults: [],
      loading: false
    }

    console.log(this.state);

  }

  onSearch(e) {
    e.preventDefault()
    this.setState({loading: true})
    setTimeout(() => {
      this.setState({searchResults: quizzes, loading: false })
    }, 1000)
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
        {/* <QuizList
          quizzes={this.state.searchResults}
          loading={this.state.loading}
        /> */}
      </React.Fragment>
    )
  }
}
