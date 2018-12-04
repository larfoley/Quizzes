import React from 'react'
import styled from 'styled-components'
import Button from 'components/Button'

const Wrapper = styled.div`
  text-align: center;
  background-color: white;
  max-width: 600px;
  margin: 2em auto;
  padding: 3em;
`

const QuizResults = ({ results, playAgain }) => {
  const totalCorrectAnswers = results.filter(res => res.correct).length
  const totalQuestions = results.length

  return (
    <Wrapper>
      <h1>Quiz Over!</h1>
      <p>You got {totalCorrectAnswers} out of {totalQuestions} Questions right</p>
      <Button onClick={playAgain}>Play Again</Button>
    </Wrapper>
  )
}


export default QuizResults
