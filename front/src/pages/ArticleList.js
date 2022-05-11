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
  const [likedImg, setLikedImg] = useState(null)
  const [viewImg, setViewImg] = useState(null)

  useEffect(() => {
    if (me !== null) {
      axios
        .get('/diary/mytopliked', { params: { userId: me.userId } })
        .then((res) => {
          const tmp = []
          res.data.diaries.map((item, idx) => {
            return tmp.push(item.image)
          })
          setLikedImg(tmp)
        })
        .catch((err) => {
          console.log(err)
        })
      axios
        .get('/diary/mytopview', { params: { userId: me.userId } })
        .then((res) => {
          const tmp = []
          res.data.diaries.map((item, idx) => {
            return tmp.push(item.image)
          })
          setViewImg(tmp)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [me])

  return (
    <>
      <div>
        <Row>
          <Col span={12}>
            {likedImg !== null && <LikedImgCarousel images={likedImg} />}
            {likedImg !== null && <ViewImgCarousel images={viewImg} />}
          </Col>
          <Col span={12}>
            <ArticleListForm />
          </Col>
        </Row>
      </div>
    </>
  )
}

export default ArticleList
