import React, { useState } from 'react';
import { Card, Avatar } from 'antd';

const { Meta } = Card;

function DiaryCard() {
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
      <Meta
        avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
        title="Nickname"
      // description="This is the description"
      />
    </Card>
  )
}

export default DiaryCard;