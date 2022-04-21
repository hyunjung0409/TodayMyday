import React from 'react'
import styled from 'styled-components'

const Words = styled.div`
  width: 90%;
  height: 280px;
  background-color: grey;
  text-align: left;
  padding-left: 5%;
  padding-top: 2%;
`
const Search = styled.input`
  margin-right: 3%;
  float: right;
`
function PickWords() {
  return (
    <div>
      <Words>
        내가 선택한 단어 <Search></Search>
      </Words>
    </div>
  )
}
export default PickWords
