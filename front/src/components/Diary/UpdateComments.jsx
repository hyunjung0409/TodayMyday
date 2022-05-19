import React, { useEffect, useState } from 'react'
import { getAxios } from '../../api'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { Button, Modal, Avatar, Comment, Tooltip, Input } from 'antd'
import moment from 'moment'
import './Comment.css'
import { CloseCircleTwoTone } from '@ant-design/icons'

let CommentSize = styled.div`
  font-size: medium;
  text-align: left;
  margin-left: 5%;
  font-family: 'LeeSeoyun';
  font-size: 30px;
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
  const { cno, id, profileImage, nickname, content, createdat, getComment } = props
  const [editable, setEditable] = useState(false)

  const [show, setShow] = useState(false)

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const updateComment = async () => {
    const axios = getAxios()
    if (newComment === '') {
      alert('댓글을 입력하세요')
    } else if (newComment !== '') {
      await axios.put(
        `comment/${cno}`,
        { content: newComment, createdat: createdat },
        { params: { userId: me.userId } },
      )
      setCommento(newComment)
    }
  }
  const deleteComment = async (a) => {
    const axios = getAxios()
    await axios.delete(`comment/${a}`, { params: { userId: me.userId } })
    getComment()
  }
  useEffect(() => {
    setCommento(content)
    setNewComment(content)
  }, [])

  return editable === false ? (
    <div>
      <CommentSize>
        <Comment
          avatar={<Avatar src={profileImage} alt={nickname} />}
          author={nickname}
          content={commento}
          datetime={
            <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
              <span>{moment(createdat).format('YYYY-MM-DD HH:mm:ss')}</span>
            </Tooltip>
          }></Comment>
      </CommentSize>

      {me.userId === id ? (
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
      ) : (
        <ButtonPlace></ButtonPlace>
      )}

      <Modal
        title="댓글 삭제"
        visible={show}
        onOk={() => {
          deleteComment(props.cno)
          handleClose()
        }}
        okText="확인"
        closeIcon={<CloseCircleTwoTone />}
        okType="primary"
        cancelText="취소"
        onCancel={handleClose}>
        <p>해당 댓글을 삭제하시겠습니까?</p>
      </Modal>
    </div>
  ) : (
    <div>
      <CommentSize>
        <Comment
          avatar={<Avatar src={profileImage} alt={nickname} />}
          author={nickname}
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
      {me.userId === id ? (
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
      ) : (
        <DeleteButton></DeleteButton>
      )}
    </div>
  )
}
export default UpdateComments
