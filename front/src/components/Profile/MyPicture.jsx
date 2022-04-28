import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ConsoleSqlOutlined, EditOutlined } from '@ant-design/icons'
import { getAxios } from '../../api'
import ImageFileInput from '../ImageFileInput'
import './MyPicture.css'
import { useSelector } from 'react-redux'
import { Form, Button, Modal } from 'antd'

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
  const [form] = Form.useForm()
  const axios = getAxios()

  const [file2, setFile2] = useState({ fileName: null, fileURL: null })
  const formRef = useRef()

  const onFileChange = (file2) => {
    setFile2({
      fileName: file2.name,
      fileURL: file2.url,
    })
  }

  // const onSubmit = (event) => {
  //   event.preventDefault()
  //   const data = {
  //     image: file2.fileURL || '',
  //   }
  //   axios
  //     .post(`dairy/${me.userId}`, data)
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  //   formRef.current.reset()
  // }
  // console.log(file2, '확인')
  const onFinish = async (values) => {
    const axios = getAxios()
    me !== null &&
      me.userId !== null &&
      (await axios.put(
        'user/modify',
        { image: values.image },
        { params: { userId: me.userId } },
        // userId: me.userId,
        // values.ageRange,
      ))
  }
  const success = () => {
    Modal.success({
      content: '회원정보 수정이 완료되었습니다.',
      // onOk: handleMove,
    })
  }
  // console.log(file2.fileURL)
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

  // const imageInput = useRef()
  // const onClickImageUpload = () => {
  //   imageInput.current.click()
  // }
  useEffect(() => {
    try {
      setFile2({ fileName: me.name, fileURL: me.image })
    } catch (err) {
      console.log(err)
    }
  }, [])
  return (
    <div>
      <Form form={form} name="modify" onFinish={onFinish} autoComplete="off" layout="vertical">
        <Form.Item>
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
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" onClick={success}>
            등록
          </Button>
        </Form.Item>
      </Form>

      {/* <EditOutlined onClick={onClickImageUpload}></EditOutlined> */}
    </div>
  )
}
export default MyPicture
