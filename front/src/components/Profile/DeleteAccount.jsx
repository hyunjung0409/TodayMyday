import { useState } from 'react'
import { Button, Modal, Space } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getAxios } from '../../api'

function DeleteAccount() {
  let navigate = useNavigate()
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [show, setShow] = useState(false)
  const [showDone, setShowDone] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const onClickDelete = async () => {
    await Modal.success({
      content: '회원탈퇴가 완료되었습니다.',
    })
    navigate('/', { replace: true })
  }
  const getDelete = async () => {
    try {
      const axios = getAxios()
      let res = await axios.delete('/user/delete')
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Button variant="danger" onClick={handleShow}>
        회원탈퇴
      </Button>

      <Modal
        title="회원탈퇴"
        visible={show}
        onOk={() => {
          handleClose()
          getDelete()
          onClickDelete()
          localStorage.removeItem('token')
        }}
        onCancel={handleClose}>
        <p>회원탈퇴 하시겠습니까?</p>
      </Modal>
    </div>
  )
}

export default DeleteAccount
