import React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { Card } from 'antd'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'

function ViewImgCarousel({ view }) {
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

  return (
    <>
      <div className="Carousel">
        <h2>조회수 top5</h2>
        <Slider {...settings}>
          {view.map((item, idx) => (
            <div key={idx} className={idx === ImageIndex ? 'slide activeSlide' : 'slide'}>
              <Card style={{ width: '200px' }} hoverable>
                <div style={{ marginBottom: '10px' }}>{idx + 1}</div>
                <div style={{ marginBottom: '10px' }}>
                  <img style={{ width: '150px' }} src={item.image} alt={item.image} />
                </div>
                <h3 style={{ fontWeight: 'bold' }}>#{item.word}</h3>
                <span style={{ margin: '10px' }}>
                  <EyeFilled /> {item.view}
                </span>
                <span style={{ margin: '10px' }}>
                  <HeartFilled /> {item.liked}
                </span>
                <span style={{ margin: '10px' }}>
                  <MessageFilled /> 0
                </span>
              </Card>
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default ViewImgCarousel
