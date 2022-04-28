import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Row, Col, Button } from 'antd'
import ImageFileInput from '../../components/ImageFileInput'
import { useSelector } from 'react-redux'
import { message } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import { getAxios } from '../../api'

function ModifyForm({ imageUploader, data }) {
  const axios = getAxios()
  const navigate = useNavigate()
  const { me } = useSelector((state) => state.user)

  const formRef = useRef()
  const messageRef = useRef()
  const { word, content, fileURL } = data
  const [file, setFile] = useState({ fileName: null, fileURL: null })
  const [copyContent, setCopyContent] = useState('')
  const { dno } = useParams()

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    console.log(copyContent)
    try {
      axios.put(
        `diary/${dno}`,
        {
          word: word,
          content: copyContent === '' ? content : copyContent,
          image: file.fileURL === null ? fileURL : file.fileURL,
        },
        {
          params: { dno: dno, userId: me.userId },
        },
      )
      console.log('완료')
      // message.success('This is a success message')
      navigate(`/diary/read/${dno}`)
    } catch (err) {
      console.log(err)
    }
  }

  const onChange = (e) => {
    console.log('e.target.value: ', e.target.value)
    setCopyContent(e.target.value)
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
            <textarea
              ref={messageRef}
              name="message"
              defaultValue={content}
              onChange={onChange}></textarea>
          </WritingLayout>
        </Col>
      </Row>
      <Submit type="primary" onClick={onSubmit}>
        등록
      </Submit>
    </form>
  )
}

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

export default ModifyForm
