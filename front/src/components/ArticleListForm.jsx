import 'moment/locale/ko'
import moment from 'moment'
import { Select } from 'antd'
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
  const axios = getAxios()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [data, setData] = useState([])
  const [boolean, setBoolean] = useState('boolean')
  const [loading, setLoading] = useState(false)
  const { me } = useSelector((state) => state.user)
  const [searchKind, setSearchKind] = useState(null)
  const { articleList } = useSelector((state) => state.article)

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
    navigate(`/diary/read/${dno}`)
  }

  function handleChange(value) {
    setSearchKind(value)
    if (value === 'all') {
      setBoolean('boolean')
      setData([...articleList])
    } else {
      setBoolean('')
    }
  }

  return (
    <div style={{ width: '100%', margin: '10rem auto' }}>
      <div style={{ width: '100%', marginBottom: '10px' }}>
        <Select
          defaultValue="전체보기"
          size="large"
          onChange={handleChange}
          style={{ float: 'left', width: '19%', marginRight: '5px' }}>
          <Option value="all">전체보기</Option>
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
          disabled={boolean}
        />
      </div>
      <div
        id="scrollableDiv"
        style={{
          height: 400,
          overflow: 'auto',
          padding: '0 16px',
          border: '1px solid rgba(140, 140, 140, 0.35)',
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
                  createdat={moment(item.createdat).format('YYYY-MM-DD HH:mm:ss')}
                />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default ArticleListForm
