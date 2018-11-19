import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Button, Icon } from 'semantic-ui-react'
// import QuizTags from 'components/QuizTags'
import Wrapper from './Wrapper'
import Title from './Title'
import Description from './Description'
// import Author from './Author'

const QuizItem = ({name, description, quizID}) => {

  return (
    <Wrapper quizID={quizID}>
      {/* <header> */}
        {/* <Author>{props.author}</Author> */}
      {/* </header> */}
      {/* <QuizTags tags={props.tags}/> */}
      {/* <Description>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae pariatur sapient
      </Description> */}
      {/* {props.description ? <p>{props.description}</p> : null} */}
    <Grid columns='equal'>
    <Grid.Column>

      <Title>{name}</Title>
      <Description>{description}</Description>
    </Grid.Column>
    {/* <Grid.Column textAlign="right">
      <Button circular icon color="blue">
        <Icon name='edit'  />
      </Button>
      <span> </span>
      <Button circular icon color="red">
        <Icon name='trash' />
      </Button>
    </Grid.Column> */}

  </Grid>

    </Wrapper>
  )
}

QuizItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
  tags: PropTypes.array
}

export default QuizItem
