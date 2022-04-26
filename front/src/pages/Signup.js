import React, { useState } from 'react'
import styled from 'styled-components'
import SignupForm from '../components/Signup/SignupForm'
import ImageUploader from '../service/image_uploader'

const imageUploader = new ImageUploader()

function Signup() {
  const [data, setData] = useState({
    fileURL: '/images/기본이미지.jpg',
  })

  return (
    <StyledContainer>
      <StyledFormArea className="styled-form-area">
        <h3>Signup page</h3>
        <SignupForm imageUploader={imageUploader} data={data} />
      </StyledFormArea>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`

const StyledFormArea = styled.div`
  border: 3px solid red;
  width: 50%;
`

export default Signup
