import { useState } from 'react'
import { Button, Modal } from 'antd'
import { useNavigate } from 'react-router-dom'
import { getAxios } from '../../api'
import { useSelector } from 'react-redux'

function DeleteAccount() {
  const { me } = useSelector((state) => state.user)

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
  }
  const getDelete = async () => {
    try {
      const axios = getAxios()
      let res = await axios.delete('user/delete', { params: { userId: me.userId } })
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
          localStorage.removeItem('jwtToken')
          navigate('/', { replace: true })
        }}
        onCancel={handleClose}>
        <p>회원탈퇴 하시겠습니까?</p>
      </Modal>
    </div>
  )
}

export default DeleteAccount
