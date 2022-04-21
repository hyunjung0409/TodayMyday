import React, { useState } from 'react'
import styled from 'styled-components'
import SignupForm from '../components/Signup/SignupForm'
import ImageUploader from '../service/image_uploader'

function Signup() {
  const [form, setForm] = useState({
    word: '바다',
    message: '',
    fileURL: '/images/기본이미지.jpg',
  })

  return (
    <StyledContainer>
      <StyledFormArea className="styled-form-area">
        <h3>Signup page</h3>
        <SignupForm imageUploader={ImageUploader} form={form} setForm={setForm} />
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

const StyledFormArea = styled.div`
  width: 50%;
`

export default Signup
