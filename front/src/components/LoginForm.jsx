import React from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Title = styled.h3``;
const MyButton = styled(Button)`
  margin-bottom: 10px
`;

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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item
          label="ID"
          name="id"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
        >
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
  );
}

export default LoginForm;
