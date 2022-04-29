import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

function LandingInfo() {
  const navigate = useNavigate()

  const onClick = () => {
    navigate('/user/login')
  }

  return (
    <>
      <StyledInfoArea>
        <StyledRightImage src="/images/diary-3.png" />
      </StyledInfoArea>
      <StyledInfoArea></StyledInfoArea>
    </>
  )
}

const rightAnimate = keyframes`
// 0% {
//   right: -10%;
//   top: 0;
// }
// 100% {
//     right: 0%;
//     top: 0;
// }
    from { transform: translateY(5rem); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
`
const StyledInfoArea = styled.div`
  position: relative;
  height: 30rem;
  overflow: hidden;
  background: #ffdae5;
  border: solid 1px black;
`

const StyledRightImage = styled.img`
  position: relative;
  animation: ${rightAnimate} 2s;
`

export default LandingInfo
