import React, { useEffect, useState } from 'react'
import { getAxios } from '../../api'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useNavigate } from 'react-router'
import { Button, Modal } from 'antd'
import UpdateComments from './UpdateComments'
import AntComment from './AntComment'
const CommentContent = styled.div`
  overflow: auto;
  max-height: 80vh;
`
const CommentPlace = styled.div``
let CommentSize = styled.p`
  font-size: medium;
`
const ReadComments = styled.div``
const WriteComment = styled.textarea`
  min-height: 70px;
  resize: none;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5px;
`
const ReadComment = styled.div`
    display: flex;
    width: 100%
    margin-bottom: 5%;
    margin-top: 5%;

`
const EnrollButton = styled.div`
  margin-left: 82%;
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
      .get(`diary/read/${dno}`, { params: { userId: me.userId } })
      .then((res) => {
        console.log(res)
        setComments([...res.data.comments])
        console.log(res.data.comments)
        // setComments(res.data.comments.content)
        // res.data.comments.map((a) => {
        //   return a
        // }),

        console.log(comments.nickname)
      })
      .catch((err) => {
        alert('잘못된 접근입니다')
        // navigate('/')
      })
  }

  useEffect(() => {
    getComment()
  }, [])
  return (
    <StyledBackground>
      <ReadComment>
        <WriteComment
          placeholder="댓글을 입력해주세요"
          value={comment}
          onChange={(e) => {
            setComment(e.target.value)
          }}></WriteComment>
      </ReadComment>
      <EnrollButton>
        <Button
          variant="dark"
          size="sm"
          onClick={(e) => {
            createComment()
          }}>
          등록
        </Button>
      </EnrollButton>

      <CommentContent>
        <ReadComments>
          {comments.map((a) => {
            return (
              <UpdateComments
                key={a.cno}
                cno={a.cno}
                id={a.userId}
                profileImage={a.profileImage}
                nickname={a.nickname}
                content={a.content}
                createdat={a.createdat}
                getComment={getComment}></UpdateComments>
            )
          })}
        </ReadComments>
      </CommentContent>
      {/* <AntComment></AntComment> */}
    </StyledBackground>
  )
}

const StyledBackground = styled.div`
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
`

export default Comment
