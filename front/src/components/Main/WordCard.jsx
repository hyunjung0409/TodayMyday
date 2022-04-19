import React from 'react'
import './WordCard.css'
import $ from 'jquery'

function WordCard() {
  $('.card').on('click', function () {
    $('.cardRotate').addClass('backRotate').removeClass('cardRotate')
    $(this).addClass('cardRotate').removeClass('backRotate')
  })
  return (
    <div>
      <div className="card card1">
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="card card2">
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="card card3">
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="card card4">
        <div className="front"></div>
        <div className="back"></div>
      </div>
      <div className="card card5">
        <div className="front"></div>
        <div className="back"></div>
      </div>
    </div>
  )
}

export default WordCard
