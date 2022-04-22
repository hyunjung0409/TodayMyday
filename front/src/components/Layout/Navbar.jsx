import React, { useEffect, useState } from 'react'
import { Layout, Typography, Row, Col } from 'antd'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserRequestAction, logoutRequestAction } from '../../reducers/user'
import jwt_decode from 'jwt-decode'

const { Header } = Layout
const { Title } = Typography

function Navbar() {
  const navigate = useNavigate()
  const { me } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onLogOut = () => {
    dispatch(logoutRequestAction({ navigate }))
  }

  useEffect(() => {
    if (localStorage.getItem('jwtToken') != null) {
      const decode_token = jwt_decode(localStorage.getItem('jwtToken'))
      const userId = decode_token.sub
      dispatch(loadUserRequestAction({ userId }))
    }
  }, [])

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
            {me && (
              <>
                <StyledLink to="/my/article">
                  <strong>글 작성</strong>
                </StyledLink>
                <StyledLink to="/my/articleList">
                  <strong>글 목록</strong>
                </StyledLink>
                <StyledLink to="/my/search">
                  <strong>글 검색</strong>
                </StyledLink>
                <StyledLink to="/my/detail">
                  <strong>글 보기</strong>
                </StyledLink>
              </>
            )}
          </nav>
        </Col>

        <Col span={4}>
          {me ? (
            <nav className="nav-user">
              <StyledLink to="/#">
                <strong>마이페이지</strong>
              </StyledLink>
              <strong onClick={onLogOut}>로그아웃</strong>
            </nav>
          ) : (
            <nav className="nav-user">
              <StyledLink to="/user/login">
                <strong>로그인</strong>
              </StyledLink>
              <StyledLink to="/user/signup">
                <strong>회원가입</strong>
              </StyledLink>
            </nav>
          )}
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
