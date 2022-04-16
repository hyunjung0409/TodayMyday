import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import DiaryCard from './DiaryCard'

function onChange(a, b, c) {
  console.log(a, b, c)
}

const contentStyle = {
  height: '300px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
}

function DiaryCarousel() {
  return (
    <Carousel afterChange={onChange}>
      <div className="carousel-1">
        <h3>1</h3>
        <StyledCardlArea>
          <DiaryCard />
          <DiaryCard />
          <DiaryCard />
          <DiaryCard />
          <DiaryCard />
        </StyledCardlArea>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  )
}

const StyledCarouselArea = styled.div`
  height: '500px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
`

const StyledCardlArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid red;
`

export default DiaryCarousel
