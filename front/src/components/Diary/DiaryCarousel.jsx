import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import DiaryCard from './DiaryCard'

function onChange(a, b, c) {
  console.log(a, b, c)
}

const MyCarousel = styled(Carousel)`
  > .slick-dots-bottom li button:before {
    display: none;
  }
`

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

function DiaryCarousel({ diaryList, setDiaryList }) {
  const rendering = () => {
    const result = []
    for (let index = 0; index < diaryList.length; index += 5) {
      const element = diaryList.slice(0 + index, 5 + index)
      const fiveCards = element.map((card, i) => {
        return <DiaryCard card={card} key={i} />
      })

      result.push(
        <div className="card-area">
          <StyledCardlArea>{fiveCards}</StyledCardlArea>
        </div>,
      )
    }
    return result
  }

  return (
    <>
      {/* <MyCarousel afterChange={onChange} dotPosition="bottom">
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
      </MyCarousel> */}
      <MyCarousel
        afterChange={onChange}
        dotPosition="bottom"
        style={{ listStyle: 'none', overflow: 'hidden' }}>
        {rendering()}
      </MyCarousel>
    </>
  )
}

const StyledCardlArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid red;
  padding: 2rem;
`

export default DiaryCarousel
