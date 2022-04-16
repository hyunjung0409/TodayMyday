import React, { useState } from 'react'
import DiaryCarousel from '../components/DiaryCarousel'
import SearchBar from '../components/SearchBar'

function SearchMy() {
  return (
    <div>
      <h3>SearchMy page</h3>
      <div className="search-bar">
        <SearchBar />
      </div>
      <DiaryCarousel />
    </div>
  )
}

export default SearchMy
