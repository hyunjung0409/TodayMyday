import React, { useState } from 'react'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'

const Age = styled.div`
  margin-top: 5%;
`
function MyAge() {
  const [editable, setEditable] = useState(false)
  const [age, setAge] = useState('')
  return (
    <div>
      {editable === false ? (
        <Age>
          나이 : 숫자{' '}
          <EditOutlined
            onClick={(e) => {
              setEditable(!editable)
            }}></EditOutlined>
        </Age>
      ) : (
        <Age>
          나이 :
          <input
            type="text"
            value="api로 값 받아오면 됨"
            onChange={(e) => setAge(e.target.value)}></input>
          <EditOutlined
            onClick={(e) => {
              setEditable(!editable)
            }}></EditOutlined>
        </Age>
      )}
    </div>
  )
}
export default MyAge
