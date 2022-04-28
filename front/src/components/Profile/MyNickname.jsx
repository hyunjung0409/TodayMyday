import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import { Select } from 'antd'
import { useSelector } from 'react-redux'

const MyNick = styled.div`
  margin-top: 10%;
`
function isLogin() {
  const token = localStorage.getItem('token')
  if (token) {
    return true
  } else {
    return false
  }
}

function MyNickName() {
  let navigate = useNavigate()
  // 비동기 처리 해야된다
  const { me } = useSelector((state) => state.user)

  // const [userId, setuserId] = useState(null)

  // const [nickname, setNickname] = useState('')
  // const getNickName = (res) => {
  //   axios
  //     .get(`http://localhost:8080/user/read/${userId}`)
  //     .then((res) => {
  //       setNickname(me.nickname)
  //     })
  //     .catch(() => {})
  // }

  // const checkLogin = () => {
  //   if (!isLogin()) {
  //     alert('로그인해주세요')
  //     navigate(`/`)
  //   } else {
  //     getNickName()
  //   }
  // }

  return <MyNick>닉네임 : {me !== null && me.nickname}</MyNick>
}
export default MyNickName
