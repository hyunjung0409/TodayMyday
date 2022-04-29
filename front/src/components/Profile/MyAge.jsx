import React, { useState } from 'react'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { Form, Input, Button, Select, Modal } from 'antd'
import { getAxios } from '../../api'
const { Option } = Select

const Age = styled.div`
  margin-top: 5%;
`
function MyAge() {
  const { me } = useSelector((state) => state.user)
  const [form] = Form.useForm()
  const [editable, setEditable] = useState(false)
  const [age, setAge] = useState('')

  const onFinish = async (values) => {
    const axios = getAxios()
    me !== null &&
      me.userId !== null &&
      (await axios.put(
        'user/modify',
        { age: values.ageRange, image: me.image, gender: me.gender },
        { params: { userId: me.userId } },
      ))
    me.age = values.ageRange
  }

  const success = () => {
    Modal.success({
      content: '회원정보 수정이 완료되었습니다.',
      // onOk: handleMove,
    })
  }

  return (
    <div>
      {editable === false ? (
        <Age>
          나이 : {me !== null && me.age}{' '}
          <EditOutlined
            onClick={(e) => {
              setEditable(!editable)
            }}></EditOutlined>
        </Age>
      ) : (
        <Age>
          나이 :
          <Form form={form} name="modify" onFinish={onFinish} autoComplete="off" layout="vertical">
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
            <Form.Item>
              <Button type="primary" htmlType="submit" onClick={success}>
                Register
              </Button>
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
