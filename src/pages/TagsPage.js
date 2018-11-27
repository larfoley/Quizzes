import React from 'react'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import TagList from 'components/TagList'
import Navigation from 'components/Navigation'
import axios from 'axios'

export default class TagsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tags: []}
  }

  componentWillMount() {
    axios.get("/api/tags/")
      .then(res => this.setState({tags: res.data}))
      .catch(err => console.log)
  }

  render() {
    const tags = [
      "computer science",
      "programming",
      "databases",
      "JavaScript",
      "Node",
      "Functional Programming",
      "OOP"
    ]

    return (
      <div>
        <Navigation userIsAuthenticated={this.props.user}/>
        <PageContainer>
          <Box>
            <TagList tags={tags} />
          </Box>
        </PageContainer>
      </div>
    )
  }
}
