import React, { useState } from 'react'
import {postOnIPFS,retrieveFiles} from '../../IPFS/CRUD'

export const TextField = (props) => {
  const userId = localStorage.getItem('userId')
  const [name,setname] = useState(props.name)
  const [value,setvalue] = useState(props.defaultValue)
  const [canSave,setCanSave] =useState("disabled invisible");
    async function saveDetails(e)
    {
          console.log(e.target.id)
          console.log(document.getElementById(`value-${e.target.id}`).value)
          // IPFS:
          let cid = await postOnIPFS(document.getElementById(`name-${e.target.id}`).value,document.getElementById(`value-${e.target.id}`).value)
      
        let result = await fetch(`http://localhost:5000/datafields/update-datafield/${userId}/${e.target.id}`,{
          method:'PUT',
          headers:{
              'Content-Type': 'application/json',
          },
          body:JSON.stringify({
              field_name:document.getElementById(`name-${e.target.id}`).value,
              //IPFS:
              field_value_address:cid
              //Normal:
            //  field_value_address:document.getElementById(`value-${e.target.id}`).value,
          })
        })
        var res = await result.json();
       // setNameAndValue(res,e.target.id);
        console.log(res);
        setCanSave("disabled invisible")
    }

    // async function setNameAndValue(res)
    // {
    //   if(res)
    //   {
    //     setname(res.field_name);
    //    // let content = await retrieveFiles(res.field_value_address);
    //     setvalue(res.field_value_address);
    //   }
    // }
    function showSave(e)
    {
      setCanSave("visible");
      if(e.target.id==`name-${props.keyval}`)
      {
        setname(e.target.value);
      }
      else if(e.target.id==`value-${props.keyval}`)
      {
        setvalue(e.target.value);
      }
    }



    

  return (
    <div className='form-inline m-3'> 
      {console.log(props.keyval)}
    <input id={`name-${props.keyval}`} className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type="textBox" placeholder='Field Name' value={name} onChange={(e)=>showSave(e)}/> : <input id={`value-${props.keyval}`} className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type={`${props.field}`} placeholder='Field Value' value={value}  onChange={(e)=>showSave(e)}/> <button id={props.keyval} type="button" className={`btn btn-primary btn-sm ${canSave}`}  onClick={(e)=>saveDetails(e)}>Save</button>
    </div>
  )
}
