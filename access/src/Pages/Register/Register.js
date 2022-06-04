import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../lightlogo.svg'
import {useState} from 'react';
import { DangerAlert } from '../../Components/Alert/DangerAlert';
export const Register = () => {
    const [email, setemail] = useState("")
    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [password, setpassword] = useState("")
    const [errorText, seterrorText] = useState("")
    function controlRegister()
    {
        if(errorText=="" && email!="" && fname!="" && lname!="" && password!="")
        {
            localStorage.setItem("userDetails",JSON.stringify({"email":email,"fname":fname,"lname":lname,"password":password}));
            window.location.href = '/'
        }
        else
        {
            seterrorText("Please Provide Above Information!")
        }
        
    }
    function handleEmail(e)
    {
        if(e.target.value=="" || !validateEmail(e.target.value))
        {
            seterrorText("Please Enter Valid Email");
        }
        else
        {
            seterrorText("");
            setemail(e.target.value);
        }
    }
    function validateEmail(mail) 
    {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
        {
            return (true)
        }
        return (false)
    }
    function handleFname(e)
    {
        if(e.target.value=="")
        {
            seterrorText("Please Enter First Name");
        }
        else
        {
            seterrorText("");
            setfname(e.target.value);
        }
    }
    function handleLname(e)
    {
        if(e.target.value=="")
        {
            seterrorText("Please Enter Last Name");
        }
        else
        {
            seterrorText("");
            setlname(e.target.value);
        }
    }
    function handlePassword(e)
    {
        if(e.target.value=="")
        {
            seterrorText("Please Enter Password");
        }
        else if(e.target.value.length<8)
        {
            seterrorText("Please Enter Password pf length more than 8");
        }
        else
        {
            seterrorText("");
            setpassword(e.target.value);
        }
    }
  return (
    <div className="d-flex bg-dark align-items-center justify-content-center" style={{height:"100vh",
    // backgroundColor:"#112B3C"
    }}>
        <div className='card text-light p-3 align-items-center text-center' style={{width:"580px",backgroundColor:"#253745"}}>
            <img className="" src={logo} height="65px"></img>
            <h2>Access</h2>
            <strong>Register</strong>
            <input className='form-control w-50 m-2' type="text" onChange={(e)=>handleEmail(e)} placeholder='Email ID'></input> 
            <input className='form-control w-50 m-2' type="text" onChange={(e)=>handleFname(e)} placeholder='First Name'></input>
            <input className='form-control w-50 m-2' type="text" onChange={(e)=>handleLname(e)} placeholder='Last Name'></input>
            <input className='form-control w-50 m-2' type="password" onChange={(e)=>handlePassword(e)} placeholder='Password'></input>
            <DangerAlert text={errorText}/>
            <div className="btn btn-primary m-2 w-50" onClick={()=>controlRegister()}>Register</div> 

            <Link to='/login' className="btn btn-outline-primary m-2 w-50">
                Sign In
            </Link>
        </div>  
    </div>
  )
}
