import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import Fade from 'react-reveal/Fade'
import diaryImage from '../../assets/diary-2.PNG'

function LandingImage() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/user/login')
  }

  return (
    <StyledContainer>
      <StyledBackground />

      <StyledTitle>
        <img src="/images/title-004.png" style={{ width: '60rem' }} />
      </StyledTitle>

      <StyledImage>
        <img src={diaryImage} style={{ width: '100%', opacity: '80%' }} />
      </StyledImage>
      <Fade left>
        <StyledSubTitle style={{ marginTop: '-1.5rem', marginLeft: '-12rem' }}>
          <img src="/images/title-005.png" style={{ width: '60rem' }} />
        </StyledSubTitle>
      </Fade>
      <Fade right>
        <StyledSubTitle style={{ marginTop: '-7rem', marginRight: '-15rem' }}>
          <img src="/images/title-006.png" style={{ width: '60rem' }} />
        </StyledSubTitle>
      </Fade>
    </StyledContainer>
  )
}

const StyledContainer = styled.div`
  position: relative;
  height: 40rem;
  overflow: hidden;
  background: #fff;
  //   border: solid 1px black;
`

const StyledTitle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin-top: -1.3rem;
`

const StyledBackground = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: 5.5rem auto auto auto;
  width: 70rem;
  height: 30rem;
  background: #ffdae5;
`

const StyledImage = styled.div`
  position: absolute;
  top: 3rem;
  right: 0;
  bottom: 0;
  left: 0;
  width: 35rem;
  height: 20rem;
  overflow: hidden;
  margin: auto;
`
const StyledSubTitle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  //   margin-top: -1.5rem;
`

// const animate = keyframes`
// 0% {
//   left: -10%;
//   top: -50%;
// }
// 100% {
//   left: 0%;
//   top: 0%
// }
// `

// const scaleInAnimate = keyframes`
// 0% {
//     transform: scale(1);
//     opacity: 1;
//   }
//   100% {
//     transform: scale(1.1);
//     opacity: 1;
//   }
// `

export default LandingImage
