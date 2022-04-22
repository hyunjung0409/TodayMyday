import React from 'react'
import { Carousel } from 'antd'
import styled from 'styled-components'
import DiaryCard from './DiaryCard'

function onChange(a, b, c) {
  console.log(a, b, c)
}

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
    <Carousel
      afterChange={onChange}
      dotPosition="bottom"
      style={{ listStyle: 'none', overflow: 'hidden' }}>
      {rendering()}
    </Carousel>
  )
}

const StyledCardlArea = styled.div`
  display: flex;
  justify-content: space-evenly;
  border: 1px solid red;
  padding: 2rem;
`

export default DiaryCarousel
