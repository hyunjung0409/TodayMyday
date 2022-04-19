import React, { useState } from 'react'
import { Row, Col, Typography } from 'antd'
import styled from 'styled-components'

const { Title } = Typography

function DiaryContent(params) {
  const [content, setContent] = useState(
    '가까이 있어서 소중한 것,\n그러나 너무나 평범한 일상 속에 있어서\n소중함을 잘 모르는 것.',
  )
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
