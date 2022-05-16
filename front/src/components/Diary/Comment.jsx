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
const ReadComments = styled.div``
const WriteComment = styled.textarea`
  min-height: 70px;
  resize: none;
`
const ReadComment = styled.div`
    display: flex;
    width: 100%
    margin-top: 5%;
    margin-bottom: 5%;

`
function Comment() {
  const { cno } = useParams()
  const { dno } = useParams()

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
  const createComment = () => {
    const axios = getAxios()

    if (comment == '') {
      alert('댓글을 입력하세요')
    } else if (comment !== '') {
      axios
        .post('comment', { content: comment, userId: me.userId }, { params: { dno: dno } })
        .then((res) => {
          setComment('')
          getComment()
        })
    }
  }
  const getComment = async () => {
    const axios = getAxios()

    axios
      .get('comment/readAll', { params: { userId: me.userId } })
      .then((res) => {
        console.log(res)
        setComments(res.data.content)
      })
      .catch((err) => {
        alert('잘못된 접근입니다')
        // navigate('/')
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
  return (
    <div>
      <ReadComment>
        <WriteComment
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}></WriteComment>
        <Button
          variant="dark"
          size="sm"
          onClick={(e) => {
            createComment()
          }}>
          등록
        </Button>
      </ReadComment>
      <ReadComments>
        {comments.map((a) => {
          return <Comment key={a.comment_id} content={a.content} getComment={getComment}></Comment>
        })}
      </ReadComments>

      {editable === false ? (
        <div>
          {/* <CommentSize>{comment}</CommentSize> */}

          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              setEditable(!editable)
            }}>
            수정
          </Button>

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
      ) : (
        <div>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
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
        </div>
      )}
    </div>
  )
}
export default Comment
