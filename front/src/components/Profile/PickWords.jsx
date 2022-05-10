import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAxios } from '../../api'
import Search from 'antd/lib/input/Search'
import { Select } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import ArticleListItem from '../ArticleListItem'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Divider, Modal, List, Skeleton } from 'antd'

import {
  articleListRequestAction,
  diarySearchWordRequestAction,
  diarySearchContentRequestAction,
} from '../../reducers/article'
import MyWord from '../MyWord'
// const style = { background: '#0092ff', padding: '8px 0' }
const { Option } = Select

const Words = styled.div`
  width: 100%;
  height: 350px;
  background-color: rgb(238, 167, 187);
  text-align: left;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2%;
  margin-top: 3%;
`

function PickWords() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const axios = getAxios()

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [boolean, setBoolean] = useState('boolean')
  const [searchKind, setSearchKind] = useState(null)
  const [data, setData] = useState([])
  const { articleList } = useSelector((state) => state.article)
  const [test, setTest] = useState(null)
  const [word, setWord] = useState(null)

  const { me } = useSelector((state) => state.user)
  const onSearch = (value) => {
    setTest([value])
    searchKind === 'searchword' &&
      dispatch(
        diarySearchWordRequestAction({ userId: me.userId, word: value, searchKind, setData }),
      )
  }
  const loadMoreData = (userId) => {
    if (loading) {
      return
    }
    dispatch(articleListRequestAction({ userId }))
    setLoading(true)
  }
  const pageMove = (dno, e) => {
    navigate(`/diary/read/${dno}`)
  }
  function handleChange(value) {
    setSearchKind(value)
    if (value === 'all') {
      setBoolean('boolean')
      axios.get(`/diary/myword`, { params: { userId: me.userId } }).then((res) => {
        setWord(res.data)
      })
    } else {
      setBoolean('')
    }
  }

  useEffect(() => {
    me !== null &&
      axios.get(`/diary/myword`, { params: { userId: me.userId } }).then((res) => {
        setWord(res.data)
      })
  }, [me])

  return (
    <div>
      <Words>
        내가 선택한 단어 <hr />
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <Select
            defaultValue="전체보기"
            size="large"
            onChange={handleChange}
            style={{ float: 'left', width: '19%' }}>
            <Option value="all">전체보기</Option>
            <Option value="searchword">단어</Option>
          </Select>
          <Search
            placeholder="input search text"
            allowClear
            enterButton="검색"
            size="large"
            style={{ width: '80%' }}
            onSearch={onSearch}
            disabled={boolean}
          />
        </div>
        <hr />
        <MyWord test={test} data={data} setWord={setWord} word={word} />
      </Words>
    </div>
  )
}
export default PickWords
