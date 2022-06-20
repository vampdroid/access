import React from 'react'
import { FaExclamationTriangle } from 'react-icons/fa'

export const DangerAlert = (props) => {
    return (
        <div style={{height:"33px"}}>
         {props.text && <div className="alert alert-primary d-flex align-items-center" style={{height:"10px"} }role="alert">
                <FaExclamationTriangle/>   
                <div>
                     {props.text}
                </div>
            </div> }
        </div>
    )
}
