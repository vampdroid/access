import React, { useEffect, useState } from 'react'
import { PageTitle } from '../../Components/PageTitle/PageTitle'
import { Sidebar } from '../Sidebar/Sidebar'

export const AccessRequest = (props) => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  // const intialState = [{
  //   _id:"",
  //   data_owner:"",
  //   data_accessor:"",
  //   status:"",
  //   created_at:""
  // }]
  var [requests,setRequests] = useState([]);
  
  if(!token){
      window.location.href = '/'
  }

  let formatter = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "long",
    day: "2-digit"
  });

  useEffect(() => {
    async function fetchRequests(){

    let data = await fetch(`http://localhost:5000/requests/get-requests/${userId}`,{
      method:'GET',
      headers:{
          'Content-Type': 'application/json',
      }
    })
    let req = []
    let res = await data.json();
    // console.log(...res);
    // console.log("Exe");
    // for(var i =0;i<res.length;i++)
    // {
    //   req[i] = {data_accessor:res[i].data_accessor,data_owner:res[i].data_owner,created_at:res[i].created_at,accessor_email:getUserEmail(res[i].data_accessor),status:res[i].status}
    // }
  //  requests = requests.concat(res);
    setRequests(res)

    // for(var i=0;i<res.length;i++)
    // {
    //   // var email = await getUserEmail(res[i]._id);
    //   // res[i]._id = email;
    //   setRequests(...requests,res[i]);
    // }
    // setRequests((oldreq)=>{
    //   let req  = [...oldreq,...res]
    //   console.log(req)
    //   return req
    // })
    console.log(requests);
  }
  fetchRequests();
  }, [])
  


  let getUserEmail = async(id)=>{
      let user = await fetch(`http://localhost:5000/user/exist/id/${id}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json',
      }
      })
      let res = await user.json();
      //console.log(res)
      return res.email
  }

  async function approveRequest(e)
  {
    let updated = await fetch(`http://localhost:5000/requests/update-request`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          requestId:e.target.value,
          updateStatus:"acp"
        })
      })
      let res = updated.json();
      console.log(res)
      let r = requests;
      r[e.target.id].status = "acp";
      setRequests(r);
      //Temperory Solution as states are not being update 
      window.location.href="/accessrequest"
  }
  async function rejectRequest(e)
  {
    // let r = requests;
    // r[e.target.id].status = "den";
    // setRequests(r)
    let updated = await fetch(`http://localhost:5000/requests/update-request`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        requestId:e.target.value,
        updateStatus:"den"
      })
    })
    let res = await updated.json();
    console.log(res)
    window.location.href="/accessrequest"
   // alert('Rejected')
  }

  return (
    
    <div className={`App bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'}}"`} style={{ display: "flex", flexDirection: "row", marginTop: "-10rem !important",minHeight:"100vh"}}>
    {console.log(requests)}
    <div style={{ width: "280px" }}>
    <Sidebar theme={props.theme} settheme={props.settheme} current="0" />
    </div>
    <div className={`p-3 bg-${props.theme} text-${props.theme === 'light' ? 'dark' : 'light'} `} style={{width:"80rem"}}>
    <PageTitle title="Access Requests" theme={props.theme}/>

    <table className={`border text-center mx-auto`}>
      <tbody>
        <tr>
          <td className={`p-2 fw-bold border`}>At</td>
          <td className={`p-2 fw-bold border`}>Data Request By</td>
          <td className={`p-2 fw-bold border`}>Fields</td>
          <td className={`p-2 fw-bold border`}>Status</td>
          <td className={`p-2 fw-bold border`}>Actions</td>
        </tr>
      {requests.length!=0 && requests.map((request,i)=>{
return(          
        <tr key={request._id}>
          <td className={`p-2 border`}>{/*request.created_at*/}{formatter.format(Date.parse(request.created_at))}</td>
          <td className={`p-2 border`}>{request.accessor_data[0]?.email}</td>
          <td className={`p-2 border`}>

            {
              request.request_detail.map((req,i)=>{
                return(
                  <span>{ i==0 ? <>{req?.field_name}</> : <>, {req?.field_name} </>}</span>
                )
              })
            }
        
            </td>
          <td className={`p-2 border`}>{request.status=="req"?"Pending" : request.status=="acp"?"Accepted" : "Denied"}</td>
          <td className={`p-2 border`}>
            {request.status=="req"?
            <>
            <button id={`${i}`} value={`${request._id}`} className={`mx-1 btn btn-success`} onClick={(e)=>approveRequest(e)}>Approve</button>
            <button id={`${i}`} value={`${request._id}`} className={`mx-1 btn btn-danger`} onClick={(e)=>rejectRequest(e)}>Reject</button>
            </>
            : request.status=="acp"?
            <button id={`${i}`} value={`${request._id}`} className={`mx-1 btn btn-danger`} onClick={(e)=>rejectRequest(e)}>Reject</button> 
            : 
            <button id={`${i}`} value={`${request._id}`} className={`mx-1 btn btn-success`} onClick={(e)=>approveRequest(e)}>Approve</button>
            }
          </td>
        </tr>
       ) })
      }

{/* 
        <tr>
          <td className={`p-2 border`}>2021-06-09</td>
          <td className={`p-2 border`}>yashskukreja@gmail.com</td>
          <td className={`p-2 border`}>fname,lname,city,country</td>
          <td className={`p-2 border`}>Approved</td>
          <td className={`p-2 border`}>
            <button className={`mx-1 btn btn-danger`}>Reject</button>
          </td>
        </tr>

        
        <tr>
          <td className={`p-2 border`}>2021-06-09</td>
          <td className={`p-2 border`}>yashskukreja@gmail.com</td>
          <td className={`p-2 border`}>fname,lname,city,country</td>
          <td className={`p-2 border`}>Rejected</td>
          <td className={`p-2 border`}>
            
          <button className={`mx-1 btn btn-success`}>Approve</button>
          </td>
        </tr> */}
        </tbody>
      </table>
    </div>

    </div>
  )
}
