import React, { useEffect } from 'react'
import { Input, Select } from 'antd'
import { getAxios } from '../../api'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { loadUserRequestAction } from '../../reducers/user'

const { Option } = Select
const axios = getAxios()

const SearchBar = ({
  keyword,
  setKeyword,
  diaryList,
  setDiaryList,
  me,
  option,
  setOption,
  optionBool,
  setOptionBool,
}) => {
  const dispatch = useDispatch()

  const onChange = (value) => {
    console.log('value: ', value)
    setOption(value)
  }

  const onSearch = (value) => {
    setKeyword(value)
    console.log('searching')

    const getResult = async () => {
      if (option === 'word') {
        let result = await axios.get('diary/searchallword', {
          params: { word: value },
        })
        console.log('result: ', result)
        await setDiaryList([...result.data])
        setOptionBool(false)
      } else if (option === 'content') {
        let result = await axios.get('diary/searchallcontent', {
          params: { keyword: value },
        })
        console.log('result: ', result)
        await setDiaryList([...result.data])
        setOptionBool(true)
      }
    }

    try {
      getResult()
    } catch (err) {
      console.log(err)
    }
  }

  // useEffect(() => {
  //   if (localStorage.getItem('jwtToken') != null) {
  //     const decode_token = jwt_decode(localStorage.getItem('jwtToken'))
  //     const userId = decode_token.sub
  //     dispatch(loadUserRequestAction({ userId }))
  //   }
  // }, [])

  return (
    <>
      <Input.Group compact>
        <Select defaultValue="word" onChange={onChange}>
          <Option value="word">단어</Option>
          <Option value="content">내용</Option>
        </Select>
        <Input.Search
          allowClear
          style={{ width: '80%' }}
          placeholder="input search text"
          onSearch={onSearch}
        />
      </Input.Group>
    </>
  )
}

export default SearchBar
