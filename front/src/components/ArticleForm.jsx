import styled from 'styled-components'
import { Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageFileInput from '../components/ImageFileInput'
import { articleAddRequestAction } from '../reducers/article'

const Word = styled.h1`
  margin: 10px auto;
  width: 150px;
  background-color: #ffff;
`

const ImageLayout = styled.div`
  margin-right: 10px;
  background-color: #ffff;
  height: 30vh;
`
const WritingLayout = styled.div`
  border: 1px solid red;
  background-color: #ffff;
  height: 150px;
`

const Submit = styled(Button)`
  margin-top: 10px;
`

function ArticleForm({ imageUploader, data }) {
  const { me } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const formRef = useRef()
  const messageRef = useRef()
  const [file, setFile] = useState({ fileName: null, fileURL: null })
  const { word, message, fileURL } = data
  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const data = {
      content: messageRef.current.value || '',
      word: word,
      image: file.fileURL || fileURL,
    }
    dispatch(articleAddRequestAction({ userId: me.userId, data, navigate }))
    formRef.current.reset()
  }

  return (
    <form
      ref={formRef}
      style={{ width: '80%', margin: '0 auto', backgroundColor: '#EEA7BB', padding: '20px' }}>
      <Word>{word}</Word>
      <Row>
        <Col span={8}>
          <ImageLayout>
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: '#fff',
                border: 'none',
              }}>
              <ImageFileInput
                name={file.fileName}
                imageUploader={imageUploader}
                onFileChange={onFileChange}
                file={file}
                data={data}
                setFile={setFile}
              />
            </div>
          </ImageLayout>
        </Col>
        <Col span={16}>
          <WritingLayout>
            <textarea ref={messageRef} name="message" placeholder={message}></textarea>
          </WritingLayout>
        </Col>
      </Row>
      <Submit type="primary" onClick={onSubmit}>
        등록
      </Submit>
    </form>
  )
}

export default ArticleForm
