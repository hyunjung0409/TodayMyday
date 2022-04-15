import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Layout, Button, Menu, Typography } from 'antd';
import { green } from '@ant-design/colors';
import styled from 'styled-components';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SearchMy from './pages/SearchMyDiary';
import MyDetail from './pages/MyDetail';
import './App.css';


const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout className='layout'>
      <Header style={{ background: green.primary, height: 70 }}>
        <StyledNavItems>
          <StyledLogo>
            <Title level={5} >지금 나의 하루는</Title>
          </StyledLogo>
          {/* <Button type="text">글 작성</Button> */}
          <Menu mode='horizontal' style={{ background: green.primary, height: 70 }}>
            <Menu.Item style={{ height: 70 }}>글 작성</Menu.Item>
            <Menu.Item>둘러보기</Menu.Item>
          </Menu>
          <StyledUserArea>
            <Title level={5} >로그인</Title>
          </StyledUserArea>
        </StyledNavItems>
      </Header>
      <Content style={{ padding: '50px' }}>
        <StyledContentArea>
          <div className='App'>
            <BrowserRouter>
              <Routes>
                <Route path='/' element={<Main />} />
                <Route path='/user/login' element={<Login />} />
                <Route path='/user/signup' element={<Signup />} />
                <Route path='/my/search' element={<SearchMy />} />
                <Route path='/my/detail' element={<MyDetail />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/Writing" element={<Writing />} />
              </Routes>
            </BrowserRouter>
          </div>
        </StyledContentArea>
      </Content>
      <Footer style={{ background: green.primary, textAlign: 'center' }}>지금 나의 하루는 ©2022 Created by Ginny-us </Footer>
    </Layout>
  );
}

const StyledNavItems = styled.div`
  display: flex;
  align-items: center;
`

const StyledLogo = styled.div`
  float: left;
  width: 150px;
  height: 31px;
  margin: 16px 24px 16px 0;
  // background: rgba(255, 255, 255, 0.3);
`
const StyledUserArea = styled.div`
  float: right;
  width: 150px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
`

const StyledContentArea = styled.div`
  min-height: 280px;
  padding: 24px;
  background: rgba(255, 255, 255, 0.3);
`

export default App;
