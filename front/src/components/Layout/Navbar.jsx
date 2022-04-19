import React from 'react'
import { Layout, Typography, Row, Col } from 'antd'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'

const { Header } = Layout
const { Title } = Typography

function Navbar() {
  const navigate = useNavigate()

  return (
    <Header style={{ background: '#C1E17D' }}>
      <Row justify="start">
        <Col span={4}>
          <StyledTitle level={5} onClick={() => navigate('/')}>
            지금 나의 하루는
          </StyledTitle>
        </Col>
        <Col span={16}>
          <nav className="nav-link">
            <StyledLink to="/my/article">
              <strong>글 작성</strong>
            </StyledLink>
            <StyledLink to="/my/search">
              <strong>글 검색</strong>
            </StyledLink>
            <StyledLink to="/my/detail">
              <strong>글 보기</strong>
            </StyledLink>
          </nav>
        </Col>

        <Col span={4}>
          <nav className="nav-user">
            <StyledLink to="/user/login">
              <strong>로그인</strong>
            </StyledLink>
            <StyledLink to="/user/signup">
              <strong>회원가입</strong>
            </StyledLink>
          </nav>
        </Col>
      </Row>
    </Header>
  )
}

const StyledTitle = styled(Title)`
  text-align: center;
  margin: 1.2rem 1rem 1rem 1rem;
  background: rgba(255, 255, 255, 0.3);
`

const StyledLink = styled(Link)`
  color: #38532e;
  padding: 0 1rem;
`

export default Navbar
