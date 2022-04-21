import React from 'react'
import { Button, Form, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { loginRequestAction } from '../reducers/user'

const Title = styled.h3``
const MyButton = styled(Button)`
  margin-bottom: 10px;
`

function LoginForm() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = (values) => {
    console.log('Success:', values)
    dispatch(loginRequestAction({ values, navigate }))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <Title>로그인</Title>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical">
        <Form.Item label="ID" name="userId">
          <Input />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <MyButton type="primary" htmlType="submit">
            Login
          </MyButton>
          <div>
            <Link to="/user/signup">Signup</Link>
          </div>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
