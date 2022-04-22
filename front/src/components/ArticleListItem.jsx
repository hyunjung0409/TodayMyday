import React from 'react'

function ArticleListItem({ picture, title, createdat }) {
  return (
    <div style={{ border: '5px solid red', width: '90%', margin: '10px auto' }}>
      <div style={{ width: '30%', boxSizing: 'border-box', float: 'left' }}>
        <img style={{ width: 120 }} src={picture} alt={picture} />
      </div>
      <div
        style={{
          width: '25%',
          boxSizing: 'border-box',
          float: 'left',
          marginLeft: '5%',
          marginTop: '50px',
          textAlign: 'left',
        }}>
        <h2>#{title}</h2>
      </div>
      <div
        style={{
          width: '35%',
          boxSizing: 'border-box',
          float: 'right',
          marginTop: '30px',
        }}>
        <ul style={{ listStyle: 'none', textAlign: 'right', marginRight: '10px' }}>
          <li>조회수: 0</li>
          <li>좋아요: 0</li>
          <li>날짜: {createdat}</li>
        </ul>
      </div>
    </div>
  )
}

export default ArticleListItem
