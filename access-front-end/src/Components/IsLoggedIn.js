import React from 'react'
import { Login } from '../Pages/Login/Login';

export const IsLoggedIn = () => {

  return (
   <>
   {
       localStorage.getItem('isLogin') ?
       "" : <Login/> 
        }
   </>
  )
}
