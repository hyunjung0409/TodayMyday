import React, { useEffect, useState } from 'react'
import { Image } from 'antd'
import { useSelector } from 'react-redux'
import ArticleForm from '../components/ArticleForm'
import ImageUploader from '../service/image_uploader'
import { getAxios } from '../api'
import { useParams } from 'react-router-dom'

function ModifyDiary() {
  const axios = getAxios()
  const { me } = useSelector((state) => state.user)
  const { dno } = useParams()
  const [data, setData] = useState({
    word: '',
    message: '',
    fileURL: '',
  })

  const match = async () => {
    let result = await axios.get(`/diary/read/${dno}`)
    console.log('result: ', result)
    setData({
      word: result.data.word,
      message: result.data.content,
      fileURL: result.data.image,
    })
  }

  useEffect(() => {
    match()
  }, [])

  return (
    <div>
      <ArticleForm imageUploader={ImageUploader} data={data} />
    </div>
  )
}

export default ModifyDiary
