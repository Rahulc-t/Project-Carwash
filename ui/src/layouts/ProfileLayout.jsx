import React from 'react'
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import { Outlet } from 'react-router-dom'

const ProfileLayout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <ToastContainer/>
    </>
  )
}

export default ProfileLayout