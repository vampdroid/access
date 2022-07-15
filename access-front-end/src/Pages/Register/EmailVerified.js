import React, { useEffect } from 'react'
import logo from '../../lightlogo.svg'
import {FaCheckCircle} from 'react-icons/fa'
import { useParams } from 'react-router-dom'
export const EmailVerified = () => {
  
  const params = useParams();
  const verify = async () => {
    console.log("verifying")
    const url =  `http://localhost:5000/user/${params.id}/verify-user/${params.token}/`;
    const res = await fetch(url,{
      method:"GET",
      headers:{
        "Content-Type": "application/json",
      }
    })
    }
  


function controlLogin(e)
{
    window.location.href = '/'
}
verify()
  return (
    <div className="d-flex bg-dark align-items-center justify-content-center" style={{height:"100vh",
    // backgroundColor:"#112B3C"
    }}>
        <div className='card text-light bg-dark p-3 align-items-center text-center border' style={{width:"580px",backgroundColor:"#253745"}}>
            <img className="" src={logo} height="65px"></img>
            <h2>Access</h2>
            <FaCheckCircle size="150px"/>
            <h4 className='m-3'>Email Verified Successfully</h4>
            <div className="btn btn-primary m-2 w-50" onClick={(e)=>controlLogin(e)}>Login</div> 
        </div>  
    </div>
  )
}
