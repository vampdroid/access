import React from 'react'
import darklogo from '../../darklogo.svg'
import lightlogo from '../../lightlogo.svg'
import { FaHome,FaDatabase,FaThList,FaPlusCircle,FaSocks,FaUserAlt,FaCheckCircle,FaBell } from "react-icons/fa";
import { SidebarItem } from '../../Components/SidebarItem/SidebarItem';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { IsLoggedIn } from '../../Components/IsLoggedIn';
import './Sidebar.css'

export const Sidebar = (props) => {
  
  const token = localStorage.getItem('token');

    let [current,setcurrent] = useState(props.current);
    function changeCurrent(i)
    {
        setcurrent(i);
        console.log(i);
    }
    function handleLogout()
    {
      localStorage.setItem('isLogin',false);
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      window.location.href='/'
    }

    return (
        <>
            {/* <div className="collapse" id="navbarToggleExternalContent">
                <div className="bg-dark p-4">
                    <h5 className="text-white h4">Collapsed content</h5>
                    <span className="text-muted">Toggleable via the navbar brand.</span>
                </div>
            </div>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav> */}
            <div className={`d-flex flex-column sidebar flex-shrink-0 p-3 text-${props.theme=='light'?'dark':'light'} bg-${props.theme}`} style={{width:"280px",minHeight:"100vh",position:"fixed"}}>
    <Link to="/" className={`d-flex align-items-center mb-3 mb-md-0 me-md-auto text-${props.theme=='light'?'dark':'light'} text-decoration-none`}>
      <span className="fs-4">{ props.theme == "light"? <img src={darklogo} style={{height:"35px"}} /> :  <img src={lightlogo} style={{height:"35px"}} />} Access</span>
    </Link>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      {/* <SidebarItem icon={<FaBell/>} itemNo="0" itemName="Access Requests" status={current} changeStatus={changeCurrent} theme={props.theme}/>
      <SidebarItem icon={<FaThList/>} itemNo="1" itemName="Your Data" status={current} changeStatus={changeCurrent} theme={props.theme}/>
      <SidebarItem icon={<FaPlusCircle/>} itemNo="2" itemName="Request Data" changeStatus={changeCurrent} status={current} theme={props.theme}/>
      <SidebarItem icon={<FaCheckCircle/>} itemNo="3" itemName="Accessible Data" status={current} changeStatus={changeCurrent} theme={props.theme}/> */}
    <Link to="/" className={`nav-link ${current==0 ? "active text-white" : ""} text-${props.theme=='light'?'dark':'light'}`} onClick={()=>changeCurrent(0)}>
    <li className="nav-item">
    {/* <a href="#"  aria-current="page"> */}
        <FaBell/> Access Requests
    {/* </a> */}
  </li>
  </Link>
  <Link to="/yourdata" className={`nav-link ${current==1 ? "active text-white" : ""} text-${props.theme=='light'?'dark':'light'}`} onClick={()=>changeCurrent(1)} >
  <li className="nav-item">
    {/* <a href="#"aria-current="page"> */}
        <FaThList/> Your Data
    {/* </a> */}
  </li>
  </Link>
  <Link to="/requestdata"  className={`nav-link ${current==2 ? "active text-white" : ""} text-${props.theme=='light'?'dark':'light'}`} onClick={()=>changeCurrent(2)}>
  <li className="nav-item">
    {/* <a href="#" aria-current="page"> */}
        <FaPlusCircle/> Request Data
    {/* </a> */}
  </li>
  </Link>
  <Link to="/accessibledata" className={`nav-link ${current==3 ? "active text-white" : ""} text-${props.theme=='light'?'dark':'light'}`} onClick={()=>changeCurrent(3)}>
  <li className="nav-item">
    {/* <a href="#" aria-current="page"> */}
        <FaCheckCircle/> Accessible Data
    {/* </a> */}
  </li>
  </Link>
    </ul>
    <button type="button" className={`btn btn-${props.theme=='light'?'dark':'light'}`} onClick={props.settheme}>{props.theme=="light"?"Dark" : "Light"} Mode</button>
    <hr/>
    <div className="dropdown">
      <div className={`d-flex align-items-center text-${props.theme=='light'?'dark':'light'} text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false" `}>
        <img src="https://github.com/vampdroid.png" alt="" width="32" height="32" className="rounded-circle me-2"/>
        <strong>Yash Kukreja</strong>
        <Link to='/login' className={`text-${props.theme=='light'?'dark':'light'} text-decoration-none`} style={{marginLeft:'40px'}} onClick={()=>handleLogout()}>Logout</Link>
        <br/>
      </div>
      <ul className={`dropdown-menu dropdown-menu-${props.theme} text-small shadow" aria-labelledby="dropdownUser1"`}>
        <li><a className="dropdown-item" href="#">New project...</a></li>
        <li><a className="dropdown-item" href="#">Settings</a></li>
        <li><a className="dropdown-item" href="#">Profile</a></li>
        <li><hr className="dropdown-divider"/></li>
        <li><a className="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
        </>
    )
}