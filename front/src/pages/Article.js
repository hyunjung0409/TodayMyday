import React, { useState } from 'react'
import ArticleForm from '../components/ArticleForm'
import ImageUploader from '../service/image_uploader'
import { useLocation } from 'react-router-dom'

const imageUploader = new ImageUploader()

function Writing() {
  const [data, setData] = useState({
    word: '산',
    message: '',
    fileURL: '/images/기본이미지.jpg',
  })
  const { state } = useLocation()
  console.log(state)

  return (
    <div>
      <ArticleForm imageUploader={imageUploader} data={data} state={state} />
    </div>
  )
}

export default Writing
