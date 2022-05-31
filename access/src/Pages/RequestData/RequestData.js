import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
export const RequestData = (props) => {
  return (
    <div className={`bg-${props.theme}`} style={{minHeight:"100vh"}}>
    <PageTitle title="Request Data" theme={props.theme}/>
    </div>
  )
}
