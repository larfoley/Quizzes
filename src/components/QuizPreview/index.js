import React from 'react'
import Button from 'components/Button'
import TagList from 'components/TagList'
import { Link } from 'react-router-dom'

const QuizPreview = props => {
  const { name, description, tags, _id } = props

  return (
    <div>
      <h1>{name}</h1>
      <TagList tags={tags}/>
      <p>{description}</p>
      <Link to={`/quiz/${_id}/start`}>
        <Button>Start</Button>
      </Link>
    </div>
  )
}

export default QuizPreview
