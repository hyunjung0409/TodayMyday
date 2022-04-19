import React from 'react'
import styled from 'styled-components'

const Gender = styled.div`
  margin-left: 5%;
  display: 'flex';
`
function MyGender() {
  return <Gender>성별 : 남 or 여</Gender>
}
export default MyGender
