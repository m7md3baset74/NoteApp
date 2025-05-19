import React, { createContext, useContext, useEffect, useState } from 'react'



export const UserContext = createContext();


export default function UserContextProvider({children}) {
  let [token,setToken] = useState(null);
  useEffect(()=>{
    if(localStorage.getItem('token')!=null){
      setToken(localStorage.getItem('token'))
    }
  },[])
  return (
    <>
    <UserContext.Provider value={{token , setToken}}>
      {children}
    </UserContext.Provider>
    </>
  )
}
