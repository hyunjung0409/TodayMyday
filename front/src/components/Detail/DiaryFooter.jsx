import React, { useState } from 'react'
import { Row, Col, Button, Space, Modal } from 'antd'
import styled from 'styled-components'
import { getAxios } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const axios = getAxios()

function DiaryFooter({ diary, dno }) {
  const { me } = useSelector((state) => state.user)
  const [isModalVisible, setIsModalVisible] = useState(false)

  const navigate = useNavigate()

  const handleModify = () => {
    navigate(`/diary/modify/${dno}`)
  }

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
    deleteDiary()
    success()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const deleteDiary = async () => {
    await axios.delete(`diary/${dno}`, {
      params: { dno: dno, userId: me.userId },
    })
  }

  const handleMove = () => {
    // navigate('/')
    navigate(-1)
  }

  const success = () => {
    Modal.success({
      content: '글 삭제가 완료되었습니다.',
      onOk: handleMove,
    })
  }

  return (
    <Row>
      <Col span={24}>
        <StyledContainer>
          {me.nickname === diary.nickname ? (
            <Space size="middle">
              <StyledPrimaryBtn type="text" onClick={handleModify}>
                수정
              </StyledPrimaryBtn>
              <StyledDangerBtn type="text" onClick={handleModify}>
                삭제
              </StyledDangerBtn>
              {/* <Button type="primary" onClick={handleModify}>
              수정
            </Button>
            <Button type="danger" onClick={showModal}>
              삭제
            </Button> */}
            </Space>
          ) : null}
        </StyledContainer>
        <Modal title="글 삭제" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
          <p>해당 글을 삭제하시겠습니까?</p>
        </Modal>
      </Col>
    </Row>
  )
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
`

const StyledPrimaryBtn = styled(Button)`
  span {
    color: #188fff;
  }
`
const StyledDangerBtn = styled(Button)`
  span {
    color: #ff4d4f;
  }
`

export default DiaryFooter
