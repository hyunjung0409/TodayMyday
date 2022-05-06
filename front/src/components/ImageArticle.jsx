import { Spin } from 'antd'
import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const ImageLayout = styled.div`
  width: 450px;
  background-color: #fcfcf8;
`

function ImageArticle({ imageUploader, onFileChange, file, data }) {
  const { me } = useSelector((state) => state.user)

  const inputRef = useRef()
  const [loading, setLoading] = useState(false)
  const { fileURL } = data
  const onButtonClick = (e) => {
    e.preventDefault()
    inputRef.current.click()
  }

  const onChange = async (e) => {
    setLoading(true)
    const uploaded =
      e.target.files[0] !== undefined && (await imageUploader.upload(e.target.files[0]))
    setLoading(false)
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url,
    })
  }

  return (
    <ImageLayout>
      <input
        style={{ display: 'none' }}
        ref={inputRef}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />

      {!loading && (
        <button
          style={{ width: '100%', backgroundColor: '#fcfcf8', border: 'none', cursor: 'pointer' }}
          onClick={onButtonClick}>
          <img
            style={{ borderRadius: '20px' }}
            src={file.fileURL || fileURL || me.image}
            alt="img"
            width="100%"
          />
        </button>
      )}
      {loading && (
        <div style={{ width: '100%', textAlign: 'center', lineHeight: '250px' }}>
          <Spin size="large" tip="Loading..." />,
        </div>
      )}
    </ImageLayout>
  )
}

export default ImageArticle
