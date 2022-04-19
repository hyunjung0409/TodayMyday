import React, { useEffect, useState } from 'react'
import { List, Skeleton, Divider } from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import ArticleListItem from './ArticleListItem'
import Search from 'antd/lib/input/Search'
import { Select } from 'antd'

function ArticleListForm(props) {
  const { Option } = Select
  function handleChange(value) {
    console.log(`selected ${value}`)
  }
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results])
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  useEffect(() => {
    loadMoreData()
  }, [])

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
          hasMore={data.length < 50}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
          scrollableTarget="scrollableDiv">
          <List
            dataSource={data}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <ArticleListItem picture={item.picture.large} title={item.name.last} />
              </List.Item>
            )}
          />
        </InfiniteScroll>
      </div>
    </div>
  )
}

export default ArticleListForm
