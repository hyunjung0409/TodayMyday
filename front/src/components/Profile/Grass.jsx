import React from 'react'
import styled from 'styled-components'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'

const MyGrass = styled.div`
  margin-top: 6%;
  width: 90%;
  height: 280px;
  background-color: rgb(238, 167, 187);
  text-align: left;
  padding-left: 5%;
  padding-top: 2%;
`
const Month = styled.p`
  float: right;
  padding-right: 48%;
`
function Grass() {
  return (
    <div>
      <MyGrass>
        잔디심기
        <Month>
          <CaretLeftOutlined /> 4월 <CaretRightOutlined />
        </Month>
      </MyGrass>
    </div>
  )
}
export default Grass
