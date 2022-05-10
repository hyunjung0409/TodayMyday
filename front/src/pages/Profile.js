import React, { useEffect, useState } from 'react'
import MyPicture from '../components/Profile/MyPicture'
import MyNickName from '../components/Profile/MyNickname'
import MyAge from '../components/Profile/MyAge'
import MyGender from '../components/Profile/MyGender'
import PickWords from '../components/Profile/PickWords'
import Grass from '../components/Profile/Grass'
import Search from '../components/Profile/Search'
import { Col, Row } from 'antd'
import ImageUploader from '../service/image_uploader'
import { loadUserRequestAction } from '../reducers/user'
import jwt_decode from 'jwt-decode'
import { useDispatch, useSelector } from 'react-redux'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const imageUploader = new ImageUploader()

const Place = styled.div`
  border: 1px solid #d3d3d3;
  border-radius: 1%;
  padding: 5%;
  padding-right: 10%;
`

function Profile() {
  const { me } = useSelector((state) => state.user)
  console.log(me)
  const dispatch = useDispatch()
  // const [data, setData] = useState({
  //   fileURL: '/images/기본이미지.jpg',
  // })

  return (
    <div>
      <Row>
        <Col span={12}>
          {me !== null && (
            <MyPicture imageUploader={imageUploader} data={me !== null && me.image}></MyPicture>
          )}{' '}
          <MyNickName></MyNickName>
          <MyAge></MyAge>
          <MyGender></MyGender>
          {/* <Change></Change> */}
          <Search></Search>
        </Col>
        <Col span={12}>
          <Place>
            <PickWords></PickWords>
            <Grass></Grass>
          </Place>
        </Col>
      </Row>
    </div>
  )
}
export default Profile
