import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import DiaryContent from '../components/Detail/DiaryContent'
import DiaryFooter from '../components/Detail/DiaryFooter'
import DiaryHeader from '../components/Detail/DiaryHeader'
import { useParams, useNavigate } from 'react-router-dom'
import { getAxios } from '../api'

function MyDetail() {
  const axios = getAxios()
  const navigate = useNavigate()
  const { dno } = useParams()

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
      <StyledImageArea>
        <StyledImage src={diary.image} />
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
  overflow: hidden;
  border: 1px solid blue;
`

const StyledImage = styled.img`
  width: 100%;
  object-fit: cover;
`

const StyledFormArea = styled.div`
  width: 50%;
  background: #ffdae5;
  padding: 1rem;
`

export default MyDetail
