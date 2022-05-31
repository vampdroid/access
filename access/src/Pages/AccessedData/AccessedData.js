import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
export const AccessedData = (props) => {
  return (
    <div className={`bg-${props.theme}`} style={{minHeight:"100vh"}}>
    <PageTitle title="Accessible Data" theme={props.theme}/>
    </div>
  )
}
