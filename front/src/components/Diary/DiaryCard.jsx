import React, { useState } from 'react'
import { Card, Avatar, Space, Typography } from 'antd'
import { CommentOutlined, MessageOutlined } from '@ant-design/icons'

const { Meta } = Card
const { Text } = Typography

function DiaryCard() {
  const [comment, setComment] = useState(0)

  return (
    <Card
      hoverable
      style={{ width: 300 }}
      cover={
        <img
          alt="example"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        />
      }
      // actions={[
      //   <SettingOutlined key="setting" />,
      //   <EditOutlined key="edit" />,
      //   <EllipsisOutlined key="ellipsis" />,
      // ]}
    >
      <Space>
        <MessageOutlined style={{ fontSize: '20px', color: '#08c' }} />
        <CommentOutlined style={{ fontSize: '20px', color: '#08c' }} />
        <Text>{comment}</Text>
      </Space>
      <Meta avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} title="Nickname" />
    </Card>
  )
}

export default DiaryCard
