'use client'
import { IconUserCircle, IconUsers, IconLogout, IconChevronDown } from '@tabler/icons-react' 
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [user, setUser] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false);

  // 🟢 Highlight: Page load hote hi localStorage se user info nikalne ka logic
  useEffect(() => {
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 🟢 Highlight: Logout function jo data clear karke page refresh karega
  const handleLogout = () => {
    localStorage.clear(); 
    window.location.reload(); 
  };
  return (
    <header className="body-font mt-4 ml-8 mr-8 bg-[#ED6D07] rounded-md ">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between p-3 gap-4 md:gap-0">
        <img src="/logo/logo.png" alt="logo" className="h-16 w-auto max-w-[180px] object-contain" />
        <nav className="flex flex-col lg:flex-row  justify-center items-centergap-1.5 lg:gap-8 text-center">
          <a href='/' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Home</a>
          <a href='/about-us' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg p-2 text-white text-xl font-bold font-['Libre_Baskerville']">AboutUs</a>
          <a href='/orphan-page-checker' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Orphan Page<br />Checker</a>
          <a href='/broken-link-checker' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Broken Link<br />Checker</a>
          <a href='/blog' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Blog</a>
        </nav>
        {/* login/signup button */}
        <div className="flex flex-col lg:flex-row gap-3.5 relative">
          
          {/* 1. AGAR USER LOGIN NAHI HAI */}
          {!user ? (
            <>
              <a href='/createaccount' className="inline-flex text-center items-center justify-center hover:bg-red-600 bg-white rounded-lg px-5 py-2 text-black hover:text-white text-xl font-bold font-['Libre_Baskerville']">
                <IconUsers size={30} />Signup
              </a>
              <a href='/signin' className="inline-flex text-center items-center justify-center hover:bg-red-600 rounded-lg bg-white hover:text-white px-5 py-2 gap-1 text-black text-xl font-bold font-['Libre_Baskerville']">
                <IconUserCircle size={30} />Login
              </a>
            </>
          ) : (
            /* 2. 🟢 ADDED: AGAR USER LOGIN HAI (Naya Profile Section) */
            <div className="relative group" onMouseLeave={() => setShowDropdown(false)}>
              
              {/* User Button: Hover karte hi dropdown khulega */}
              <button 
                onMouseEnter={() => setShowDropdown(true)}
                className="inline-flex items-center justify-center bg-white rounded-lg px-5 py-2 gap-2 text-black text-xl font-bold font-['Libre_Baskerville'] cursor-pointer shadow-md"
              >
                <IconUserCircle size={30} />
                {/* 🟢 User ka sirf pehla naam dikhayega */}
                <span>{user.name.split(' ')[0]}</span> 
                <IconChevronDown size={20} />
              </button>

              {/* 🟢 ADDED: Dropdown Menu (Name, Email, Signout) */}
              {showDropdown && (
                <div className="absolute right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4 transition-all">
                  <div className="border-b pb-3 mb-3 text-left">
                    <p className="text-sm font-bold text-gray-800">{user.name}</p>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  
                  {/* Sign Out Button logic */}
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg font-bold transition-all cursor-pointer"
                  >
                    <IconLogout size={20} /> Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

  


export default Navbar;