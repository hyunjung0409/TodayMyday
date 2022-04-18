import React, { useState } from 'react'
import WritingForm from '../components/WritingForm/WritingForm'
import ImageUploader from '../service/image_uploader'

const imageUploader = new ImageUploader()

function Writing() {
  const [form, setForm] = useState({
    word: '바다',
    message: '바다 가고 싶다~',
    fileURL: '/images/기본이미지.jpg',
  })

  return (
    <div>
      <WritingForm imageUploader={imageUploader} form={form} />
    </div>
  )
}

export default Writing
