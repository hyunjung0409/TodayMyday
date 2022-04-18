import React from 'react'
import { Layout, Menu, Typography, Button } from 'antd'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const { Header } = Layout
const { Title } = Typography

function Navbar() {
  const navigate = useNavigate()

  return (
    <Header style={{ background: '#C1E17D', height: '5rem' }}>
      <StyledLogo>
        <Title level={5} onClick={() => navigate('/')}>
          지금 나의 하루는
        </Title>
      </StyledLogo>

      <Menu mode="horizontal" style={{ background: '#C1E17D', height: '5rem' }}>
        <Menu.Item key="1" onClick={() => navigate('/my/writing')}>
          글 작성
        </Menu.Item>
        <Menu.Item key="2" onClick={() => navigate('/my/search')}>
          글 검색
        </Menu.Item>
        <Menu.Item key="3" onClick={() => navigate('/my/detail')}>
          글 보기
        </Menu.Item>
      </Menu>

      <Button type="text" onClick={() => navigate('/user/login')}>
        로그인
      </Button>
      <Button type="text" onClick={() => navigate('/user/signup')}>
        회원가입
      </Button>
    </Header>
  )
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

export default Navbar
