import React, { useState } from 'react'
import { getAxios } from '../../api'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { Button, Modal } from 'antd'
let CommentContent = styled.div`
  display: flex;
  margin-bottom: 5%;
`
const CommentPlace = styled.div``
let CommentSize = styled.p`
  font-size: medium;
`
function Comment() {
  const cno = useParams().cno
  const navigate = useNavigate()
  const { me } = useSelector((state) => state.user)
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [editable, setEditable] = useState(false)
  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }
  const writeComment = () => {
    const axios = getAxios()

    if (comment == '') {
      alert('댓글을 입력하세요')
    } else if (comment !== '') {
      axios.post('comment', { content: comment }, { params: { userId: me.userId } }).then((res) => {
        setComment('')
        getComment()
      })
    }
  }
  const getComment = async () => {
    const axios = getAxios()

    axios
      .get('comment/readAll')
      .then((res) => {
        setComments(res.data.body.success)
      })
      .catch((err) => {
        alert('잘못된 접근입니다')
        navigate('/')
      })
  }
  const updateComment = () => {
    const axios = getAxios()

    axios.put(`comment/${cno}`, { content: comment }, { params: { userId: me.userId } })
    setComment(comment)
  }
  const deleteComment = async () => {
    const axios = getAxios()

    await axios.delete(`comment/${cno}`, { params: { userId: me.userId } })
  }
  return editable === false ? (
      <div>
        <CommentSize>
            {comment}
        </CommentSize>
        <Button
        variant="secondary"
        size="sm"   
        onClick={() => {
        setEditable(!editable);
        }}>
        수정
        </Button>
        <Button
        variant="danger"
        size="sm" 
        onClick={()=>{
          handleShow();
      }}>삭제</Button>
      <Modal title='댓글 삭제' 
        visible={isModalVisible}
        onOk={() => {
            deleteComment()
            handleCancel()
        }}
        onCancle={handleCancel}>
        <p>삭제하시겠습니까?</p>
        </Modal>
        <Button
            type="primary"
            htmlType="submit"
            onClick={() => {
                updateComment()
            }}>
            등록
        </Button>
      </div>
  )
}
export default Comment
