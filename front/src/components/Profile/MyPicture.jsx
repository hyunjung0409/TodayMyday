import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { EditOutlined } from '@ant-design/icons'
import { getAxios } from '../../api'
import ImageFileInput from '../ImageFileInput'
import './MyPicture.css'
import { useSelector } from 'react-redux'
import { Button } from 'antd'

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
const Submit = styled(Button)`
  margin-top: 10px;
`
function MyPicture({ imageUploader, data }) {
  const { me } = useSelector((state) => state.user)
  console.log(me)
  const axios = getAxios()

  const [file2, setFile2] = useState({ fileName: null, fileURL: null })
  const formRef = useRef()

  const onFileChange = (file2) => {
    setFile2({
      fileName: file2.name,
      fileURL: file2.url,
    })
    console.log(file2)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    const data = {
      image: file2.fileURL || '',
    }
    axios
      .post(`dairy/${me.userId}`, data)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    formRef.current.reset()
  }
  // const formRef = useRef()

  // const onSubmit = (event) => {
  //   event.preventDefault()
  //   const data = {
  //     id: Date.now(), // uuid
  //     fileName: file2.fileName || '',
  //     fileURL: file2.fileURL || '',
  //   }
  //   formRef.current.reset()
  // }
  // const onLoadFile = (e) => {
  //   const file = e.target.files[0]
  //   setFiles(file)
  // }
  // const preview = () => {
  //   let profile_image = null
  //   const imgEl = document.querySelector('.img__box')
  //   const reader = new FileReader()
  //   if (file !== '') {
  //     profile_image = <img className="profile_image" src={file}></img>
  //   }
  //   reader.onload = () => (imgEl.style.backgroundImage = `url(${reader.result})`)
  //   reader.readAsDataURL(file)
  // }

  const imageInput = useRef()
  const onClickImageUpload = () => {
    imageInput.current.click()
  }
  useEffect(() => {
    try {
      setFile2({ fileName: me.name, fileURL: me.image })
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <div>
      <div className="MyPic">
        <ImageFileInput
          name={file2.fileName}
          imageUploader={imageUploader}
          onFileChange={onFileChange}
          file={file2}
          // form={form}
          data={data}
          setFile={setFile2}
          className="profileImage"
        />
      </div>{' '}
      <Submit type="primary" onClick={onSubmit}>
        등록
      </Submit>
      <EditOutlined onClick={onClickImageUpload}></EditOutlined>
    </div>
  )
}
export default MyPicture
