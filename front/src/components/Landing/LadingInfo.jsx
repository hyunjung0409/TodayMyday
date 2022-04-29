import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import Fade from 'react-reveal/Fade'
import { Space, Button, Typography } from 'antd'
import { LoginOutlined } from '@ant-design/icons'

function LandingInfo() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/user/login')
  }

  return (
    <>
      <StyledContainer>
        <Fade>
          <StyledTitle src="/images/title-007.png" />
        </Fade>
        <Fade right>
          <StyledImage>
            <img src="/images/diary-3.png" style={{ width: '100%' }} />
          </StyledImage>
        </Fade>
        <Fade left>
          <StyledSubTitle src="/images/title-008.png" />
          <StyledButton onClick={onClick}>시작하기</StyledButton>
        </Fade>
      </StyledContainer>
    </>
  )
}

const StyledContainer = styled.div`
  position: relative;
  height: 40rem;
  overflow: hidden;
  background: #fff;
  //   border: solid 1px black;
`

const StyledTitle = styled.img`
  position: absolute;
  top: -6rem;
  right: 0;
  bottom: 0;
  left: 4rem;
  width: 70rem;
`

const StyledImage = styled.div`
  position: absolute;
  top: 12rem;
  right: 0;
  bottom: 0;
  left: 44rem;
  width: 35rem;
  height: 23rem;
  overflow: hidden;
`

const StyledSubTitle = styled.img`
  position: absolute;
  top: -6.5rem;
  right: 0;
  bottom: 0;
  left: 4.5rem;
  width: 70rem;
`

const StyledButton = styled(Button)`
  position: absolute;
  top: 30.5rem;
  right: 0;
  bottom: 0;
  left: 10.5rem;
  width: 6rem;
`

export default LandingInfo
