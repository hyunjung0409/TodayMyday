import React, { useEffect, useState } from 'react'
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
import { loadUserRequestAction } from '../reducers/user'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'

const imageUploader = new ImageUploader()

function Profile() {
  const dispatch = useDispatch()
  const [data, setData] = useState({
    fileURL: '/images/기본이미지.jpg',
  })

  useEffect(() => {
    if (localStorage.getItem('jwtToken') != null) {
      const decode_token = jwt_decode(localStorage.getItem('jwtToken'))
      const userId = decode_token.sub
      dispatch(loadUserRequestAction({ userId }))
    }
  }, [])
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
