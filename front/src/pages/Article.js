import React, { useState } from 'react'
import ArticleForm from '../components/ArticleForm'
import ImageUploader from '../service/image_uploader'

const imageUploader = new ImageUploader()

function Writing() {
  const [data, setForm] = useState({
    word: '바다',
    message: '',
    fileURL: '/images/기본이미지.jpg',
  })

  return (
    <div>
      <ArticleForm imageUploader={imageUploader} data={data} />
    </div>
  )
}

export default Writing
