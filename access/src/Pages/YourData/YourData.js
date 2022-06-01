import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import EditLabel from 'react-editable-label';
import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
export const YourData = (props) => {
  const [label, setlabel] = useState("")
  function labelChange(value)
  {
    console.log(label);
  }
  return (
    <div className={`App bg-${props.theme} text-${props.theme == 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="1" />
    </div>
    <div className={`bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} style={{width:"80rem"}}>
    <PageTitle title="Your Data" theme={props.theme}/>
    <div className='form-inline m-3'>
    <input className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type="textBox" placeholder='Field Name'/> : <input className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type="textBox" placeholder='Field Value'/>
    </div>
    </div>
    </div>
  )
}
