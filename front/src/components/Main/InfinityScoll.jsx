import { Avatar, Divider, List, Skeleton } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'

const MainLook = styled.div`
  margin-top: 5%;
  background-color: pink;
`
const PAGE_NUMBER = 0

function InfinityScoll(props) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(PAGE_NUMBER)

  const loadMoreData = () => {
    if (loading) {
      return
    }
    setLoading(true)
    fetch(`http://k6c205.p.ssafy.io:8080/api/diary/paging?page=${page}`)
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.content])
        setPage(page + 1)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    loadMoreData()
  }, [])

  return (
    <>
      <MainLook>
        <h1>전체 글 리스트</h1>
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
            hasMore={data.length < 100}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv">
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.id}>
                  <div style={{ width: '100%', height: '150px', display: 'flex' }}>
                    <img width={50} src={item.image} alt="" style={{ flex: 2 }} />
                    <div style={{ flex: 2 }}>
                      <div style={{ position: 'relative', top: '15px' }}>
                        <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>#{item.word}</h1>
                        <p>
                          {item.content.length >= 35
                            ? item.content.substr(0, 35) + '...'
                            : item.content}
                        </p>
                        <div>{item.createdat}</div>
                      </div>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ position: 'relative', top: '25px' }}>
                        <div>
                          <HeartFilled style={{ fontSize: '22px' }} />{' '}
                          <span style={{ fontSize: '22px' }}>{item.liked}</span>
                        </div>
                        <div>
                          <EyeFilled style={{ fontSize: '22px' }} />{' '}
                          <span style={{ fontSize: '22px' }}>{item.view}</span>
                        </div>
                        <div>
                          <MessageFilled style={{ fontSize: '22px' }} />{' '}
                          <span style={{ fontSize: '22px' }}>0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </InfiniteScroll>
        </div>
      </MainLook>
    </>
  )
}

export default InfinityScoll
