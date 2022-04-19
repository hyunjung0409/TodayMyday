import React from 'react'
import styled from 'styled-components'

const MyGrass = styled.div`
  width: 50%;
  height: 300px;
  background-color: green;
`

function Grass() {
  return (
    <div>
      <MyGrass>잔디심기</MyGrass>
    </div>
  )
}
export default Grass
