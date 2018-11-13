import React, { Component } from 'react'
import { Form, Input }from 'semantic-ui-react'
import QuizList from 'components/QuizList'
import SearchBar from './SearchBar'

const quizzes = [
  {
    id: 1,
    name: "Java",
    author: "John Doe",
    description: "",
    tags: ["Java", "Programing", "Computer Science"]
  },
  {
    id: 2,
    name: "Java",
    author: "John Doe",
    description: "",
    tags: ["Java", "Programing", "Computer Science"]
  },
  {
    id: 3,
    name: "Java",
    author: "John Doe",
    description: "",
    tags: ["Java", "Programing", "Computer Science"]
  }
]

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
    setTimeout(() => {
      this.setState({searchResults: quizzes, loading: false })
    }, 1000)
  }

  handleChange(e) {
    this.setState({searchTerm: e.target.value})
  }

  render() {
    const quizzes = this.state.searchResults.map(quiz => <h1>Quiz</h1>)

    return (
      <React.Fragment>
        <Form onSubmit={this.onSearch.bind(this) }>
          <SearchBar
            value={this.state.searchTerm}
            onChange={this.handleChange.bind(this)}
          />
        </Form>
        <QuizList
          quizzes={this.state.searchResults}
          loading={this.state.loading}
        />
      </React.Fragment>
    )
  }
}
