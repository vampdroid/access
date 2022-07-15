import { eventWrapper } from '@testing-library/user-event/dist/utils'
import React,{useState} from 'react'
import { Link,Redirect } from 'react-router-dom'
import { DangerAlert } from '../../Components/Alert/DangerAlert'
import logo from '../../lightlogo.svg'
export const Login = () => {
    
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [errorText, seterrorText] = useState("")
        //JWT is pending

    const token = localStorage.getItem('token')
    if(token)
    {
        window.location.href='/accessrequest'
    }
    async function controlLogin(event){

        event.preventDefault();

        if(errorText=="" && email!="" && password!="")
        {
            
            let result = await fetch(`http://localhost:5000/user/login`,{
                method:'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({
                    email,
                    password,
                })
              })
              let user = await result.json();
      //      let user = JSON.parse(localStorage.getItem("userDetails"));
            console.log(user);
            if(user.token)
            {
                window.location.href = '/'
                localStorage.setItem('isLogin',true);
                localStorage.setItem('token',user.token);
                localStorage.setItem('userId',user.user);
            }
            else
            {
                seterrorText("Invalid Credentials")
            }
        }
        else
        {
            seterrorText("Please Provide Above Information!")
        }
    }

    function handleEmail(e)
    {
        if(e.target.value=="" || !validateEmail(e.target.value) )
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

    function handlePassword(e)
    {
        if(e.target.value=="")
        {
            seterrorText("Please Enter Password");
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
        <div className='card bg-dark text-light p-3 align-items-center text-center border' style={{width:"580px",backgroundColor:"#252933 "}}>
            <img className="" src={logo} height="65px"></img>
            <h2>Access</h2>
            <strong>Login</strong>
            <input className='form-control w-50 m-2' type="text" onChange={(e)=>handleEmail(e)} placeholder='Email ID'></input> 
            <input className='form-control w-50 m-2' type="password" onChange={(e)=>handlePassword(e)} placeholder='Password'></input>
            <DangerAlert text={errorText}/>
            <div className="btn btn-primary m-2 w-50" onClick={(e)=>controlLogin(e)}>Login</div> 
            <Link to='/register' className="btn btn-outline-primary m-2 w-50">
                Create New Account
            </Link>
        </div>  
    </div>
  )
}
