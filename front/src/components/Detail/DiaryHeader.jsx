import React, { useState } from 'react'
import { Row, Col, Typography, Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Title } = Typography

function DiaryHeader(params) {
  const [word, setWord] = useState('단어예시')
  const [user, setUser] = useState('작성자')
  const [date, setDate] = useState('2022-04-19 오전 11:13')

  return (
    <Row>
      <Col span={12}>
        <StyledWordTitle level={3}>#{word}</StyledWordTitle>
      </Col>
      <Col span={12}>
        <StyledUserArea>
          <Avatar icon={<UserOutlined />} />
          <Avatar src={<Image src="https://joeschmoe.io/api/v1/random" style={{ width: 32 }} />} />
          <Title level={5}>{user}</Title>
        </StyledUserArea>
        <StyledDateTitle level={5}>{date}</StyledDateTitle>
      </Col>
    </Row>
  )
}

const StyledWordTitle = styled(Title)`
  display: flex;
  justify-content: start;
  align-items: center;
  // margin: 1.2em 1em 1em 1em;
  padding: 0.4em 0.2em 0.2em 0.2em;
`

const StyledUserArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`

const StyledDateTitle = styled(Title)`
  display: flex;
  justify-content: end;
  align-items: center;
`

export default DiaryHeader
