import React from 'react'
import { Link } from 'react-router-dom'

export const SidebarItem = (props) => {
  return (
    <li className="nav-item">
    <a href="#" className={`nav-link ${props.status == props.itemNo ? "active" : ""} text-${props.theme=='light'?'dark':'light'}`} onclick={()=>props.changeStatus(props.itemNo)} aria-current="page">
      
      {props.icon} {props.itemName}
    </a>
  </li>
  )
}
