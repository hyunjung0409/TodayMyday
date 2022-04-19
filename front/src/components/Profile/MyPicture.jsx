import React from 'react'
import styled from 'styled-components'

const MyPic = styled.div`
  margin-left: 5%;
  margin-top: 5%;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: solid;
  display: 'flex';
`

function MyPicture() {
  return (
    <div>
      <MyPic></MyPic>
    </div>
  )
}
export default MyPicture
