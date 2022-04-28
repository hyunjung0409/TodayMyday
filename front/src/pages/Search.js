import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DiaryCarousel from '../components/Diary/DiaryCarousel'
import SearchBar from '../components/Diary/SearchBar'

function Search() {
  const [optionBool, setOptionBool] = useState(false)
  const [option, setOption] = useState('word')
  const [keyword, setKeyword] = useState('')
  const [diaryList, setDiaryList] = useState([{}])
  const { me } = useSelector((state) => state.user)

  return (
    <div>
      <h3>SearchMy page</h3>
      <div className="search-bar">
        <SearchBar
          optionBool={optionBool}
          setOptionBool={setOptionBool}
          option={option}
          setOption={setOption}
          keyword={keyword}
          setKeyword={setKeyword}
          diaryList={diaryList}
          setDiaryList={setDiaryList}
          me={me}
        />
      </div>
      {keyword === '' ? (
        <div>검색어를 입력해주세요</div>
      ) : (
        <div className="diary-carousel-written" style={{ background: '#FFDAE5', margin: '1rem' }}>
          <h3 style={{ textAlign: 'left', padding: '1rem' }}>
            '{keyword}' {optionBool === false ? '단어가 주제로 쓰여진 글' : '단어가 포함된 글'}
          </h3>
          <DiaryCarousel diaryList={diaryList} setDiaryList={setDiaryList} />
        </div>
      )}
    </div>
  )
}

export default Search
