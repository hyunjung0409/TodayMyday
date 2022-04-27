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

function ArticleListForm(props) {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { articleList } = useSelector((state) => state.article)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
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
    axios
      .get('diary/searchword', { params: { userId: me.userId, word: value } })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  return (
    <div style={{ width: '100%', margin: '10rem auto' }}>
      <div style={{ marginBottom: '10px' }}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="검색"
          size="large"
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
              <List.Item key={item.id}>
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
