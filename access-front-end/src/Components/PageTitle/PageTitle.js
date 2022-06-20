import React from 'react'

export const PageTitle = (props) => {
  return (
    <div className={`h2 text-${props.theme=="light"?"dark":"light"}`}>
        <div className='m-2'>{props.title}</div></div>
  )
}
