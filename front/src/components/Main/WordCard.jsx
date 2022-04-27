import React, { useEffect, useState } from 'react'
import './WordCard.css'
import $, { data, get } from 'jquery'
import { useNavigate } from 'react-router'

function WordCard({ word }) {
  $('.card').on('click', function () {
    $('.cardRotate').addClass('backRotate').removeClass('cardRotate')
    $(this).addClass('cardRotate').removeClass('backRotate')
  })
  const navigate = useNavigate()

  const pageMove = (e) => {
    console.log(e.target.innerHTML)
    navigate('/my/article', { state: e.target.innerHTML })
  }

  return word != null
    ? word.map((item) => (
        <div key={item} className="card card1">
          <div className="front" onClick={pageMove}>
            {item}
          </div>
        </div>
      ))
    : // <div>
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
      null
}

export default WordCard
