import React, { useState } from 'react'
import { Row, Col, Button, Space } from 'antd'
import styled from 'styled-components'

function DiaryFooter(params) {
  const [size, setSize] = useState(8)

  return (
    <Row>
      <Col span={24}>
        <StyledContainer>
          <Space size={size}>
            <Button type="primary">수정</Button>
            <Button type="danger">삭제</Button>
          </Space>
        </StyledContainer>
      </Col>
    </Row>
  )
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`

export default DiaryFooter
