import { Spin } from 'antd'
import React, { useRef, useState } from 'react'

function ImageFileInput({ imageUploader, onFileChange, file, data }) {
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
    <div>
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
          style={{ backgroundColor: '#ffff', border: 'none', cursor: 'pointer' }}
          onClick={onButtonClick}>
          <img src={file.fileURL || fileURL} alt="img" width="150px" />
        </button>
      )}
      {loading && (
        <div>
          <Spin size="large" tip="Loading..." />,
        </div>
      )}
    </div>
  )
}

export default ImageFileInput
