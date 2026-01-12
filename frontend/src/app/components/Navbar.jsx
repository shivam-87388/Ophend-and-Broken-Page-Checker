'use client'
import { IconUser, IconUserCircle, IconUsers } from '@tabler/icons-react'
import React from 'react'

const Navbar = () => {
  return (
    <header className=" body-font">
  <div className="container mx-auto flex flex-wrap p-2 flex-col md:flex-row items-center">
      <img src="/logo/logo.png" alt="logo" className="w-60 "/>
    <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center gap-8">
       <a href='/' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg hover:text-white p-2 text-black text-xl font-bold font-['Libre_Baskerville']">Home</a>
       <a href='/about-us' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg hover:text-white p-2 text-black text-xl font-bold font-['Libre_Baskerville']">AboutUs</a>
       <a href='' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg hover:text-white p-2 text-black text-xl font-bold font-['Libre_Baskerville']">Orphan Page<br/>Checker</a>
       <a href='' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg hover:text-white p-2 text-black text-xl font-bold font-['Libre_Baskerville']">Broken Link<br/>Checker</a>
      <a href='' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg hover:text-white p-2 text-black text-xl font-bold font-['Libre_Baskerville']">Blog</a>
    </nav>
{/* login/signup button */}
    <div className="flex justify-end items-center gap-3.5">
      <a href='/createaccount' className="inline-flex text-center items-center justify-center hover:text-white hover:bg-amber-500 rounded-lg hover:outline-none outline-1 outline-offset-[-1px] outline-orange-600 px-5 py-2 text-black text-xl font-bold font-['Libre_Baskerville']"><IconUsers size={30}/>Signup</a>
    <a href='/signin' className="inline-flex text-center items-center justify-center hover:text-white hover:bg-amber-500 rounded-lg hover:outline-none outline-1 outline-offset-[-1px] outline-orange-600 px-5 py-2 gap-1 text-black text-xl font-bold font-['Libre_Baskerville']"><IconUserCircle className="" size={30}/>Login
     </a>
    </div>
  </div>
</header>

  )
}

export default Navbar