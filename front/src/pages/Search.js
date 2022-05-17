import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import SearchBar from '../components/Diary/SearchBar'
import SearchResult from '../components/Diary/SearchResult'
import TopLiked from '../components/Diary/TopLiked'
import TopWord from '../components/Diary/TopWord'

function Search() {
  const [optionBool, setOptionBool] = useState(false)
  const [option, setOption] = useState('word')
  const [keyword, setKeyword] = useState('')
  const [diaryList, setDiaryList] = useState([{}])
  const { me } = useSelector((state) => state.user)

  console.log('diaryList: ', diaryList)

  return (
    <div>
      <div className="search-bar" style={{ margin: '2rem auto 3rem auto', width: '90%' }}>
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
        <div>
          <TopWord
            keyword={keyword}
            setKeyword={setKeyword}
            diaryList={diaryList}
            setDiaryList={setDiaryList}
          />
          <TopLiked />
        </div>
      ) : (
        <div>
          {diaryList.length === 0 ? (
            <div>'{keyword}'에 대한 검색결과가 없습니다.</div>
          ) : (
            <SearchResult keyword={keyword} diaryList={diaryList} setDiaryList={setDiaryList} />
          )}
        </div>
      )}
    </div>
  )
}

export default Search
