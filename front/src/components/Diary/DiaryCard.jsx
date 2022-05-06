import React, { useEffect, useState } from 'react'
import { Card, Avatar, Space, Typography, Row, Col } from 'antd'
import styled from 'styled-components'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

const { Meta } = Card
const { Text } = Typography

function DiaryCard({ card }) {
  const navigate = useNavigate()
  const length = 123

  const onClick = async () => {
    console.log('click: ', card.dno)
    navigate(`/diary/read/${card.dno}`)
  }

  return (
    <StyledCard
      className="card"
      hoverable
      cover={
        <StyledImageArea>
          <StyledImage src={card.image} />
        </StyledImageArea>
      }
      onClick={onClick}>
      <Meta
        avatar={<Avatar src={card.profile_image} />}
        title={card.nickname}
        // description={moment(card.createdat).format('YYYY-MM-DD')}
      />
      {/* <Row justify="space-evenly" align="middle">
        <Col span={24}>
          <Space size="small">
            <Avatar src={card.profile_image} />
            <Space direction="vertical" size={1}>
              <StyledText>{card.nickname}</StyledText>
              <StyledText>{moment(card.createdat).format('YYYY-MM-DD')}</StyledText>
            </Space>
          </Space>
        </Col>
      </Row> */}

      {/* <StyledText>#{card.word}</StyledText> */}
      <div style={{ marginTop: '1rem' }}>
        <StyledText>
          {card.content}
          {/* {card.content.length > length ? card.content.substr(0, length - 2) + '...' : card.content} */}
        </StyledText>
      </div>
    </StyledCard>
  )
}

const StyledImageArea = styled.div`
  height: 25vh;
  overflow: hidden;
  // border: 1px solid red;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledCard = styled(Card)`
  width: 15vw;
  height: 50vh;
`

const StyledText = styled(Text)`
  font-size: small;
`

export default DiaryCard
