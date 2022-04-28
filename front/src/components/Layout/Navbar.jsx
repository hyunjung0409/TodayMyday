import React, { useEffect, useState } from 'react'
import { Layout, Typography, Row, Col, Menu, Dropdown, Space, Avatar } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
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
    console.log('logout')
    dispatch(logoutRequestAction({ navigate }))
  }

  const menu = (
    <>
      <Menu>
        <Menu.Item>
          <Link to="/my/profile">
            <p>마이페이지</p>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/my/articleList">
            <p>내 글 목록</p>
          </Link>
        </Menu.Item>
        <Menu.Item>
          <p onClick={onLogOut}>로그아웃</p>
        </Menu.Item>
      </Menu>
    </>
  )

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
          <Space align="center">
            <StyledTitle level={5} onClick={() => navigate('/')}>
              지금 나의 하루는
            </StyledTitle>
          </Space>
        </Col>
        <Col span={16}>
          <Space align="center">
            {me && (
              <>
                <StyledLink to="/search">
                  <strong>둘러보기</strong>
                </StyledLink>
              </>
            )}
          </Space>
        </Col>

        <Col span={4}>
          {me ? (
            <Space align="center" size="middle">
              <Avatar
                icon={me.image === undefined ? <UserOutlined /> : <img src={me.image}></img>}
              />
              <Dropdown overlay={menu} trigger={['click']}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {me.userId}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Space>
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
