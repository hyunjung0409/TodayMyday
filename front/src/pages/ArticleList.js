import React from 'react'
import { Row, Col } from 'antd'
import ImageCarousel from '../components/ImageCarousel'
import ArticleListForm from '../components/ArticleListForm'

function ArticleList(props) {
  return (
    <>
      <div>
        <Row>
          <Col span={12}>
            <ImageCarousel />
            <ImageCarousel />
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
