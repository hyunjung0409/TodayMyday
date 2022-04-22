import React, { useEffect, useState } from 'react'
import { List, Skeleton, Divider } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleListItem from './ArticleListItem'
import Search from 'antd/lib/input/Search'
import { Select } from 'antd'
import axios from 'axios'
import { useSelector } from 'react-redux'

function ArticleListForm(props) {
  const { me } = useSelector((state) => state.user)
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [userId, setserId] = useState(null)

  const loadMoreData = (userId) => {
    if (loading) {
      return
    }
    setLoading(true)
    axios
      .get(`http://localhost:8080/user/read/${userId}`)
      .then((res) => {
        setData([...data, ...res.data.user.dairies])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        loadMoreData(me.userId)
      }
    }
  }, [me])

  const onSearch = (value) => console.log(value)

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
                  createdat={item.createdat}
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
