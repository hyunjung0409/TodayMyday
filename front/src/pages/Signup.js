import React from 'react'
import styled from 'styled-components'
import SignupForm from '../components/SignupForm'

function Signup() {
  return (
    <StyledContainer>
      <StyledFormArea className="styled-form-area">
        <h3>Signup page</h3>
        <SignupForm />
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
