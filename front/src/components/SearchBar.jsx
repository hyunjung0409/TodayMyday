import React from 'react'
import { Input } from 'antd'
import { getAxios } from '../api'
import { useSelector } from 'react-redux'

const { Search } = Input
const axios = getAxios()

const SearchBar = ({ keyword, setKeyword, diaryList, setDiaryList }) => {
  const { me } = useSelector((state) => state.user)

  // const getDiaryList = async () => {
  //   // setDiaryList([])
  // }

  const onSearch = async (value) => {
    console.log('value: ', value)
    console.log('me: ', me)
    // await setKeyword(value)
    let result = await axios.get('dairy/search', { keyword: value }, { userId: me.values.userId })
    console.log('result: ', result)
  }

  return (
    <Search
      placeholder="input search text"
      onSearch={onSearch}
      // onClick={getDiaryList}
      enterButton
    />
  )
}

export default SearchBar
