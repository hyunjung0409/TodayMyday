import React, { useEffect, useState } from 'react'
import { Card, Avatar, Space, Typography, Image } from 'antd'
import styled from 'styled-components'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import moment from 'moment'

const { Meta } = Card
const { Text } = Typography

function DiaryCard({ card }) {
  const { me } = useSelector((state) => state.user)

  const navigate = useNavigate()

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
      {/* <Space>
        <MessageOutlined style={{ fontSize: '1rem', color: '#08c' }} />
        <CommentOutlined style={{ fontSize: '1rem', color: '#08c' }} />
        <Text>내용: {card.content}</Text>
      </Space> */}

      {/* <Meta
        avatar={<Avatar src={card.profile_image} />}
        title={card.nickname}
        description={moment(card.createdat).format('YYYY-MM-DD HH:mm:ss')}
      /> */}

      <Space direction="vertical" size="middle" style={{ display: 'flex', alignItems: 'start' }}>
        <Space>
          <Avatar src={card.profile_image} />
          <StyledText>{card.nickname}</StyledText>
        </Space>
        <StyledText>#{card.word}</StyledText>
        <StyledText>{card.content}</StyledText>
      </Space>
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
const StyledUserArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`
const StyledCard = styled(Card)`
  width: 15vw;
  height: 50vh;
`

const StyledText = styled(Text)`
  font-size: small;
`

export default DiaryCard
