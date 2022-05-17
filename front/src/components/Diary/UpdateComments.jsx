import React, { useEffect, useState } from 'react'
import { getAxios } from '../../api'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Button, Modal } from 'antd'

let CommentContent = styled.div`
  display: flex;
  margin-bottom: 5%;
`
let CommentSize = styled.p`
  font-size: medium;
`
let DatePlace = styled.div`
  display: grid;
  justify-content: space-between;
  float: right;
`
let NamePlace = styled.div`
  margin-left: 100%;
`
const UpdateComments = (props) => {
  const { me } = useSelector((state) => state.user)

  const [commento, setCommento] = useState('')
  const { cno, content, getComment } = props
  const [editable, setEditable] = useState(false)

  const [show, setShow] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [showDone, setShowDone] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const updateComment = () => {
    const axios = getAxios()

    axios.put(`comment/${cno}`, { params: { userId: me.userId } })
    getComment()
  }
  const deleteComment = async (a) => {
    const axios = getAxios()
    console.log(a)
    await axios.delete(`comment/${a}`, { params: { userId: me.userId } })
    getComment()
  }
  useEffect(() => {
    setCommento(content)
  }, [])

  return editable === false ? (
    <div>
      <CommentSize>{commento}</CommentSize>
      <Button
        variant="secondary"
        size="sm"
        onClick={() => {
          setEditable(!editable)
        }}>
        수정
      </Button>{' '}
      <Button
        variant="danger"
        size="sm"
        onClick={() => {
          handleShow()
        }}>
        삭제
      </Button>
      <Modal
        title="댓글 삭제"
        visible={show}
        onOk={() => {
          deleteComment(props.cno)
          handleClose()
        }}
        onCancel={handleClose}>
        <p>삭제하시겠습니까?</p>
      </Modal>
      <hr />
    </div>
  ) : (
    <CommentContent>
      <input type="text" value={commento} onChange={(e) => setCommento(e.target.value)}></input>
      <Button
        variant="secondary"
        size="sm"
        onClick={(e) => {
          updateComment(props.cno)
          setEditable(!editable)
        }}>
        저장
      </Button>{' '}
      <Button
        variant="secondary"
        size="sm"
        onClick={(e) => {
          setEditable(!editable)
        }}>
        취소
      </Button>
    </CommentContent>
  )
}
export default UpdateComments
