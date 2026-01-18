'use client'
import { IconUser, IconUserCircle, IconUsers } from '@tabler/icons-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className="body-font mt-4 ml-8 mr-8 bg-[#ED6D07] rounded-md ">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between p-3 gap-4 md:gap-0">
        <img src="/logo/logo.png" alt="logo" className="h-16 w-auto max-w-[180px] object-contain" />
        <nav className="flex flex-col lg:flex-row  justify-center items-centergap-1.5 lg:gap-8 text-center">
          <a href='/' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Home</a>
          <a href='/about-us' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg p-2 text-white text-xl font-bold font-['Libre_Baskerville']">AboutUs</a>
          <a href='' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Orphan Page<br />Checker</a>
          <a href='' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Broken Link<br />Checker</a>
          <a href='' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Blog</a>
        </nav>
        {/* login/signup button */}
        <div className="flex flex-col lg:flex-row gap-3.5">
          <a href='/createaccount' className="inline-flex text-center items-center justify-center  hover:bg-amber-500 rounded-lg hover:outline-none outline-1 outline-offset-[-1px] outline-white px-5 py-2 text-white text-xl font-bold font-['Libre_Baskerville']"><IconUsers size={30} />Signup</a>
          <a href='/signin' className="inline-flex text-center items-center justify-center  hover:bg-amber-500 rounded-lg hover:outline-none outline-1 outline-offset-[-1px] outline-white px-5 py-2 gap-1 text-white text-xl font-bold font-['Libre_Baskerville']"><IconUserCircle className="" size={30} />Login
          </a>
        </div>
      </div>
    </header>

  )
}

export default Navbar;