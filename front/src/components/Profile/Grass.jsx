import React, { useState } from 'react'
import styled from 'styled-components'
import { Calendar, Select, Radio, Col, Row, Typography } from 'antd'

function onPanelChange(value, mode) {
  console.log(value, mode)
}

function Grass() {
  return (
    <StyledCalender>
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </StyledCalender>
  )
}

const StyledCalender = styled.div`
  width: 300px;
  border: 1px solid #f0f0f0;
  border-radius: 2px;
`

export default Grass
