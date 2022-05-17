import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import WordCard from '../components/Main/WordCard'
import { wordGetRequestAction } from '../reducers/word'
import InfinityScoll from '../components/Main/InfinityScoll'
import styled from 'styled-components'

// const Cards = styled.div`
//   background-color: #f9fafb;
//   height: 200px;
//   padding-bottom: 5%;
//   padding-top: 5%;
//   padding-left: 5%;
//   padding-right: 5%;
// `

const StyledBackground = styled.div`
  background-color: #ffdae5;
  padding: 2%;
  border-radius: 5px;
`

function Main() {
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)

  useEffect(() => {
    if (me !== null) {
      console.log('me', me)
      dispatch(wordGetRequestAction({ userId: me.userId }))
    }
  }, [me])

  return (
    <StyledBackground>
      <WordCard />
      <InfinityScoll />
    </StyledBackground>
  )
}

export default Main
