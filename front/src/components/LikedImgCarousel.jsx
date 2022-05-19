import React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { Card } from 'antd'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

function LikedImgCarousel({ liked }) {
  const navigate = useNavigate()
  const NextArrow = ({ onClick }) => {
    return (
      <div className="arrow next" onClick={onClick}>
        <FaArrowRight />
      </div>
    )
  }

  const PrevArrow = ({ onClick }) => {
    return (
      <div className="arrow prev" onClick={onClick}>
        <FaArrowLeft />
      </div>
    )
  }

  const [ImageIndex, setImageIndex] = useState(0)

  const settings = {
    infinite: true,
    lazyload: true,
    speed: 300,
    slidesToShow: 3,
    centerMode: true,
    centerPadding: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    beforeChange: (current, next) => setImageIndex(next),
  }

  const pageMove = (dno, e) => {
    navigate(`/diary/read/${dno}`)
  }

  return (
    <>
      <div className="Carousel">
        <h2>좋아요 top5</h2>
        <Slider {...settings}>
          {liked.map((item, idx) => (
            <div key={idx} className={idx === ImageIndex ? 'slide activeSlide' : 'slide'}>
              <Card
                style={{ width: '200px' }}
                hoverable
                onClick={(e) => {
                  pageMove(item.dno, e)
                }}>
                <div style={{ marginBottom: '10px' }}>{idx + 1}</div>
                <div style={{ marginBottom: '10px' }}>
                  <img style={{ width: '150px' }} src={item.image} alt={item.image} />
                </div>
                <h3 style={{ fontWeight: 'bold' }}>#{item.word}</h3>
                <span style={{ margin: '10px' }}>
                  <HeartFilled /> {item.liked}
                </span>
                <span style={{ margin: '10px' }}>
                  <EyeFilled /> {item.view}
                </span>
                <span style={{ margin: '10px' }}>
                  <MessageFilled /> {item.comments.length}
                </span>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default LikedImgCarousel
