import React, { useEffect, useState } from 'react'
import { CheckBox } from '../../Components/CheckBox/CheckBox';
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import { Sidebar } from '../Sidebar/Sidebar'
export const RequestData = (props) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const [canSave,setCanSave] =useState("disabled invisible");
  const [canSearch,setCanSearch] =useState("disabled invisible");
  const [canRequest,setCanRequest] =useState("disabled invisible");
  const [userEmail,setUserEmail] =useState("");
  const [checkbox,setCheckbox] = useState([])
  const [userDetail,setUser] = useState([]);
  const [newReqId,setNewReqId] = useState("");
  const [datafields,setDatafields] = useState([]);
  if(!token){
      window.location.href = '/'
  }
  const showSearch = (e)=>{
    setUserEmail(e.target.value)
    if(e.target.value=="")
    {
      setCanSave("disable invisible");
      return 
    }
    
    setCanSave("visible");
  }

  const searchUser = async(e)=>{
      let res = await fetch(`http://localhost:5000/user/exist/email/${userEmail}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
      })
       if(res.status==404)
       {
        alert("User Doesn't exist")
      }
      else{
        let user = await res.json();
        setUser(user);
        setCanSearch('visible')
      }
   }

  //We will create a request when getDetails are sent
  const getDetails = async()=>{
      let res = await fetch(`http://localhost:5000/datafields/get-datafields/${userDetail._id}`,{
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
        let datafield = {};
        datafield = await res.json();
        console.log(datafield)
        let d =  checkbox;
        let accid = userDetail._id;
        let newreq = await fetch(`http://localhost:5000/requests/create-request`,{
          method:'POST',
          headers:{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            owner_id:userId,
            accessor_id:accid
          })
        })
        let newreqjson = await newreq.json();
        console.log(newreqjson);
        setNewReqId(newreqjson._id);
        for(var i=0;i<datafield.length;i++)
        {
          console.log(d)
          d = [... d ,<CheckBox key={datafield?.[i]._id} keyval={datafield?.[i]._id} datafield={datafield?.[i]} reqid={newreqjson._id}/>];
        }
        setCheckbox(d)
        console.log("d " +checkbox)
        // let savethis = [...checkbox,datafield];
        // setCheckbox(savethis);
        // console.log(checkbox)
       // a = datafield
      //setDatafields([datafield])
        // for(var i=0;i<datafield.length;i++)
        // {
        //   setDatafields([...datafields,datafield?.[i]]);
        //   console.log(datafield[i]);
        // }
      }
      setCanRequest("visible")
      console.log(checkbox)
  }

    const saveRequest = async()=>{
      let details = await fetch(`http://localhost:5000/requests/get-req-details/${newReqId}`,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
        }
      })
      let res = await details.json();
      if(res.length==0)
      {
        let details = await fetch(`http://localhost:5000/requests/delete-request/${newReqId}`,{
          method:'DELETE',
          headers:{
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({a:"a"})
        })
      }
     // window.location.href='/requestdata'
     alert('Request Sent')
     setCanSave('disable invisible');
     setCheckbox([]);
     setCanRequest('disable invisible');
     setCanSearch('disable invisible');
     setUserEmail('')
    }
  // useEffect(async() => {
  //   if(userDetail!=null)
  //   {
  //         let res = await fetch(`http://localhost:5000/datafields/get-datafields/${userDetail._id}`,{
  //       method:'GET',
  //       headers:{
  //           'Content-Type': 'application/json',
  //       }
  //     })
  //     if(res.status==404)
  //     {
  //       alert("No Data Fields")
  //     }
  //     else
  //     {
  //       let datafield = {};
  //       datafield = await res.json();
  //       console.log(datafield)
  //      // a = datafield
  //     //setDatafields([datafield])
  //       for(var i=0;i<datafield.length;i++)
  //       {
  //         setDatafields([...datafields,datafield[i]]);
  //         console.log(datafield[i]);
  //       }
  //     }
  //     console.log(datafields)
  //   }

  // }, [])
  
  return (
    <div className={`App bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="2" />
    </div>
    <div className={`p-3 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}}`} style={{width:"80rem"}}>
    <PageTitle title="Request Data" theme={props.theme}/>
    {/* <div className='d-inline text-white h4'>Enter User Email : </div> */}
    <input className='d-inline form-control m-2 w-75 canSave' type="text" placeholder='Enter User Email' onChange={(e)=>showSearch(e)} value={userEmail}/><button id={props.keyval} type="button" className={`btn btn-primary d-inline btn-sm ${canSave}`} onClick={(e)=>searchUser(e)}>Search</button>
    <div className={`h5 p-3 bg-${props.theme} ${canSearch} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
      { userDetail.email ? userDetail.email : ""  } <button  type="button" className={`btn btn-primary d-inline btn-sm ${canSearch}`} onClick={(e)=>getDetails(e)}>Get Data Fields</button>
    </div>
    {/* {checkbox.map((datafield)=>{
      <div className={`h5 p-3 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}`}>
        <input id={datafield._id} className="d-inline form-control" type="checkbox">{datafield.field_name}</input>
      </div>
    })} */}
    {/*console.log(checkbox)*/}
    {checkbox}
    {/* {checkbox.map((datafield,i)=>{
        <CheckBox key={datafield[0]._id} keyval={datafield[0]._id} datafield={datafield[0]}/>
    })} */}

    <button className={`btn btn-primary ${canRequest}`} onClick={()=>saveRequest()}>Send Request</button>
    </div>

    </div>
  )
}
