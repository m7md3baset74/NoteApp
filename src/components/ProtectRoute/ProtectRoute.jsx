import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectRoute({children}) {

  let token = localStorage.getItem('token');
  if(token==null){
    return <Navigate to='/logen'/>
  }

  return (
    <>
    {children}
    </>
  )
}
