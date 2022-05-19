import DiaryCarousel from './DiaryCarousel'
import { Row, Col, Button } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

function SearchResult({ keyword, diaryList, setDiaryList }) {
  const navigate = useNavigate()

  const onWrite = (word) => {
    navigate('/my/article', { state: word })
    console.log(word)
  }

  return (
    <div
      className="diary-carousel-written"
      style={{
        // background: '#FFF',
        background: '#FFDAE5',
        margin: '1rem auto',
        width: '90%',
        borderRadius: '3px',
        border: '1px solid rgba(50, 50, 50, 0.1)',
      }}>
      <Row justify="space-between" align="middle">
        <h2
          style={{
            textAlign: 'left',
            padding: '0.5em 0 0.2em 1em',
            color: '#424242',
          }}>
          {/* '{keyword}' {optionBool === false ? '단어가 주제로 쓰여진 글' : '단어가 포함된 글'} */}
          <strong>#{keyword}</strong>
        </h2>
        <Button
          type="text"
          icon={<EditOutlined />}
          style={{ marginRight: '1rem' }}
          onClick={(e) => onWrite(keyword)}>
          해당 단어로 글쓰기
        </Button>
      </Row>
      <DiaryCarousel diaryList={diaryList} setDiaryList={setDiaryList} />
    </div>
  )
}

export default SearchResult
