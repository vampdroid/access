import React, { useEffect, useState } from 'react'

export const DataCard = (props) => {

    const [data,setData] = useState([]);

    useEffect(() => {
      async function loadData(){
        setData(props.request_detail);
      }
    loadData()
    }, [])
    

  return (
        
        <div className={`card m-1 col-md-4 p-3 align-items-center text-center border w-25 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
        {console.log(props.data)}
        <h5>{props.data.owner_data?.email}</h5>
        {
            data?.map((req)=>{
                <div>{req.field_name} : </div>
            })
        }
      </div>   
  )
}
