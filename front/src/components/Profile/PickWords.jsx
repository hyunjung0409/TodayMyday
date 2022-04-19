import React from 'react'
import styled from 'styled-components'

const Words = styled.div`
  width: 50%;
  height: 300px;
  background-color: grey;
`

function PickWords() {
  return (
    <div>
      <Words>단어들</Words>
    </div>
  )
}
export default PickWords
