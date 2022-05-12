import { render } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { articleListRequestAction } from '../../reducers/article'

const PageCover = React.forwardRef((props, ref) => {
  return (
    <StyledPageCover className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <div className="page-image">
          <img src={process.env.PUBLIC_URL + '/images/diary-2.PNG'} style={{ width: '10rem' }} />
        </div>
        <h2>{props.children}</h2>
      </div>
    </StyledPageCover>
  )
})

// const Page = React.forwardRef((props, ref) => {
//   return (
//     <StyledPage className="page" ref={ref}>
//       <div className="page-content">
//         <h2 className="page-header">Page header - {props.number}</h2>
//         <div className="page-image">
//           <img src={process.env.PUBLIC_URL + '/images/diary-2.PNG'} style={{ width: '10rem' }} />
//         </div>
//         <div className="page-text">{props.children}</div>
//         <div className="page-footer">{props.number + 1}</div>
//       </div>
//     </StyledPage>
//   )
// })

function MyBook() {
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { articleList } = useSelector((state) => state.article)

  const Page = React.forwardRef((props, ref) => {
    return (
      <StyledPage className="page" ref={ref}>
        <div className="page-content">
          <h2 className="page-header">Page header - {props.number + 1}</h2>
          <div className="page-image">
            <img src={process.env.PUBLIC_URL + '/images/diary-2.PNG'} style={{ width: '10rem' }} />
          </div>
          {/* <div className="page-text">{props.children}</div>
            <div className="page-footer">{props.number + 1}</div> */}
        </div>
      </StyledPage>
    )
  })

  const render = () => {
    for (let i = 0; i < data.length; i++) {
      return <Page number={i}>data[i].content</Page>
    }
  }

  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        dispatch(articleListRequestAction({ userId: me.userId }))
      }
    }
  }, [me])

  useEffect(() => {
    console.log(articleList)
    setData(articleList)
  }, [articleList])

  return (
    <HTMLFlipBook
      width={300}
      height={500}
      maxShadowOpacity={0.2}
      showCover={true}
      className="demo-book">
      <PageCover>BOOK TITLE</PageCover>
      {/* <Page number={1}>Lorem ipsum...</Page>
      <Page number={2}>Lorem ipsum...</Page> */}
      {data !== null ? <div>{render()}</div> : null}
      {/* <>{data && <div>{render()}</div>}</> */}
      <PageCover>THE END</PageCover>
    </HTMLFlipBook>
  )
}

const StyledPageCover = styled.div`
  background: #c1e17d;
`
const StyledPage = styled.div`
  background: #fff;
`

export default MyBook
