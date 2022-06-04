import React from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import EditLabel from 'react-editable-label';
import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { TextField } from '../../Components/DataFields/TextField';
export const YourData = (props) => {
  const [dataField, setdataField] = useState([])

  function handleAddTextField(e)
  {
      //e.preventDefault()
      console.log(dataField.length);
      setdataField([...dataField,<TextField keyval={dataField?.length} field="text" />]);
  }
  function handleAddFileField(e)
  {
      //e.preventDefault()
      console.log(dataField.length);
      setdataField([...dataField,<TextField keyval={dataField?.length} field="file" />]);
  }
  return (
    <div className={`App bg-${props.theme} text-${props.theme == 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="1" />
    </div>
    <div className={`bg-${props.theme} p-3 text-center text-${props.theme=="dark" ? "light" : "dark"}`} style={{width:"80rem"}}>
    <PageTitle title="Your Data" theme={props.theme}/>

    {dataField}
    <button onClick={()=>handleAddTextField()}  className="btn btn-primary mx-auto "><i className="fas fa-plus"></i> Add Text Field</button>&nbsp; or &nbsp;
    <button onClick={()=>handleAddFileField()}  className="btn btn-primary mx-auto "><i className="fas fa-plus"></i> Add File Field</button>
    {/* <TextField theme={props.theme} field={'file'}/> */}
    </div>
    </div>
  )
}
