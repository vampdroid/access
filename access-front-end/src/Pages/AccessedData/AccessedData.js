import React, { useEffect, useState } from 'react'
import { DataCard } from '../../Components/DataCard/DataCard';
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import {retrieveFiles} from '../../IPFS/CRUD'
import { Sidebar } from '../Sidebar/Sidebar'
export const AccessedData = (props) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
    
  if(!token){
      window.location.href = '/'
  }

  const [data,setData] = useState([]);
  useEffect(() => {
    
    async function getData(){
      const res = await fetch(`http://localhost:5000/requests/get-access-fields/${userId}`,{
        method:'GET',
        header:{
          'Content-Type': 'application/json',
        }
      })
      let datafields = await res.json();
      console.log(datafields)
      for(var i=0;i<datafields.length;i++)
      {
        for(var j=0;j<datafields[i].request_detail.datafield.length;j++)
        {
          let d = await retrieveFiles(datafields[i].request_detail.datafield[j].field_value_address);
          datafields[i].request_detail.datafield[j].field_value_address = d;
          
        }
        
        data.push(datafields[i]);
        console.log(data)
      }
      setData([...data])
      console.log(data);
      // setData(datafields);
    }
    getData()
  }, [])
  
  const setDataField = async()=>{

  }
  const getFieldData = async (id)=>{

    // let res = await fetch(`http://localhost:5000/datafields/get-datafield-by-id/${id}`,{
    //   method:'GET',
    //     header:{
    //       'Content-Type': 'application/json',
    //     }
    // })
  
    // let datafield = await res.json();
    // console.log(datafield)

    let data;
    // if(datafield.field_value_address)
    data= await retrieveFiles(id);
    return data;
  }

  return (
    <div className={`App bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="3" />
    </div>
    <div className={`p-3 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}}`} style={{width:"80rem"}}>
    <PageTitle title="Accessible Data" theme={props.theme}/>
   
   <div className='container'>

   <div className='row'>
    {console.log(data.length)}
    {data.length!=0 && data.map((dt)=>{
      console.log(dt)
      return(
          <div id={dt._id} className={`card m-1 col-md-6 p-3 align-items-center text-center border w-25 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
          <h5>{dt.owner_data[0].email}</h5>
          {
             dt.request_detail.datafield.map((field)=>
            {return (
              <div id={field._id}>{field.field_name} : {field.field_value_address}</div>
            )}
            )
          }
        </div>  
    )})}
   </div>

   </div>


    {/* <div className={`container`}>
      <div className='row'>
    <div className={`card m-1 col p-3 align-items-center text-center border w-25 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
      <h5>yashskukreja@gmail.com</h5>
      <div>first_name : Yash</div>
      <div>last_name : Kukreja</div>
      <div>city : Ahmedabad</div>
    </div>  
    <div className={`card m-1 col p-3 align-items-center text-center border w-25 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
      <h5>yashskukreja@gmail.com</h5>
      <div>first_name : Yash</div>
      <div>last_name : Kukreja</div>
      <div>city : Ahmedabad</div>
    </div>  
    <div className={`card m-1 col p-3 align-items-center text-center border w-25 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
      <h5>yashskukreja@gmail.com</h5>
      <div>first_name : Yash</div>
      <div>last_name : Kukreja</div>
      <div>city : Ahmedabad</div>
    </div>   
     </div> 
    </div> */}

    </div>
    </div>
  )
}
