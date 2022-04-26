import React, { useState } from 'react'
import DiaryCarousel from '../components/Diary/DiaryCarousel'
import SearchBar from '../components/SearchBar'

function SearchMy() {
  const [keyword, setKeyword] = useState('')
  const [diaryList, setDiaryList] = useState([{}])

  return (
    <div>
      <h3>SearchMy page</h3>
      <div className="search-bar">
        <SearchBar
          keyword={keyword}
          setKeyword={setKeyword}
          diaryList={diaryList}
          setDiaryList={setDiaryList}
        />
      </div>

      {/* <div className="diary-carousel-written" style={{ background: '#FFDAE5', margin: '1rem' }}>
        <h3 style={{ textAlign: 'left', padding: '1rem' }}>'{keyword}' 단어가 주제로 쓰여진 글</h3>
        <DiaryCarousel />
      </div> */}
      {keyword === '' ? (
        <div>검색어를 입력해주세요</div>
      ) : (
        <div className="diary-carousel-contained" style={{ background: '#FFDAE5', margin: '1rem' }}>
          <h3 style={{ textAlign: 'left', padding: '1rem' }}>'{keyword}' 단어가 포함된 글</h3>
          <DiaryCarousel diaryList={diaryList} setDiaryList={setDiaryList} />
        </div>
      )}
    </div>
  )
}

export default SearchMy
