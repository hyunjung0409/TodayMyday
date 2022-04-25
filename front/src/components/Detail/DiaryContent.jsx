import React, { useState } from 'react'
import { Row, Col, Typography } from 'antd'
import styled from 'styled-components'

const { Title } = Typography

function DiaryContent({ me }) {
  const [content, setContent] = useState('')

  // setContent(me.dairies[])
  return (
    <Row>
      <Col span={24}>
        <StyledContainer>
          <Title level={5}>{content}</Title>
        </StyledContainer>
      </Col>
    </Row>
  )
}

const StyledContainer = styled.div`
  min-height: 20vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`

export default DiaryContent
