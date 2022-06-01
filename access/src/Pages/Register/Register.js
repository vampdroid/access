import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../lightlogo.svg'
export const Register = () => {
    function controlRegister()
    {
        window.location.href = '/'
    }
  return (
    <div className="d-flex bg-dark align-items-center justify-content-center" style={{height:"100vh",
    // backgroundColor:"#112B3C"
    }}>
        <div className='card text-light p-3 align-items-center text-center' style={{width:"580px",backgroundColor:"#253745"}}>
            <img className="" src={logo} height="65px"></img>
            <h2>Access</h2>
            <strong>Register</strong>
            <input className='form-control w-50 m-2' type="email" placeholder='Email ID'></input>
            <input className='form-control w-50 m-2' type="text" placeholder='First Name'></input>
            <input className='form-control w-50 m-2' type="text" placeholder='Last Name'></input>
            <input className='form-control w-50 m-2' type="password" placeholder='Password'></input>
            <div className="btn btn-primary m-2 w-50" onClick={()=>controlRegister()}>Register</div> 
            <Link to='/login' className="btn btn-outline-primary m-2 w-50">
                Sign In
            </Link>
        </div>  
    </div>
  )
}
