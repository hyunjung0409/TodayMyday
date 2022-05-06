import React, { useState } from 'react'
import styled from 'styled-components'
import { Calendar, Select, Radio, Col, Row, Typography } from 'antd'

function onPanelChange(value, mode) {
  console.log(value, mode)
}

function Grass() {
  return (
    <StyledCalender>
      <MyCalender fullscreen={false} onPanelChange={onPanelChange} />
    </StyledCalender>
  )
}

const StyledCalender = styled.div`
  width: 300px;
  margin: 1rem auto;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
`
const MyCalender = styled(Calendar)`
  .ant-picker-calendar-date-value {
    color: yellow;
    background-color: red;
    border-radius: 15px;
  }
`

export default Grass
