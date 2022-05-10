import React, { useEffect } from 'react'
import { useState } from 'react'
import Slider from 'react-slick'
import test1 from '../assets/1.jpg'
import test2 from '../assets/2.jpg'
import test3 from '../assets/3.jpg'
import test4 from '../assets/4.jpg'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'
import { getAxios } from '../api'

const images = [test1, test2, test3, test4]

function ImageCarousel(props) {
  const axios = getAxios()
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

  useEffect(() => {}, [])

  return (
    <div className="Carousel">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className={idx === ImageIndex ? 'slide activeSlide' : 'slide'}>
            <img src={img} alt={img} />
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ImageCarousel
