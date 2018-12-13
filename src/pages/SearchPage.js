import React from 'react'
import { Main } from '../layouts'
import PageContainer from 'components/PageContainer'
import SearchQuiz from 'components/SearchQuiz'

const SearchPage = props => (
  <Main>
    <PageContainer>
      <SearchQuiz />
    </PageContainer>
  </Main>
)

export default SearchPage
