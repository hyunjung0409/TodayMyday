import React from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

function LikedImgCarousel({ images }) {
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
        <h2>좋아요</h2>
        <Slider {...settings}>
          {images.map((img, idx) => (
            <div key={idx} className={idx === ImageIndex ? 'slide activeSlide' : 'slide'}>
              <img src={img} alt={img} />
            </div>
          ))}
        </Slider>
      </div>
    </>
  )
}

export default LikedImgCarousel
