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
      <div class="card card1">
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="card card2">
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="card card3">
        <div class="front"></div>
        <div class="back"></div>
      </div>
      <div class="card card4">
        <div class="front"></div>
        <div class="back"></div>
      </div>
    </div>
  )
}

export default WordCard
