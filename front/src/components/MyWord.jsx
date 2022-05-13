import { Card, Modal, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getAxios } from '../api'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useNavigate } from 'react-router-dom'

function MyWord({ test, data, setWord, word }) {
  const { me } = useSelector((state) => state.user)
  const axios = getAxios()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [diary, setDiary] = useState(null)
  const [title, setTitle] = useState(null)
  const navigate = useNavigate()
  const color = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }

  useEffect(() => {
    setWord(test)
  }, [test])

  const showModal = (item) => {
    console.log('item', item)
    setTitle(item)
    axios.get(`/diary/searchword`, { params: { userId: me.userId, word: item } }).then((res) => {
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

  const pageMove = (dno, e) => {
    navigate(`/diary/read/${dno}`)
  }

  return (
    <div>
      {word != null &&
        word.map((item, idx) => (
          <Tag
            style={{ marginBottom: '5px', cursor: 'pointer' }}
            key={idx}
            color={color[Math.floor(Math.random() * color.length)]}
            onClick={(e) => {
              showModal(item, e)
            }}>
            {item}
          </Tag>
        ))}
      {title != null && (
        <Modal
          title={title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          width={1000}>
          <Slider {...settings}>
            {diary != null &&
              diary.map((item, idx) => (
                <Card
                  hoverable
                  key={idx}
                  onClick={(e) => {
                    pageMove(item.dno, e)
                  }}>
                  <div className="card-top">
                    <img src={item.image} alt="img" width={150} />
                  </div>
                  <div className="card-bottom">
                    <img
                      style={{ float: 'left', borderRadius: '50%', width: '30px', height: '30px' }}
                      src={me.image}
                      alt="img"
                    />
                    <p style={{ float: 'left' }}>{item.nickname}</p>
                  </div>
                </Card>
              ))}
          </Slider>
        </Modal>
      )}
    </div>
  )
}

export default MyWord
