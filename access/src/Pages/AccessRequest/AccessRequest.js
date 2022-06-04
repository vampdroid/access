import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import { Sidebar } from '../Sidebar/Sidebar'

export const AccessRequest = (props) => {
  return (
    <div className={`App bg-${props.theme} text-${props.theme == 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="0" />
    </div>
    <div className={`  p-3 bg-${props.theme}`}>
    <PageTitle title="Data Accesss Requests" theme={props.theme}/>
    </div>
    </div>
  )
}
