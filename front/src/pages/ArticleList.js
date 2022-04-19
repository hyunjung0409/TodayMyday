import React from 'react'
import { Row, Col } from 'antd'
import ImageCarousel from '../components/ImageCarousel'

function ArticleList(props) {
  return (
    <>
      <div>글 목록 페이지</div>
      <div>
        <Row>
          <Col span={12}>
            <ImageCarousel />
            <ImageCarousel />
          </Col>
          <Col span={12}>글 목록</Col>
        </Row>
      </div>
    </>
  )
}

export default ArticleList
