import React from 'react'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'

const Age = styled.div`
  margin-top: 5%;
`
function MyAge() {
  return (
    <div>
      <Age>
        나이 : 숫자 <EditOutlined></EditOutlined>
      </Age>
    </div>
  )
}
export default MyAge
