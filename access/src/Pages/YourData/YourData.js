import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
export const YourData = (props) => {
  return (
    <div className={`bg-${props.theme}`} style={{minHeight:"100vh"}}>
    <PageTitle title="Your Data" theme={props.theme}/>
    </div>
  )
}
