import React, { useState } from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import { Sidebar } from '../Sidebar/Sidebar'

export const RequestDataa = (props) => {

    const [userFields,setUserFields] = useState([]);
    const userId = localStorage.getItem('userId');
    const getDetails = async()=>{
        let res = await fetch(`http://localhost:5000/datafields/get-datafields/${userId}`,{
          method:'GET',
          headers:{
              'Content-Type': 'application/json',
          }
        })
        if(res.status==404)
        {
          alert("No Data Fields")
        }
        else
        {
        //  let datafield = {};
          let datafield = await res.json();
          console.log(datafield)

          setUserFields([...userFields,datafield[0]]);
          console.log(userFields)
        }
    }

  return (
    <div className={`App bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="2" />
    </div>
    <div className={`p-3 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}}`} style={{width:"80rem"}}>
    <PageTitle title="Request Data" theme={props.theme}/>
    <button onClick={()=> getDetails()}>Click</button>
    </div>
    </div>
  )
}
