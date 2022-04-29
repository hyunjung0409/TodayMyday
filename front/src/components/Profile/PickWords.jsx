import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAxios } from '../../api'
import { useSelector } from 'react-redux'
import { Row, Col, Divider } from 'antd'
const style = { background: '#0092ff', padding: '8px 0' }

const Words = styled.div`
  width: 90%;
  height: 280px;
  background-color: rgb(238, 167, 187);
  text-align: left;
  padding-left: 5%;
  padding-top: 2%;
`
const Search = styled.input`
  margin-right: 3%;
  float: right;
`
function PickWords() {
  const { me } = useSelector((state) => state.user)
  console.log(me)
  const axios = getAxios()
  const [words, setWords] = useState([])

  const getWords = async (res) => {
    const request =
      me !== null &&
      me.userId !== null &&
      (await axios.get('diary/myword', { params: { userId: me.userId } }))
    // console.log(request, '하이')
    console.log(res)
  }
  // useEffect(() => {
  //   me
  // }, [])
  return (
    <div>
      <Words>
        내가 선택한 단어 <Search></Search>
        <hr />
        <Row gutter={16}>
          {me !== null &&
            me.dairies
              .map((a, i) => {
                return a.word
              })
              .reduce((ac, v) => (ac.includes(v) ? ac : [...ac, v]), [])
              .map((a, i) => {
                return (
                  <Col key={i} className="gutter-row" span={6}>
                    {a}
                  </Col>
                )

                // <div key={i}>{a.word}</div>
              })}
        </Row>
      </Words>
    </div>
  )
}
export default PickWords
