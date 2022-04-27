import React, { useEffect, useState } from 'react'
import { Card, Avatar, Space, Typography, Image } from 'antd'
import styled from 'styled-components'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card
const { Text } = Typography

function DiaryCard({ card, me }) {
  // const [dno, setDno] = useState('')
  const [date, setDate] = useState('')

  const navigate = useNavigate()

  const onClick = async () => {
    console.log('click: ', card.dno)
    navigate(`/diary/read/${card.dno}`)
  }

  // useEffect(() => {
  //   setDate(card.createdat)
  // }, [card.createdat])

  return (
    <Card
      className="card"
      hoverable
      style={{ width: '15vw', height: '50vh', border: '3px solid blue' }}
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

      <Meta avatar={<Avatar src={me.image} />} title={card.nickname} description={card.createdat} />
    </Card>
  )
}

const StyledImageArea = styled.div`
  width: 14vw;
  height: 25vh;
  overflow: hidden;
  // border: 1px solid red;
`

const StyledImage = styled.img`
  width: 14vw;
  // height: 100%;
  object-fit: cover;
`
const StyledUserArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
`
const StyledText = styled(Text)`
  font-size: x-small;
  margin: 1em 0;
`

export default DiaryCard
