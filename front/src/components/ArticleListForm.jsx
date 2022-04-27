import React, { useEffect, useState } from 'react'
import { List, Skeleton, Divider } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleListItem from './ArticleListItem'
import Search from 'antd/lib/input/Search'
import { useDispatch, useSelector } from 'react-redux'
import { articleListRequestAction } from '../reducers/article'
import { getAxios } from '../api'
import moment from 'moment'
import 'moment/locale/ko'
import { useNavigate } from 'react-router-dom'
import { Select } from 'antd'

const { Option } = Select

function ArticleListForm(props) {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { articleList } = useSelector((state) => state.article)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const axios = getAxios()
  const navigate = useNavigate()
  const [searchKind, setSearchKind] = useState(null)

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
      ? axios
          .get(`diary/${searchKind}`, { params: { userId: me.userId, word: value } })
          .then((res) => {
            setData(res.data)
          })
          .catch((err) => {
            console.log('err', err)
          })
      : axios
          .get(`diary/${searchKind}`, { params: { userId: me.userId, keyword: value } })
          .then((res) => {
            setData(res.data)
          })
          .catch((err) => {
            console.log('err', err)
          })
  }

  const pageMove = (dno, e) => {
    navigate(`/diary/read/${dno}`)
  }

  function handleChange(value) {
    setSearchKind(value)
    if (value === 'all') {
      axios.get('user/read', { params: { userId: me.userId } }).then((res) => {
        setData(res.data.user.dairies)
      })
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
