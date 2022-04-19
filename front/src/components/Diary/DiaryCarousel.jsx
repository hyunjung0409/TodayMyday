import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import DiaryCard from './DiaryCard'

function onChange(a, b, c) {
  console.log(a, b, c)
}

const contentStyle = {
  height: '350px',
  color: '#fff',
  textAlign: 'center',
  background: '#FFDAE5',
}

// const map_result3 = numbers.map(function (value, index) {
//   return "<li>[ " + index + "] " + value + "</li>\n";
// });
// console.log(map_result3);
// // ["<li>[ 0] 45</li>\n", "<li>[ 1] 1</li>\n", ...]

function DiaryCarousel() {
  return (
    <Carousel afterChange={onChange} dotPosition="bottom">
      <div className="carousel-1">
        <div style={contentStyle}>
          <StyledCardlArea>
            <DiaryCard />
            <DiaryCard />
            <DiaryCard />
            <DiaryCard />
            <DiaryCard />
          </StyledCardlArea>
        </div>
      </div>
      <div className="carousel-2">
        <div style={contentStyle}>
          <StyledCardlArea>
            <DiaryCard />
            <DiaryCard />
            <DiaryCard />
            <DiaryCard />
            <DiaryCard />
          </StyledCardlArea>
        </div>
      </div>
    </Carousel>
  )
}

const StyledCardlArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  // border: 1px solid red;
  padding: 1rem;
`

export default DiaryCarousel
