import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
export const AccessRequest = (props) => {
  return (
    <div className={`bg-${props.theme}`} style={{minHeight:"100vh"}}>
    <PageTitle title="Data Access Requests" theme={props.theme}/>
    </div>
  )
}
