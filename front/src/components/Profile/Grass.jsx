import React, { useState } from 'react'
import styled from 'styled-components'
// import { Calendar } from 'antd'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'

function onPanelChange(value, mode) {
  console.log(value, mode)
}

function Grass() {
  const [value, onChange] = useState(new Date())
  const [mark, setMark] = useState(['2022-05-02', '2022-05-09', '2022-05-10'])

  return (
    // <StyledCalender>
    //   <MyCalender fullscreen={false} onPanelChange={onPanelChange} />
    // </StyledCalender>
    <StyledCalender>
      <MyCalender
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format('DD')}
        value={value}
        // showNeighboringMonth={false} //  이전, 이후 달의 날짜는 보이지 않도록 설정
        className="mx-auto w-full text-sm border-b"
        tileContent={({ date, view }) => {
          if (mark.find((x) => x === moment(date).format('YYYY-MM-DD'))) {
            return (
              <>
                <div className="flex justify-center items-center absoluteDiv">
                  <StyledDot />
                </div>
              </>
            )
          }
        }}
      />
    </StyledCalender>
  )
}

const StyledCalender = styled.div`
  width: 350px;
  margin: 1rem auto;
  // border: 1px solid #f0f0f0;
  // border-radius: 2px;
`
// const MyCalender = styled(Calendar)`
//   .ant-picker-calendar-date-value {
//     color: yellow;
//     background-color: red;
//     border-radius: 15px;
//   }
// `
const MyCalender = styled(Calendar)`
  .react-calendar__tile--active {
    position: relative;
    background: #ffdae5;
    color: #000000d9;
  }
  .react-calendar__tile--now {
    background: rgba(209, 247, 129, 0.7);
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #bababa;
  }
`
const StyledDot = styled.div`
  position: absolute;
  height: 25px;
  width: 25px;
  background-color: rgba(255, 218, 229, 0.5);
  border-radius: 50%;
  display: flex;
  margin: -20px 5px 0 6px;
`

export default Grass
