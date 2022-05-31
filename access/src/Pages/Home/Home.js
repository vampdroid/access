import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'

export const Home = (props) => {
  return (
    <div className='h-100'>
        <PageTitle title="About Us" theme={props.theme}/>
    </div>
  )
}
