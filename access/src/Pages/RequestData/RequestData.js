import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import { Sidebar } from '../Sidebar/Sidebar'
export const RequestData = (props) => {
  return (
    <div className={`App bg-${props.theme} text-${props.theme == 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="2" />
    </div>
    <div className={`  p-3 bg-${props.theme}`}>
    <PageTitle title="Request Data" theme={props.theme}/>
    </div>
    </div>
  )
}
