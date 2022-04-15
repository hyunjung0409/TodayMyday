import React from 'react';
import styled from 'styled-components';
import LoginForm from '../components/LoginForm';

const Container = styled.div`
  height: 100vh;
  background-color: #01579b;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Item = styled.div`
  padding: 20px;
  background-color: #ffffff;
`;

function Login() {
  return (
    <Container>
      <Item>
        <LoginForm />
      </Item>
    </Container>
  );
}

export default Login;
