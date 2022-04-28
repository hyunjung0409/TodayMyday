import React from 'react'
import styled from 'styled-components'
import MyWord from '../MyWord'

const Words = styled.div`
  width: 90%;
  height: 280px;
  background-color: rgb(238, 167, 187);
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
        <div style={{ marginBottom: '20px' }}>
          내가 선택한 단어 <Search></Search>
        </div>
        <MyWord />
      </Words>
    </div>
  )
}
export default PickWords
