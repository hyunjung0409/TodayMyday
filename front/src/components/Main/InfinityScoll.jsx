import React, { useCallback, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import { getAxios } from '../../api'

function InfinityScoll(props) {
  const axios = getAxios()
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [ref, inView] = useInView()

  // 서버에서 아이템을 가지고 오는 함수
  const getItems = useCallback(async () => {
    setLoading(true)
    await axios.get('/diary/paging', { params: { pageNumber: page } }).then((res) => {
      console.log('res', res.data.content)
      setItems((prevState) => [...prevState, res.data.content])
    })
    setLoading(false)
  }, [page])

  // `getItems` 가 바뀔 때 마다 함수 실행
  useEffect(() => {
    getItems()
  }, [getItems])

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1)
    }
  }, [inView, loading])

  return (
    <div>
      {items.map((item, idx) => (
        <div key={idx}>
          {/* {item.length - 1 == idx ? <div ref={ref}>{item.image}</div> : <div>{item.image}</div>} */}
          {console.log('item', item)}
        </div>
      ))}
    </div>
  )
}

export default InfinityScoll
