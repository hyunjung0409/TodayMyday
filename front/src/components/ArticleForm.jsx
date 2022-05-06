import styled from 'styled-components'
import { Row, Col, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageFileInput from '../components/ImageFileInput'
import { articleAddRequestAction } from '../reducers/article'
import ImageArticle from './ImageArticle'

const ImageLayout = styled.div`
  width: 450px;
  display: inline-block;
  background-color: #ffff;
  border-radius: 20px;
  margin-top: 80px;
`

const Submit = styled(Button)`
  &&& {
    background-color: #e86f8b;
    border: 0px solid;
  }
  margin: 5px;
`

const Wrapper = styled.div`
  display: inline-block;
`
const Letter = styled.div`
  width: 80rem;
`

const Side = styled.div`
  vertical-align: middle;
  height: 8rem;
  background-color: #fcfcf8;
  border-radius: 30px;
  outline: 1px solid transparent;
  &:nth-of-type(1) {
    padding: 2rem 2rem 0;
    box-shadow: inset 0 0.75rem 2rem rgba(229, 225, 187, 0.5);
    height: 100%;
  }
  &.side:nth-of-type(2) {
    padding: 2rem;
    border-radius: 0 0 1rem 1rem;
    box-shadow: 0 0.3rem 0.3rem rgba(0, 0, 0, 0.05), inset 0 -0.57rem 2rem rgba(229, 225, 187, 0.5);
    text-align: right;
    height: 100%;
  }
`

const TitleWord = styled.h1`
  font-size: 2rem;
  font-family: 'Dancing Script';
`

const MyTextarea = styled.textarea`
  line-height: 1.5rem;
  margin-bottom: 2rem;
  border: 0;
  outline: none;
  font-family: inherit;
  appearance: none;
  color: #4e5e72;
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgb(229, 225, 187)' x='0' y='23' width='10' height='1'/></svg>");
  width: 100%;
  height: 20rem;
  resize: none;
  &:focus {
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgba(78, 94, 114, 0.3)' x='0' y='23' width='10' height='1'/></svg>");
    outline: none;
  }
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
      style={{
        textAlign: 'center',
        width: '100%',
        height: '80vh',
        margin: '0 auto',
        padding: '20px',
      }}>
      <Wrapper>
        <Letter>
          <Side>
            <Row>
              <Col span={12}>
                <ImageLayout>
                  <ImageArticle
                    name={file.fileName}
                    imageUploader={imageUploader}
                    onFileChange={onFileChange}
                    file={file}
                    data={data}
                    setFile={setFile}
                  />
                </ImageLayout>
              </Col>
              <Col span={12}>
                <TitleWord>{word}</TitleWord>
                {/* <textarea ref={messageRef} name="message" placeholder={message}></textarea> */}
                <MyTextarea ref={messageRef} placeholder="Your message"></MyTextarea>
                <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                  <Submit type="primary" onClick={onSubmit}>
                    등록
                  </Submit>
                </div>
              </Col>
            </Row>
          </Side>
        </Letter>
      </Wrapper>
    </form>
  )
}

export default ArticleForm
