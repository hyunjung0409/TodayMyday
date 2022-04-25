import React, { useState } from 'react'
import { Card, Avatar, Space, Typography } from 'antd'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Meta } = Card
const { Text } = Typography

function DiaryCard({ card }) {
  const [dno, setDno] = useState('')
  const navigate = useNavigate()

  const onClick = async () => {
    console.log('click: ', card.dno)
    await setDno(card.dno)
    console.log(dno)
    navigate(`/diary/read/${dno}`)
  }

  return (
    <Card
      className="card"
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src={card.image}
          // src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      onClick={onClick}
      // actions={[
      //   <SettingOutlined key="setting" />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
      // ]}
    >
      <Space>
        <MessageOutlined style={{ fontSize: '20px', color: '#08c' }} />
        <CommentOutlined style={{ fontSize: '20px', color: '#08c' }} />
        <Text>내용: {card.content}</Text>
        {/* <Text>내용: {card.dno}</Text> */}
      </Space>
      <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} title={card.user_id} />
      <Text>
        사용자 예시
        <br />
        {card.createdat}
      </Text>
    </Card>
  )
}

export default DiaryCard
