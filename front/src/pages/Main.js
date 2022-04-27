import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import WordCard from '../components/Main/WordCard'
import { getAxios } from '../api'

const Cards = styled.div`
  background-color: #f9fafb;
  height: 200px;
  padding-bottom: 5%;
  padding-top: 5%;
  padding-left: 5%;
  padding-right: 5%;
`

function Main() {
  const axios = getAxios()
  const [word, setWord] = useState(null)

  useEffect(() => {
    axios
      .get('test/word')
      .then((res) => {
        setWord(res.data)
      })
      .catch((err) => {
        console.log('err', err)
      })
  }, [])

  return <WordCard word={word} />
}

export default Main
