import React, { useEffect, useState } from 'react'
import { getAxios } from '../../api'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Button, Modal, Avatar, Comment, Diver, Tooltip, Input } from 'antd'
import moment from 'moment'
import InfiniteScroll from 'react-infinite-scroll-component'

let CommentContent = styled.div`
  display: flex;
  margin-bottom: 5%;
`
let CommentSize = styled.p`
  font-size: medium;
  text-align: left;
  margin-left: 5%;
`
let DatePlace = styled.div`
  display: grid;
  justify-content: space-between;
  float: right;
`
let NamePlace = styled.div`
  margin-left: 100%;
`
const ButtonPlace = styled.div`
  margin-left: 75%;
`
const DeleteButton = styled.div`
  margin-left: 75%;
`

const UpdateComments = (props) => {
  const { me } = useSelector((state) => state.user)

  const [commento, setCommento] = useState('')
  const [newComment, setNewComment] = useState('')
  const { cno, content, createdat, getComment } = props
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
  const updateComment = async () => {
    const axios = getAxios()

    await axios.put(
      `comment/${cno}`,
      { content: newComment, createdat: createdat },
      { params: { userId: me.userId } },
    )
    setCommento(newComment)
  }
  const deleteComment = async (a) => {
    const axios = getAxios()
    console.log(a)
    await axios.delete(`comment/${a}`, { params: { userId: me.userId } })
    getComment()
  }
  useEffect(() => {
    setCommento(content)
    setNewComment(content)
  }, [])

  return editable === false ? (
    <div>
      {/* <CommentSize>{commento}</CommentSize> */}
      <CommentSize>
        <Comment
          avatar={<Avatar src={me.image} alt={me.nickname} />}
          author={me.nickname}
          content={commento}
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(createdat).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Tooltip>
          }></Comment>
      </CommentSize>
      <ButtonPlace>
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
      </ButtonPlace>

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
    </div>
  ) : (
    <div>
      <CommentSize>
        <Comment
          avatar={<Avatar src={me.image} alt={me.nickname} />}
          author={me.nickname}
          content={
            <Input
              type="text"
              style={{ width: '95%' }}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}></Input>
          }
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(createdat).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Tooltip>
          }></Comment>
      </CommentSize>
      <DeleteButton>
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
      </DeleteButton>
    </div>
  )
}
export default UpdateComments
