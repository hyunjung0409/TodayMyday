import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import { getAxios } from '../../api'
import ImageFileInput from '../ImageFileInput'
import './MyPicture.css'
// const MyPic = styled.div`
//   margin-left: auto;
//   margin-right: auto;
//   width: 250px;
//   height: 250px;
//   border-radius: 50%;
//   border: solid;
//   overflow: hidden;
//   position: relative;
// `
function MyPicture({ imageUploader, form }) {
  const [file2, setFile2] = useState({ fileName: null, fileURL: null })
  const onFileChange = (file2) => {
    setFile2({
      fileName: file2.name,
      fileURL: file2.url,
    })
  }
  const formRef = useRef()

  const onSubmit = (event) => {
    event.preventDefault()
    const data = {
      id: Date.now(), // uuid
      fileName: file2.fileName || '',
      fileURL: file2.fileURL || '',
    }
    formRef.current.reset()
    console.log(data)
  }
  let [file, setFiles] = useState('')
  const onLoadFile = (e) => {
    const file = e.target.files[0]
    setFiles(file)
  }
  console.log(file2)
  const preview = () => {
    let profile_image = null
    const imgEl = document.querySelector('.img__box')
    const reader = new FileReader()
    if (file !== '') {
      profile_image = <img className="profile_image" src={file}></img>
    }
    reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`)
    reader.readAsDataURL(file)
  }

  console.log(file)
  const imageInput = useRef()
  const onClickImageUpload = () => {
    imageInput.current.click()
  }

  // const axios = getAxios()

  // const getPic = async () => {
  //   await axios.get(`/api/user/read/{userId}`, {
  //     pic: image,
  //   })
  // }
  return (
    <div>
      <div className="MyPic">
        <ImageFileInput
          name={file2.fileName}
          imageUploader={imageUploader}
          onFileChange={onFileChange}
          file={file2}
          form={form}
          setFile={setFile2}
          className="profileImage"
        />
      </div>{' '}
      <EditOutlined onClick={onClickImageUpload}></EditOutlined>
    </div>
  )
}
export default MyPicture
