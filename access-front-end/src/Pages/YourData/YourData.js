import React, { useEffect } from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import EditLabel from 'react-editable-label';
import { useState } from 'react';
import { Sidebar } from '../Sidebar/Sidebar';
import { TextField } from '../../Components/DataFields/TextField';
export const YourData = (props) => {
  


  //verifying if the user is loggedin
  const token = localStorage.getItem('token');  
  const userId = localStorage.getItem('userId');
  if(!token){
      window.location.href = '/'
  }



    


  const [dataField, setdataField] = useState([])
  //saving data fields
  function handleAddTextField(e)
  {
      //e.preventDefault()
      console.log(dataField.length);
      // setdataField([...dataField,<TextField keyval={dataField?.length} field="text" />]);
  }
  function handleAddFileField(e)
  {
      //e.preventDefault()
      console.log(dataField.length);
      // setdataField([...dataField,<TextField keyval={dataField?.length} field="file" />]);
  }

  useEffect(() => {
     async function fetchData(){
      let datafields = await fetch(`http://localhost:5000/datafields/get-datafields/${userId}`,{
      method:'GET',
      headers:{
          'Content-Type': 'application/json',
      },
    })
   var get = await datafields.json();
   console.log(get[0])
   console.log("before : "+dataField);
    setdataField([...dataField,datafields[0]]);
   console.log("after : "+dataField);
  }
  fetchData()
  }, [])


  return (
    <div className={`App bg-${props.theme} text-${props.theme == 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="1" />
    </div>
    <div className={`bg-${props.theme} p-3 text-center text-${props.theme=="dark" ? "light" : "dark"}`} style={{width:"80rem"}}>
    <PageTitle title="Your Data" theme={props.theme}/>
    {dataField.map((data,i)=>{
        <div className='form-inline m-3'>
          {console.log(data?.field_id)}
          {/* <input type="text"></input> */}
        <input id={`name-${data?.field_id}`} className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type="textBox" placeholder='Field Name'/> : <input id={`value-${props.keyval}`} className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type={`${data?.type}`} placeholder='Field Value' value={data?.field_value_address}/> <button type="button" className="btn btn-primary btn-sm" data /*onClick={()=>saveDetails()}*/>Save</button>
      </div>
    })}
    <button onClick={()=>handleAddTextField()}  className="btn btn-primary mx-auto "><i className="fas fa-plus"></i> Add Text Field</button>&nbsp; or &nbsp;
    <button onClick={()=>handleAddFileField()}  className="btn btn-primary mx-auto "><i className="fas fa-plus"></i> Add File Field</button>
    {/* <TextField theme={props.theme} field={'file'}/> */}
    </div>
    </div>
  )
}
