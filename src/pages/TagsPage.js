import React from 'react'
import PageContainer from 'components/PageContainer'
import Box from 'components/Box'
import Navigation from 'components/Navigation'
import PageHeader from 'components/PageHeader'
import { Icon } from 'semantic-ui-react'
import axios from 'axios'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Tag = styled(Link)`
  padding: .7em 1em;
  margin-right: 1em;
  margin-top: 2em;
  background-color: white;
  display: inline-block;
  border-radius: 5px;
  box-shadow: 0 1px 1px 0 rgba(10, 16, 34, .2);
`

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
          {this.state.tags.map(tag => (
            <Tag to={`/tags/${tag.tagName}`}><Icon name="tag" />{tag.displayName}</Tag>
          ))}
        </PageContainer>
      </div>
    )
  }
}
