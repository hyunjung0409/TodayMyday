import DiaryCarousel from './DiaryCarousel'

function SearchResult({ keyword, diaryList, setDiaryList }) {
  return (
    <div
      className="diary-carousel-written"
      style={{
        background: '#FFDAE5',
        margin: '1rem auto',
        width: '90%',
        borderRadius: '3px',
        border: '1px solid rgba(50, 50, 50, 0.1)',
      }}>
      <h2
        style={{
          textAlign: 'left',
          padding: '0.5em 0 0.2em 1em',
          color: '#424242',
        }}>
        {/* '{keyword}' {optionBool === false ? '단어가 주제로 쓰여진 글' : '단어가 포함된 글'} */}
        <strong>#{keyword}</strong>
      </h2>
      <DiaryCarousel diaryList={diaryList} setDiaryList={setDiaryList} />
    </div>
  )
}

export default SearchResult
