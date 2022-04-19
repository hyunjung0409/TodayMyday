import React from 'react'
import MyPicture from '../components/Profile/MyPicture'
import MyNickName from '../components/Profile/MyNickname'
import MyAge from '../components/Profile/MyAge'
import MyGender from '../components/Profile/MyGender'
import PickWords from '../components/Profile/PickWords'
import Grass from '../components/Profile/Grass'

function Profile() {
  return (
    <div
      style={{
        display: 'grid',
      }}>
      <MyPicture></MyPicture>
      <MyNickName></MyNickName>
      <MyAge></MyAge>
      <MyGender></MyGender>
      <PickWords></PickWords>
      <Grass></Grass>
    </div>
  )
}
export default Profile
