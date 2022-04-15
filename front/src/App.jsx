import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import './App.css';
import Writing from './pages/Writing';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/user/login" element={<Login />} />
          <Route path="/user/Writing" element={<Writing />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
