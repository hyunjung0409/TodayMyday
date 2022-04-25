import React from 'react'
import { Input } from 'antd'
import { getAxios } from '../api'
import { useSelector } from 'react-redux'

const { Search } = Input
const axios = getAxios()

const SearchBar = ({ keyword, setKeyword, diaryList, setDiaryList }) => {
  const { me } = useSelector((state) => state.user)

  const onSearch = async (value) => {
    console.log('value: ', value)
    console.log('me: ', me)
    await setKeyword(value)
    console.log('keyword: ', keyword)
    let result = await axios.get('diary/search', { params: { keyword: value, userId: me.userId } })
    console.log('result: ', result)
    await setDiaryList([...result.data])
    console.log('diaryList: ', diaryList)
  }

  return <Search placeholder="input search text" onSearch={onSearch} enterButton />
}

export default SearchBar
