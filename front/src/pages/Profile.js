import React from 'react'
import MyPicture from '../components/Profile/MyPicture'
import MyNickName from '../components/Profile/MyNickname'
import MyAge from '../components/Profile/MyAge'
import MyGender from '../components/Profile/MyGender'
import PickWords from '../components/Profile/PickWords'
import Grass from '../components/Profile/Grass'
import Change from '../components/Profile/Change'
import Search from '../components/Profile/Search'
import { Col, Row } from 'antd'

function Profile() {
  return (
    <div>
      <Row>
        <Col span={12}>
          <MyPicture></MyPicture>
          <MyNickName></MyNickName>
          <MyAge></MyAge>
          <MyGender></MyGender>
          <Change></Change>
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
