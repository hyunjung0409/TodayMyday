import React from 'react'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'

const MyPic = styled.div`
  margin-left: auto;
  margin-right: auto;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: solid;
`

function MyPicture() {
  return (
    <div>
      <MyPic></MyPic> <EditOutlined></EditOutlined>
    </div>
  )
}
export default MyPicture
