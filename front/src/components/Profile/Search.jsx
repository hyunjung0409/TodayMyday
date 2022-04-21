import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

const Search = styled(Button)`
  margin-top: 5%;
`
function SearchAll() {
  return (
    <div>
      <Search>내 글목록 보기</Search>
    </div>
  )
}
export default SearchAll
