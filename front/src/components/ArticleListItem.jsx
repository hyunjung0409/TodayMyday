import React from 'react'
import { BsHeartFill } from 'react-icons/bs'
import { EyeFilled, HeartFilled, MessageFilled } from '@ant-design/icons'

function ArticleListItem({ picture, title, createdat, view, liked, content }) {
  return (
    <>
      <div style={{ width: '100%', height: '150px', display: 'flex' }}>
        <img width={100} src={picture} alt="" style={{ flex: 2 }} />
        <div style={{ flex: 2 }}>
          <div style={{ position: 'relative', top: '15px' }}>
            <h1 style={{ fontWeight: 'bold', marginBottom: '20px' }}>#{title}</h1>
            <p>{content.length >= 35 ? content.substr(0, 35) + '...' : content}</p>
            <div>{createdat}</div>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ position: 'relative', top: '25px' }}>
            <div>
              <HeartFilled style={{ fontSize: '22px' }} />{' '}
              <span style={{ fontSize: '22px' }}>{liked}</span>
            </div>
            <div>
              <EyeFilled style={{ fontSize: '22px' }} />{' '}
              <span style={{ fontSize: '22px' }}>{view}</span>
            </div>
            <div>
              <MessageFilled style={{ fontSize: '22px' }} />{' '}
              <span style={{ fontSize: '22px' }}>0</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ArticleListItem
