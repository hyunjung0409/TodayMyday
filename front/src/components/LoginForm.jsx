import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h3``;

function LoginForm() {
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      <Title>로그인</Title>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              message: 'Please input your username!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button style={{ marginBottom: '10px' }} type="primary" htmlType="submit">
            Login
          </Button>
          <Link to="/signup">signUp</Link>
        </Form.Item>
      </Form>
    </>
  );
}

export default LoginForm;
