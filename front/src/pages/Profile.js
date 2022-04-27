import React, { useState } from 'react'
import MyPicture from '../components/Profile/MyPicture'
import MyNickName from '../components/Profile/MyNickname'
import MyAge from '../components/Profile/MyAge'
import MyGender from '../components/Profile/MyGender'
import PickWords from '../components/Profile/PickWords'
import Grass from '../components/Profile/Grass'
import Change from '../components/Profile/Change'
import Search from '../components/Profile/Search'
import { Col, Row } from 'antd'
import ImageUploader from '../service/image_uploader'

const imageUploader = new ImageUploader()

function Profile() {
  const [data, setData] = useState({
    fileURL: '/images/기본이미지.jpg',
  })
  return (
    <div>
      <Row>
        <Col span={12}>
          <MyPicture imageUploader={imageUploader} data={data}></MyPicture>
          <MyNickName></MyNickName>
          <MyAge></MyAge>
          <MyGender></MyGender>
          {/* <Change></Change> */}
          <Search></Search>
        </Col>
        <Col span={12}>
          <PickWords></PickWords>
          <Grass></Grass>
        </Col>
      </Row>
    </div>
  )
}
export default Profile
