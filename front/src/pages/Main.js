import styled from 'styled-components'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import WordCard from '../components/Main/WordCard'
import { wordGetRequestAction } from '../reducers/word'

const Cards = styled.div`
  background-color: #f9fafb;
  height: 200px;
  padding-bottom: 5%;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
`

function Main() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(wordGetRequestAction())
  }, [])

  return <WordCard />
}

export default Main
