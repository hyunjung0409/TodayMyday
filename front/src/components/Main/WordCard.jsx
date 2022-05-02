import './WordCard.css'
import React, { useState, useCallback } from 'react'
import $, { data, get } from 'jquery'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RedoOutlined } from '@ant-design/icons'

function WordCard() {
  const navigate = useNavigate()
  const { wordGet } = useSelector((state) => state.word)
  const [word, setWord] = useState([])

  const pageMove = (e) => {
    navigate('/my/article', { state: e.target.innerHTML })
  }

  $('.card').on('click', function () {
    $('.cardRotate').addClass('backRotate').removeClass('cardRotate')
    $(this).addClass('cardRotate').removeClass('backRotate')
  })

  return (
    <>
      {wordGet != null
        ? wordGet.map((item) => (
            <div key={item} className="card card1">
              <div className="front" onClick={pageMove}>
                {item}
              </div>
            </div>
          ))
        : null}
      <RedoOutlined />
    </>
  )
  // <div>
  //   <div className="card card1">
  //     <div className="front"></div>
  //     <div className="back"></div>
  //   </div>
  //   <div className="card card2">
  //     <div className="front"></div>
  //     <div className="back"></div>
  //   </div>
  //   <div className="card card3">
  //     <div className="front"></div>
  //     <div className="back"></div>
  //   </div>
  //   <div className="card card4">
  //     <div className="front"></div>
  //     <div className="back"></div>
  //   </div>
  //   <div className="card card5">
  //     <div className="front"></div>
  //     <div className="back"></div>
  //   </div>
  // </div>
}

export default WordCard
