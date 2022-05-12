import React, { useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import ArticleListForm from '../components/ArticleListForm'
import { getAxios } from '../api'
import { useSelector } from 'react-redux'
import LikedImgCarousel from '../components/LikedImgCarousel'
import ViewImgCarousel from '../components/ViewmgCarousel'

function ArticleList(props) {
  const axios = getAxios()
  const { me } = useSelector((state) => state.user)
  const [liked, setLiked] = useState(null)
  const [view, setView] = useState(null)

  useEffect(() => {
    if (me !== null) {
      axios
        .get('/diary/mytopliked', { params: { userId: me.userId } })
        .then((res) => {
          const tmp = []
          res.data.diaries.map((item, idx) => {
            return tmp.push(item)
          })
          setLiked(tmp)
        })
        .catch((err) => {
          console.log(err)
        })
      axios
        .get('/diary/mytopview', { params: { userId: me.userId } })
        .then((res) => {
          const tmp = []
          res.data.diaries.map((item, idx) => {
            return tmp.push(item)
          })
          setView(tmp)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [me])

  return (
    <>
      <Row>
        <Col span={12}></Col>
        <Col span={12}>
          <ArticleListForm />
        </Col>
      </Row>
      <Row>
        <Col span={12}>{liked !== null && <LikedImgCarousel liked={liked} />}</Col>
        <Col span={12}>{view !== null && <ViewImgCarousel view={view} />}</Col>
      </Row>
    </>
  )
}

export default ArticleList
