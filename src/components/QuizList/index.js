import React from 'react'
import QuizItem from './QuizItem'
import PropTypes from 'prop-types'

class QuizList extends React.Component {

  render() {
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
              totalQuestions={quiz.questions.length}
              isFavorite={quiz.isFavorite}
              timesPlayed={quiz.timesPlayed}
              dateCreated={quiz.dateCreated}
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
