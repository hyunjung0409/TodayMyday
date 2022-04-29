import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

function LandingImage() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/user/login')
  }

  return (
    <StyledImageArea>
      <StyledBackgroundArea>
        <StyledBackgroundImage src="/images/diary-2.png" />
      </StyledBackgroundArea>

      <StyledFrontImage>
        <img src="/images/title-004.png" style={{ width: '80%' }} />
      </StyledFrontImage>
      <StyledButton>
        <img src="/images/button-001.png" style={{ width: '40%' }} onClick={onClick} />
      </StyledButton>
      {/* <StyledTitle>
          <img src="/images/title-002.png" style={{ width: '80%' }} />
        </StyledTitle>
        <StyledSubTitle>
          <img src="/images/title-003.png" style={{ width: '60%' }} />
        </StyledSubTitle> */}
    </StyledImageArea>
  )
}

const animate = keyframes`
0% {
  left: -10%;
  top: -50%;
}
100% {
  left: 0%;
  top: 0%
}
`

const StyledImageArea = styled.div`
  position: relative;
  height: 55rem;
  overflow: hidden;
  background: #ffdae5;
  border: solid 1px black;
`

const StyledBackgroundArea = styled.div`
  position: relative;
  top: 7rem;
  left: 16vw;
  width: 60vw;
  height: 40rem;
  overflow: hidden;
  background: #fff;
  border: solid 1px red;
`

const StyledBackgroundImage = styled.img`
  width: 120%;
  position: relative;
  opacity: 0.5;
  animation: ${animate} 8s linear infinite alternate;
`

const StyledFrontImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
`

const StyledButton = styled.div`
  position: absolute;
  top: 25rem;
  left: 4rem;
`

const StyledTitle = styled.div`
  position: absolute;
  top: 18rem;
  left: -5rem;
`

const StyledSubTitle = styled.div`
  position: absolute;
  top: 1rem;
  right: -12rem;
`

export default LandingImage
