import React, { useState } from 'react'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Form, Select } from 'antd'
const { Option } = Select

const Age = styled.div`
  margin-top: 5%;
`
function MyAge() {
  // 비동기 처리 해야된다

  const { me } = useSelector((state) => state.user)
  const [form] = Form.useForm()

  const [editable, setEditable] = useState(false)
  const [age, setAge] = useState('')

  return (
    <div>
      {editable === false ? (
        <Age>
          나이 : {me.age}{' '}
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
          <Form
            form={form}
            // name="signup"
            // onSubmit={onSubmit}

            autoComplete="off"
            layout="vertical">
            <Form.Item
              label="연령대"
              name="ageRange"
              rules={[
                {
                  required: false,
                  message: 'Please select ageRange!',
                },
              ]}>
              <Select placeholder="Select your ageRange">
                <Option value="1">어린이 (0~9)</Option>
                <Option value="2">청소년 (10~19)</Option>
                <Option value="3">청년 (20~29)</Option>
                <Option value="4">중/장년 (30~59)</Option>
                <Option value="5">노년 (60~)</Option>
              </Select>
            </Form.Item>
          </Form>
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
