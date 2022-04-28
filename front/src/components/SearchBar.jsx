import React, { useEffect } from 'react'
import { Input } from 'antd'
import { getAxios } from '../api'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { loadUserRequestAction } from '../reducers/user'

const { Search } = Input
const axios = getAxios()

const SearchBar = ({ keyword, setKeyword, diaryList, setDiaryList, me }) => {
  const dispatch = useDispatch()

  const onSearch = async (value) => {
    await setKeyword(value)
    let result = await axios.get('diary/searchcontent', {
      params: { keyword: value, userId: me.userId },
    })
    console.log('result: ', result)
    await setDiaryList([...result.data])
  }

  useEffect(() => {
    if (localStorage.getItem('jwtToken') != null) {
      const decode_token = jwt_decode(localStorage.getItem('jwtToken'))
      const userId = decode_token.sub
      dispatch(loadUserRequestAction({ userId }))
    }
  }, [])

  return <Search placeholder="input search text" onSearch={onSearch} enterButton />
}

export default SearchBar
