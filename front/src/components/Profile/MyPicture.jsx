import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { ConsoleSqlOutlined, EditOutlined } from '@ant-design/icons'
import { getAxios } from '../../api'
import ImageFileInput from '../ImageFileInput'
import './MyPicture.css'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Modal, Avatar } from 'antd'
import { DownOutlined, UserOutlined } from '@ant-design/icons'
import { loadUserRequestAction } from '../../reducers/user'
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
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const [form] = Form.useForm()
  const axios = getAxios()

  const [file2, setFile2] = useState({ fileName: null, fileURL: null })
  const formRef = useRef()
  const [editable, setEditable] = useState(false)
  console.log(me)
  console.log(editable, 'true면 수정 가능 / false면 수정 불가능')
  const [loading, setLoading] = useState(false)
  const [isImage, setisImage] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const onFileChange = (file2) => {
    setFile2({
      fileName: file2.name,
      fileURL: file2.url,
    })
  }
  const [image, setImage] = useState({
    fileURL: '/images/기본사진.png',
  })
  const onFinish = async (values) => {
    const axios = getAxios()
    me !== null &&
      me.userId !== null &&
      file2.fileURL !== null &&
      (await axios.put(
        'user/modify',
        { image: file2.fileURL, age: me.age, gender: me.gender },
        { params: { userId: me.userId } },
      ))
    dispatch(loadUserRequestAction({ userId: me.userId }))
  }
  const onDelete = async (values) => {
    const axios = getAxios()
    me !== null &&
      me.userId !== null &&
      (await axios.put(
        'user/modify',
        { image: image.fileURL, age: me.age, gender: me.gender },
        { params: { userId: me.userId } },
      ))
    dispatch(loadUserRequestAction({ userId: me.userId }))
    setEditable(!editable)
  }
  const success = () => {
    Modal.success({
      content: '회원정보 수정이 완료되었습니다.',
      // onOk: handleMove,
    })
  }

  const loadMoreData = (userId) => {
    if (loading) {
      return
    }
    dispatch(loadUserRequestAction({ userId: me.userId }))
    setLoading(true)
  }
  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        loadMoreData(me.userId)
      }
    }
  }, [me])

  return (
    <div>
      {editable === false ? (
        <div>
          <Avatar size={260} icon={<img src={me !== null && me.image}></img>}></Avatar>

          <EditOutlined
            onClick={(e) => {
              setEditable(!editable)
            }}></EditOutlined>
        </div>
      ) : (
        <Form form={form} name="modify" onFinish={onFinish} autoComplete="off" layout="vertical">
          <Avatar
            size={260}
            icon={
              me.image !== null && (
                <ImageFileInput
                  name={file2.fileName}
                  imageUploader={imageUploader}
                  onFileChange={onFileChange}
                  file={file2}
                  // form={form}
                  data={data}
                  setFile={setFile2}
                />
              )
            }
          />{' '}
          <Form.Item>
            <Button type="danger" htmlType="submit" onClick={showModal}>
              삭제
            </Button>
            <Modal
              title="프로필 이미지 삭제"
              visible={isModalVisible}
              onOk={() => {
                onDelete()
                handleCancel()
              }}
              onCancel={handleCancel}>
              <p>삭제하시겠습니까?</p>
            </Modal>
            <Button type="primary" htmlType="submit" onClick={onFinish}>
              등록
            </Button>
            <EditOutlined
              onClick={(e) => {
                setEditable(!editable)
              }}></EditOutlined>{' '}
          </Form.Item>{' '}
        </Form>
      )}

      {/* <EditOutlined onClick={onClickImageUpload}></EditOutlined> */}
    </div>
  )
}
export default MyPicture
