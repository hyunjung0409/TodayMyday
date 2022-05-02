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
`
// const Search = styled.input`
//   margin-right: 3%;
//   float: right;
// `

function PickWords() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const [visible, setVisible] = useState(false)
  const dispatch = useDispatch()
  const [boolean, setBoolean] = useState('boolean')
  const [searchKind, setSearchKind] = useState(null)
  const [data, setData] = useState([])
  const { articleList } = useSelector((state) => state.article)

  const { me } = useSelector((state) => state.user)
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
      setData([...articleList])
    } else {
      setBoolean('')
    }
  }
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
        <div
          id="scrollableDiv"
          style={{
            height: 200,
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
            {boolean === '' ? (
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
            ) : (
              <Row gutter={16}>
                {me !== null &&
                  me.dairies
                    // .map((a, i) => {
                    //   return a.word
                    // })
                    // .reduce((ac, v) => (ac.includes(v) ? ac : [...ac, v]), [])
                    // .map((a, i) => {
                    //   return (
                    .map((a, i) => {
                      return (
                        <Col key={i} className="gutter-row" span={6}>
                          <p
                            onClick={(e) => {
                              pageMove(a.dno, e)
                            }}>
                            {a.word}{' '}
                          </p>
                          <Modal
                            title="Modal 1000px width"
                            centered
                            visible={visible}
                            onOk={() => setVisible(false)}
                            onCancel={() => setVisible(false)}
                            width={1000}>
                            {' '}
                            {a.word}
                          </Modal>
                        </Col>
                      )

                      // <div key={i}>{a.word}</div>
                    })}
              </Row>
            )}
          </InfiniteScroll>
        </div>
      </Words>
    </div>
  )
}
export default PickWords
