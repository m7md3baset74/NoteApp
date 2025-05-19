import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout() {
  return (
    <>
    <Navbar/>
  <div className="p-4 sm:ml-64">
    <Outlet/>
  </div>





    </>
  )
}
