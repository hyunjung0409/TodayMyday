import { render } from '@testing-library/react'
import React, { useEffect, useState } from 'react'
import HTMLFlipBook from 'react-pageflip'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Divider } from 'antd'
import { articleListRequestAction } from '../../reducers/article'
import { EditOutlined } from '@ant-design/icons'

const PageCover = React.forwardRef((props, ref) => {
  return (
    <StyledPageCover className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </StyledPageCover>
  )
})

const Page = React.forwardRef((props, ref) => {
  return (
    <StyledPage className="page" ref={ref}>
      <div className="page-content">
        {/* <h2 className="page-header">Page header - {props.number}</h2> */}
        <div className="page-text">{props.children}</div>
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </StyledPage>
  )
})

function MyBook() {
  const [data, setData] = useState(null)
  const dispatch = useDispatch()
  const { me } = useSelector((state) => state.user)
  const { articleList } = useSelector((state) => state.article)

  const renderrrr = () => {
    if (data) {
      // console.log(data)
      return data.map((x, i) => (
        <Page number={i} key={i}>
          <h1>
            <strong>#{x.word}</strong>
          </h1>
          <StyledImgArea>
            <StyledContentImg src={x.image} />
          </StyledImgArea>
          <MyTextarea defaultValue={x.content} disabled></MyTextarea>
        </Page>
      ))
    } else {
      return <div></div>
    }
  }

  useEffect(() => {
    if (me != null) {
      if (me.userId != null) {
        dispatch(articleListRequestAction({ userId: me.userId }))
        console.log(me)
      }
    }
  }, [me])

  useEffect(() => {
    console.log(articleList)
    setData(articleList)
  }, [articleList])

  return data ? (
    <HTMLFlipBook
      width={300}
      height={420}
      maxShadowOpacity={0.5}
      showCover={true}
      className="demo-book">
      <PageCover>
        <StyledCoverImg src={process.env.PUBLIC_URL + '/images/cover-2.png'} />
      </PageCover>
      {/* {data !== null ? <div>{renderrrr()}</div> : null} */}
      {/* <>{data && <div>{render()}</div>}</> */}
      {renderrrr()}

      <PageCover>
        <div style={{ textAlign: 'right', margin: '10em 1em' }}>
          <h3>지금 나의 하루는</h3>
          <div>
            {/* <img
              src={me.image}
              style={{
                width: '2em',
                height: '2em',
                objectFit: 'cover',
                marginTop: '-0.4rem',
                marginRight: '0.5rem',
                borderRadius: '50%',
              }}
            /> */}
            <h5>지은이: {me.nickname}</h5>
          </div>

          {/* <EditOutlined /> */}
        </div>
      </PageCover>
    </HTMLFlipBook>
  ) : (
    <div></div>
  )
}

const StyledPageCover = styled.div`
  // background: #c1e17d;
  background: #96c561;
  overflow: hidden;
  // box-shadow: 1px 1px 7px 10px rgba(180, 210, 120, 0.3) inset;
  box-shadow: 1px 1px 7px 10px rgba(130, 170, 80, 0.2) inset;
`
const StyledPage = styled.div`
  vertical-align: middle;
  background-color: #fcfcf8;
  outline: 1px solid transparent;
  box-shadow: inset 0 0.75rem 2rem rgba(225, 220, 200, 0.9);
  height: 100%;
  padding: 1em;
`

const StyledCoverImg = styled.img`
  width: 90%;
  height: 90%;
  object-fit: cover;
  padding-top: 1.2em;
  // box-shadow: 5px 5px 5px 5px gray inset;
`

const StyledImgArea = styled.div`
  width: 18em;
  height: 10em;
  overflow: hidden;
  border-radius: 5px;
`

const StyledContentImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const MyTextarea = styled.textarea`
  line-height: 1.5rem;
  border: 0;
  outline: none;
  font-family: inherit;
  appearance: none;
  color: #4e5e72;
  background-color: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='24'><rect fill='rgb(229, 225, 187)' x='0' y='23' width='10' height='1'/></svg>");
  width: 18em;
  height: 12em;
  resize: none;
  margin-top: 0.5em;
  padding: 0 0.2em;
`

export default MyBook
