import React, { useState } from 'react'
import { Row, Col, Button, Space, Modal } from 'antd'
import styled from 'styled-components'
import { getAxios } from '../../api'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const axios = getAxios()

function DiaryFooter({ dno }) {
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
    navigate('/')
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
          <Space size="middle">
            <Button type="primary" onClick={handleModify}>
              수정
            </Button>
            <Button type="danger" onClick={showModal}>
              삭제
            </Button>
          </Space>
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

export default DiaryFooter
