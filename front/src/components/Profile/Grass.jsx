import React, { useState } from 'react'
import styled from 'styled-components'
import { CaretLeftOutlined, CaretRightOutlined } from '@ant-design/icons'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
const MyGrass = styled.div`
  margin-top: 6%;
  width: 90%;
  height: 280px;
  background-color: rgb(238, 167, 187);
  text-align: left;
  padding-left: 5%;
  padding-top: 2%;
`
const Calen = styled.div`
  margin-left: 25%;
`
const Month = styled.p`
  float: right;
  padding-right: 48%;
`
const MyRecord = styled.div`
  border: solid;
  width: 15px;
  height: 15px;
  margin-left: 5px;
  margin-top: 5px;
  border-color: green;
`
function Grass() {
  const [value, onChange] = useState(new Date())
  let [days, setDays] = useState([])

  return (
    <div>
      <MyGrass>
        잔디심기
        <Month>
          <CaretLeftOutlined /> 4월 <CaretRightOutlined />
        </Month>
        {/* <Calen>
          <Calendar onChange={onChange} value={value} />
        </Calen> */}
        {days.map((a, i) => {
          return <MyRecord key={i}></MyRecord>
        })}
      </MyGrass>
    </div>
  )
}
export default Grass
