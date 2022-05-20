import React, { useEffect } from 'react'
import './App.css'
import { Layout } from 'antd'
import styled from 'styled-components'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from './pages/Main'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Search from './pages/Search'
import Navbar from './components/Layout/Navbar'
import Article from './pages/Article'
import ArticleList from './pages/ArticleList'
import Profile from './pages/Profile'
import ReadDiary from './pages/ReadDiary'
import ModifyDiary from './pages/ModifyDiary'
import jwt_decode from 'jwt-decode'
import { useDispatch } from 'react-redux'
import { loadUserRequestAction } from './reducers/user'
import Landing from './pages/Landing'
const { Content, Footer } = Layout

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('jwtToken') != null) {
      const decode_token = jwt_decode(localStorage.getItem('jwtToken'))
      const userId = decode_token.sub
      dispatch(loadUserRequestAction({ userId }))
    }
  }, [])

  return (
    <Layout className="layout">
      <BrowserRouter>
        <Navbar />
        <StyledContent>
          <div className="App">
            <StyledContentArea>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/main" element={<Main />} />
                <Route path="/user/login" element={<Login />} />
                <Route path="/user/signup" element={<Signup />} />
                <Route path="/search" element={<Search />} />
                <Route path="/my/article" element={<Article />} />
                <Route path="/my/articleList" element={<ArticleList />} />
                <Route path="/my/profile" element={<Profile />} />
                <Route path="/diary/read/:dno" element={<ReadDiary />} />
                <Route path="/diary/modify/:dno" element={<ModifyDiary />} />
              </Routes>
            </StyledContentArea>
          </div>
        </StyledContent>
        <Footer style={{ background: '#C1E17D', textAlign: 'center' }}>
          지금 나의 하루는 ©2022 Created by Ginny-us{' '}
        </Footer>
      </BrowserRouter>
    </Layout>
  )
}

const StyledContent = styled(Content)`
  margin-top: 2rem;
  padding: 3rem;
  // border: 1px solid red;
  background-image: url('/images/background.PNG');
`

const StyledContentArea = styled.div`
  min-height: 80vh;
  padding: 1rem;
  // background: rgba(200, 200, 200, 0.5);
  background: #fff;
`

export default App