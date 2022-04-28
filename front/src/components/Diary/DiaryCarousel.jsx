import React, { useEffect } from 'react'
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
  // > .ant-carousel .slick-dots {
  //   margin-left: 0;
  //   margin-right: 0;
  // }
`

function DiaryCarousel({ diaryList, setDiaryList, me }) {
  const rendering = () => {
    const result = []
    for (let index = 0; index < diaryList.length; index += 5) {
      const element = diaryList.slice(0 + index, 5 + index)
      const fiveCards = element.map((card) => {
        return <DiaryCard card={card} key={card.dno} />
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
  height: 60vh;
`

export default DiaryCarousel
