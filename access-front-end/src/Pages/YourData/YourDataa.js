import React, { useEffect, useState } from 'react'
import { TextField } from '../../Components/DataFields/TextField';
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import { Sidebar } from '../Sidebar/Sidebar'
import { readData, retrieveFiles } from '../../IPFS/CRUD';

export const YourDataa = (props) => {
  let data=""
    const userId = localStorage.getItem('userId');

    const [field,setfields] = useState([]);

    async function handleAddTextField(){
        let result = await fetch(`http://localhost:5000/datafields/create-datafield/`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                user:userId,
                type:"text",
                field_id:field.length,
                field_name:"",
                field_value_address:""
            })
          })
        
        setfields([...field,<TextField key={field?.length} keyval={field?.length} field="text"/>]);
    }
    function handleAddFileField(){
        
        setfields([...field,<TextField key={field?.length} keyval={field?.length} field="file"/>]);
    }

    async function setThisField(object){
     //   let file = await retrieveFiles(object.field_value_address);
      //  let data = object.field_value_address
      //   let fileReader = new FileReader();
      //   console.log(file)
      //   fileReader.onload = function(){
      //     localStorage.setItem('data',fileReader.result);
      //    // console.log(fileReader.result+'inside');
      // }
   //     fileReader.readAsText(file);
      //IPFS: 
      let data = await retrieveFiles(object.field_value_address);
        console.log(data+" here")
        console.log(object)
        setfields(field=>[...field,<TextField key={object.field_id} keyval={object.field_id} field={object.type} name={object.field_name} defaultValue={data}/>])
      //Normal: 
        // console.log(object)
        // setfields(field=>[...field,<TextField key={object.field_id} keyval={object.field_id} field={object.type} name={object.field_name} defaultValue={object.field_value_address}/>])
    
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
      console.log(get)
      for(var i=0;i<get.length;i++)
      {
        setThisField(get[i]);
        console.log(field)
      }
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
    {field}
    <button onClick={()=>handleAddTextField()}  className="btn btn-primary mx-auto"><i className="fas fa-plus"></i> Add Text Field</button>&nbsp; or &nbsp;
    <button onClick={()=>handleAddFileField()}  className="btn btn-primary mx-auto"><i className="fas fa-plus"></i> Add File Field</button>
    {/* <TextField theme={props.theme} field={'file'}/> */}
    </div>
    </div>
  )
}
