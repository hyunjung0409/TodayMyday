import React, { useState } from 'react'
import { Row, Col, Typography, Avatar, Image } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const { Title, Text } = Typography

function DiaryHeader({ diary, me }) {
  const [word, setWord] = useState('')
  const [user, setUser] = useState('')
  const [date, setDate] = useState('')

  return (
    <Row>
      <Col span={12}>
        <StyledWordTitle level={3}>#{diary.word}</StyledWordTitle>
      </Col>
      <Col span={12}>
        <StyledUserArea>
          {me.image === null ? (
            <Avatar icon={<UserOutlined />} />
          ) : (
            <Avatar src={<Image src={me.image} style={{ width: 32 }} />} />
          )}
          <Title level={5}>{me.nickname}</Title>
        </StyledUserArea>
        <StyledDateText level={5}>{diary.createdat}</StyledDateText>
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

const StyledDateText = styled(Text)`
  display: flex;
  justify-content: end;
  align-items: center;
`

export default DiaryHeader
