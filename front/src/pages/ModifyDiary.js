import React, { useEffect, useState } from 'react'
import ImageUploader from '../service/image_uploader'
import { getAxios } from '../api'
import { useParams } from 'react-router-dom'
import ModifyForm from '../components/ModifyDiary/ModifyForm'

const imageUploader = new ImageUploader()

function ModifyDiary() {
  const axios = getAxios()
  const { dno } = useParams()
  const [data, setData] = useState({
    word: '',
    content: '',
    fileURL: '',
  })

  const match = async () => {
    try {
      let result = await axios.get(`/diary/read/${dno}`)
      console.log('result: ', result)
      setData({
        word: result.data.word,
        content: result.data.content,
        fileURL: result.data.image,
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    match()
    console.log(data)
  }, [])

  return (
    <div>
      <ModifyForm imageUploader={imageUploader} data={data} />
    </div>
  )
}

export default ModifyDiary
