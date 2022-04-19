import React, { useState } from 'react'
import DiaryCarousel from '../components/Diary/DiaryCarousel'
import SearchBar from '../components/SearchBar'

function SearchMy() {
  const [word, setWord] = useState('단어예시')

  return (
    <div>
      <h3>SearchMy page</h3>
      <div className="search-bar">
        <SearchBar />
      </div>

      <div className="diary-carousel-written" style={{ background: '#FFDAE5', margin: '1rem' }}>
        <h3 style={{ textAlign: 'left', padding: '1rem' }}>'{word}' 단어가 주제로 쓰여진 글</h3>
        <DiaryCarousel />
      </div>

      <div className="diary-carousel-contained" style={{ background: '#FFDAE5', margin: '1rem' }}>
        <h3 style={{ textAlign: 'left', padding: '1rem' }}>'{word}' 단어가 포함된 글</h3>
        <DiaryCarousel />
      </div>
    </div>
  )
}

export default SearchMy
