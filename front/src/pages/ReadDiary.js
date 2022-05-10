import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button, Image } from 'antd'
import DiaryContent from '../components/Detail/DiaryContent'
import DiaryFooter from '../components/Detail/DiaryFooter'
import DiaryHeader from '../components/Detail/DiaryHeader'
import { useParams, useNavigate } from 'react-router-dom'
import { getAxios } from '../api'
import { useSelector } from 'react-redux'

function MyDetail() {
  const axios = getAxios()
  const navigate = useNavigate()
  const { dno } = useParams()
  const { me } = useSelector((state) => state.user)

  const [diary, setDiary] = useState({})

  const match = async () => {
    let result = await axios.get(`/diary/read/${dno}`)
    setDiary(result.data)
  }

  useEffect(() => {
    match()
  }, [])

  return (
    <StyledContainer>
      <StyledImageArea className="image-area">
        <Image src={diary.image} width="100%" height="100%" style={{ objectFit: 'cover' }} />
      </StyledImageArea>

      <StyledFormArea className="styled-form-area">
        <DiaryHeader diary={diary} />
        <DiaryContent diary={diary} />
        <DiaryFooter dno={dno} />
      </StyledFormArea>
    </StyledContainer>
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
  width: 50%;
  height: 50%;
  overflow: hidden;
  // border: 1px solid blue;
`

const StyledFormArea = styled.div`
  width: 50%;
  background: #ffdae5;
  padding: 1rem;
`

export default MyDetail
