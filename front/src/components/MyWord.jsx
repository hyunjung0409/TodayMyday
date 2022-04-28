import { Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAxios } from '../api'

function MyWord(props) {
  const { me } = useSelector((state) => state.user)
  const [word, setWord] = useState(null)
  const axios = getAxios()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [diary, setDiary] = useState(null)

  useEffect(() => {
    me !== null &&
      axios.get(`/diary/myword`, { params: { userId: me.userId } }).then((res) => {
        console.log(res)
        setWord(res.data)
      })
  }, [me])

  const showModal = (item) => {
    console.log(item)
    axios.get(`/diary/searchword`, { params: { userId: me.userId, word: item } }).then((res) => {
      console.log(res.data)
      setDiary(res.data)
    })
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <div>
      {word != null &&
        word.map((item, idx) => (
          <div
            style={{
              width: '60px',
              height: '30px',
              textAlign: 'center',
              float: 'left',
            }}>
            <div
              key={idx}
              onClick={(e) => {
                showModal(item, e)
              }}>
              {item}
            </div>
          </div>
        ))}
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {diary != null && diary.map((item, idx) => <div key={idx}>{item.content}</div>)}
      </Modal>
    </div>
  )
}

export default MyWord
