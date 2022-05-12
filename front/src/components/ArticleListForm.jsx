import 'moment/locale/ko'
import moment from 'moment'
import { Select, Tag } from 'antd'
import { getAxios } from '../api'
import Search from 'antd/lib/input/Search'
import { useNavigate } from 'react-router-dom'
import { List, Skeleton, Divider } from 'antd'
import ArticleListItem from './ArticleListItem'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  articleListRequestAction,
  diarySearchWordRequestAction,
  diarySearchContentRequestAction,
} from '../reducers/article'

const { Option } = Select

function ArticleListForm(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [boolean, setBoolean] = useState('boolean')
  const [loading, setLoading] = useState(false)
  const { me } = useSelector((state) => state.user)
  const [searchKind, setSearchKind] = useState('searchword')
  const { articleList } = useSelector((state) => state.article)
  const axios = getAxios()

  const loadMoreData = (userId) => {
    if (loading) {
      return
    }
    dispatch(articleListRequestAction({ userId }))
    setLoading(true)
  }
  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        loadMoreData(me.userId)
      }
    }
  }, [me])

  useEffect(() => {
    if (articleList != null) {
      setData([...articleList])
    }
  }, [articleList])

  const onSearch = (value) => {
    searchKind === 'searchword'
      ? dispatch(
          diarySearchWordRequestAction({ userId: me.userId, word: value, searchKind, setData }),
        )
      : dispatch(
          diarySearchContentRequestAction({
            userId: me.userId,
            keyword: value,
            searchKind,
            setData,
          }),
        )
  }

  const pageMove = (dno, e) => {
    axios.get('/diary/view', { params: { dno: dno } }).then(() => {
      navigate(`/diary/read/${dno}`)
    })
  }

  function handleChange(value) {
    console.log('value', value)
    setSearchKind(value)
  }

  function timeForToday(value) {
    let tData = new Date(value)
    tData.setHours(tData.getHours() + 9)
    const today = new Date()
    const timeValue = new Date(tData)

    const betweenTime = Math.floor((today.getTime() - timeValue.getTime()) / 1000 / 60)
    if (betweenTime < 1) return '방금 전'
    if (betweenTime < 60) {
      return `${betweenTime}분 전`
    }

    const betweenTimeHour = Math.floor(betweenTime / 60)
    if (betweenTimeHour < 24) {
      return `${betweenTimeHour}시간 전`
    }

    const betweenTimeDay = Math.floor(betweenTime / 60 / 24)
    if (betweenTimeDay < 8) {
      return `${betweenTimeDay}일 전`
    }

    return `${value}`
  }

  const viewSort = () => {
    let tmp = [...data]
    tmp.sort((a, b) => b.view - a.view)
    setData(tmp)
  }

  const likedSort = () => {
    let tmp = [...data]
    tmp.sort((a, b) => b.liked - a.liked)
    setData(tmp)
  }

  const createdatSort = () => {
    let tmp = [...data]
    tmp.sort((a, b) => new Date(b.createdat) - new Date(a.createdat))
    setData(tmp)
  }

  return (
    <div style={{ width: '100%', margin: '10rem auto' }}>
      <div style={{ width: '100%', marginBottom: '10px' }}>
        <Select
          defaultValue="단어"
          size="large"
          onChange={handleChange}
          style={{ float: 'left', width: '19%', marginRight: '5px' }}>
          <Option value="searchword">단어</Option>
          <Option value="searchcontent">내용</Option>
        </Select>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="검색"
          size="large"
          style={{ width: '80%' }}
          onSearch={onSearch}
        />
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
          marginBottom: '10px',
        }}>
        <InfiniteScroll
          dataLength={data.length}
          next={loadMoreData}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv">
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                key={item.id}
                onClick={(e) => {
                  pageMove(item.dno, e)
                }}>
                <ArticleListItem
                  picture={item.image}
                  title={item.word}
                  content={item.content}
                  view={item.view}
                  liked={item.liked}
                  createdat={timeForToday(item.createdat)}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
      <div style={{ textAlign: 'right' }}>
        <Tag style={{ cursor: 'pointer' }} color="magenta" onClick={createdatSort}>
          최신순
        </Tag>
        <Tag style={{ cursor: 'pointer' }} color="green" onClick={viewSort}>
          조회수
        </Tag>
        <Tag style={{ cursor: 'pointer' }} color="purple" onClick={likedSort}>
          좋아요
        </Tag>
      </div>
    </div>
  )
}

export default ArticleListForm
