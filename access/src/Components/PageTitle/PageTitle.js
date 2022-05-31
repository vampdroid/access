import React from 'react'

export const PageTitle = (props) => {
  return (
    <div className={`p-3 h2 text-${props.theme=="light"?"dark":"light"}`}>
        <div className='m-2'>{props.title}</div></div>
  )
}
