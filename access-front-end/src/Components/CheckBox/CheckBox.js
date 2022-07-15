import React, { useState } from 'react'

export const CheckBox = (props) => {

  const [rdId,setrdId] = useState("");
  const checkChanged = async(e)=>{
    console.log(e.target.checked)
    if(e.target.checked==true)
    {
      const data = await fetch('http://localhost:5000/requests/create-req-detail',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          reqId: props.reqid,
          fieldName:props.datafield.field_name,
          dataId: props.datafield._id
        })
    })
      let res = await data.json();
      console.log(res)
      setrdId(res.request_id);
    }
    else
    {
      console.log(rdId)
        const data = await fetch(`http://localhost:5000/requests/delete-req-detail/${rdId}`,{
            method:'DELETE',
            headers:{
                'Content-Type':'application/json',
            },
            body: JSON.stringify({a:"a"})
        })
      let res = await data.json();
      console.log(res)
    } 
  }
  return (
    <>
        {/* {datafields.map((datafield)=>{*/}
      {/* <div className={`h5 p-3 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
        <input id={props.keyval} className="d-inline form-control" type="checkbox">{props.field_name}</input>
      </div> */}
    {/*}})} */}

    {/* {props.datafields.map((datafield)=>{ */}
      <div className={`h5 p-3 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
        <div className="form-check">
        <input className="form-check-input" onChange={(e)=>checkChanged(e)} type="checkbox" value="" id="flexCheckDefault"/>
        <label className="form-check-label" for="flexCheckDefault">
          {props.datafield.field_name}
        </label>
        </div>
      </div>
    {/* })} */}
    </>
  )
}
