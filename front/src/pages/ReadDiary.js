import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Image, Avatar, Row, Col } from 'antd'
import DiaryContent from '../components/Detail/DiaryContent'
import DiaryFooter from '../components/Detail/DiaryFooter'
import DiaryHeader from '../components/Detail/DiaryHeader'
import { useParams, useNavigate } from 'react-router-dom'
import { getAxios } from '../api'
import Comment from '../components/Diary/Comment'

// import { useSelector } from 'react-redux'

function MyDetail() {
  const axios = getAxios()
  const navigate = useNavigate()
  const { dno } = useParams()

  const [diary, setDiary] = useState({})

  const match = async () => {
    let result = await axios.get(`/diary/read/${dno}`)
    setDiary(result.data)
    console.log(result.data)
  }

  useEffect(() => {
    match()
  }, [])

  return (
    <Row>
      <Col span={12}>
        <StyledContainer>
          <StyledImageArea className="image-area">
            <Image src={diary.image} width="100%" height="100%" style={{ objectFit: 'cover' }} />
          </StyledImageArea>

          <StyledFormArea className="styled-form-area">
            <DiaryHeader diary={diary} />
            <DiaryContent diary={diary} />
            <DiaryFooter diary={diary} dno={dno} />
          </StyledFormArea>
        </StyledContainer>
      </Col>
      <Col span={12}>
        <Comment></Comment>
      </Col>
    </Row>
  )
}

const StyledContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`

const StyledImageArea = styled.div`
  width: 70%;
  height: 50%;
  overflow: hidden;
  // border: 1px solid blue;
`

const StyledFormArea = styled.div`
  width: 70%;
  background: #ffdae5;
  padding: 2rem;
`
// const ReadComments = styled.div``
// const WriteComment = styled.textarea`
//   min-height: 70px;
//   resize: none;
// `
// const ReadComment = styled.div`
//     display: flex;
//     width: 100%
//     margin-top: 5%;
//     margin-bottom: 5%;

// `
export default MyDetail
