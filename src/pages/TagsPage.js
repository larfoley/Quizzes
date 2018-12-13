import React from 'react'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import TagList from 'components/TagList'
import Navigation from 'components/Navigation'
import PageHeader from 'components/PageHeader'
import { Icon } from 'semantic-ui-react'

import axios from 'axios'

export default class TagsPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {tags: []}
  }

  componentWillMount() {
    axios.get("/api/tags/")
      .then(res => res.data.reduce((tags, tag) => {
        if (!tags.find((item) => item.tagName === tag.tagName)) {
    		  tags.push(tag)
    	  }
	      return tags
        }, [])
      )
      .then(tags => this.setState({ tags }))
      .catch(err => console.log)
  }

  render() {


    return (
      <div>
        <Navigation userIsAuthenticated={this.props.user}/>
        <PageHeader>
          <h1><Icon name="tag"/>Tags</h1>
        </PageHeader>
        <PageContainer>
          <Box>
            <TagList tags={this.state.tags} />
          </Box>
        </PageContainer>
      </div>
    )
  }
}
