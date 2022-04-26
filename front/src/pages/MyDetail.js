import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import styled from 'styled-components'
import DiaryContent from '../components/Detail/DiaryContent'
import DiaryFooter from '../components/Detail/DiaryFooter'
import DiaryHeader from '../components/Detail/DiaryHeader'
import { useSelector } from 'react-redux'

function MyDetail() {
  const { me } = useSelector((state) => state.user)

  return (
    <StyledContainer>
      <StyledImageArea>
        <StyledImage src={me.image} />
      </StyledImageArea>

      <StyledFormArea className="styled-form-area">
        <DiaryHeader />
        <DiaryContent me={me} />
        <DiaryFooter />
      </StyledFormArea>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const StyledImageArea = styled.div`
  width: 50%;
  height: 40vh;
  overflow: hidden;
  border: 1px solid blue;
`

const StyledImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const StyledFormArea = styled.div`
  width: 50%;
  background: #ffdae5;
  padding: 1rem;
`

export default MyDetail
