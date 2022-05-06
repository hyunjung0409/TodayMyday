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
      <div className="search-bar" style={{ margin: '2rem 0 3rem 0' }}>
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
        <div
          className="diary-carousel-written"
          style={{ background: '#FFDAE5', margin: '1rem auto', width: '90%' }}>
          <h3
            style={{
              textAlign: 'left',
              padding: '1.5rem 1rem 1rem 1rem',
              marginLeft: '1.2rem',
            }}>
            '{keyword}' {optionBool === false ? '단어가 주제로 쓰여진 글' : '단어가 포함된 글'}
          </h3>
          <DiaryCarousel diaryList={diaryList} setDiaryList={setDiaryList} />
        </div>
      )}
    </div>
  )
}

export default Search
