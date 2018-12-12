import React from 'react'
import QuizItem from './QuizItem'
import PropTypes from 'prop-types'

class QuizList extends React.Component {

  render() {
    console.log(this.props.quizzes);
    return (
      <div>
        <div>
          {this.props.quizzes.map((quiz, i) => (
            <QuizItem
              key={i}
              quizId={quiz.quizId}
              name={quiz.name}
              description={quiz.description}
              author={quiz.userName}
              tags={quiz.tags}
              questions={quiz.questions}
            />
          ))}
        </div>
      </div>
    )
  }
}

QuizList.propTypes = {
  quizzes: PropTypes.array
}

export default QuizList
