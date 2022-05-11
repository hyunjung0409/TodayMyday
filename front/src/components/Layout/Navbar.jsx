import React, { useEffect, useState } from 'react'
import { Layout, Typography, Row, Col, Menu, Dropdown, Space, Avatar, Modal, Button } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadUserRequestAction, logoutRequestAction } from '../../reducers/user'
import jwt_decode from 'jwt-decode'
import LoginForm from '../LoginForm'
import Item from 'antd/lib/list/Item'

const { Header } = Layout
const { Title } = Typography

function Navbar() {
  const navigate = useNavigate()
  const { me } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const onLogOut = () => {
    dispatch(logoutRequestAction({ navigate, setIsModalVisible }))
  }

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const menu = (
    <>
      <Menu>
        <Menu.Item key="profile">
          <Link to="/my/profile">
            <StyledParagraph>마이페이지</StyledParagraph>
          </Link>
        </Menu.Item>
        <Menu.Item key="articleList">
          <Link to="/my/articleList">
            <StyledParagraph>내 글 목록</StyledParagraph>
          </Link>
        </Menu.Item>
        <Menu.Item key="logout">
          <StyledParagraph onClick={onLogOut}>로그아웃</StyledParagraph>
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
    <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: '#C1E17D' }}>
      <Row justify="start">
        <Col span={4}>
          <Space align="center">
            <img
              src={process.env.PUBLIC_URL + '/images/logo.png'}
              onClick={() => navigate('/')}
              style={{
                width: '130px',
                height: '60px',
                objectFit: 'cover',
                marginTop: '-0.4rem',
              }}
            />
          </Space>
        </Col>
        <Col span={16}>
          <Space align="center">
            {me && (
              <>
                <StyledLink to="/main">
                  <strong>글 작성</strong>
                </StyledLink>
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
                <StyledAnchor onClick={(e) => e.preventDefault()}>
                  <Space>
                    {me.nickname}
                    <DownOutlined />
                  </Space>
                </StyledAnchor>
              </Dropdown>
            </Space>
          ) : (
            <nav className="nav-user">
              <StyledLink to="" onClick={showModal}>
                <strong>로그인</strong>
              </StyledLink>
              <Modal
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                width={350}
                footer={null}>
                <LoginForm />
              </Modal>
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

const StyledLink = styled(Link)`
  color: #38532e;
  padding: 0 1rem;
  &:hover {
    color: #0a1e00;
  }
`

const StyledAnchor = styled.a`
  color: #38532e;
  &:hover {
    color: #0a1e00;
  }
`

const StyledParagraph = styled.p`
  color: #38532e;
  &:hover {
    color: #0a1e00;
  }
`

export default Navbar
