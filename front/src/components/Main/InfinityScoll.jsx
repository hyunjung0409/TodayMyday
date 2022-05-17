import { Avatar, Divider, List, Skeleton, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'
import { getAxios } from '../../api'
import { useNavigate } from 'react-router-dom'

const MainLook = styled.div`
  margin-top: 5%;
  background-color: pink;
`
const PAGE_NUMBER = 1

function InfinityScoll(props) {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(PAGE_NUMBER)
  const axios = getAxios()
  const navigate = useNavigate()

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

  const pageMove = (dno, e) => {
    axios.get('/diary/view', { params: { dno: dno } }).then(() => {
      navigate(`/diary/read/${dno}`)
    })
  }

  return (
    <>
      <MainLook>
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
                <List.Item
                  style={{ cursor: 'pointer' }}
                  key={item.id}
                  onClick={(e) => {
                    pageMove(item.dno, e)
                  }}>
                  <div style={{ width: '100%', height: '150px', display: 'flex' }}>
                    <img src={item.image} alt="" style={{ flex: 1 }} />
                    <div style={{ flex: 4 }}>
                      <div style={{ position: 'relative', top: '15px' }}>
                        <h1 style={{ fontSize: '30px', fontWeight: 'bold', marginBottom: '20px' }}>
                          #{item.word}
                        </h1>
                        <p>
                          {item.content.length >= 35
                            ? item.content.substr(0, 35) + '...'
                            : item.content}
                        </p>
                        <div>{timeForToday(item.createdat)}</div>
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
