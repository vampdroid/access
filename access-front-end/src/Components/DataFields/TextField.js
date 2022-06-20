import React from 'react'

export const TextField = (props) => {

    function saveDetails(e)
    {
        localStorage.setItem(`name-${props.key}`,document.getElementById(`val-${props.key}`).value);
    }
  return (
    <div className='form-inline m-3'>
      {console.log(props.keyval)}
    <input id={`name-${props.keyval}`} className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type="textBox" placeholder='Field Name'/> : <input id={`value-${props.keyval}`} className={`d-inline form-control w-25 bg-${props.theme} text-${props.theme=="dark" ? "light" : "dark"}`} type={`${props.field}`} placeholder='Field Value'/> <button type="button" className="btn btn-primary btn-sm" onClick={()=>saveDetails()}>Save</button>
    </div>
  )
}
