'use client'
import { IconUserCircle, IconUsers, IconLogout, IconChevronDown } from '@tabler/icons-react' 
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  //start
 const [user, setUser] = useState(null); 
  const [showDropdown, setShowDropdown] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Hydration error fix
    const storedUser = localStorage.getItem("userInfo");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (e) {
        console.error("Error parsing user data:", e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userInfo"); 
    localStorage.removeItem("token");
    window.location.href = "/signin"; 
  };

  // 🟢 Logic: Naam ke beech mein space laane ke liye aur 'User' hatane ke liye
  const getButtonName = () => {
    if (!user) return "User";
    
    // Agar firstName aur lastName alag hain toh space ke saath jodo
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    
    // Agar sirf firstName hai toh wahi dikhao
    if (user.firstName) return user.firstName;

    // Backup: Agar naam nahi mil raha toh email se 'Shivam' nikaalo
    if (user.email) {
      const emailPart = user.email.split('@')[0];
      return emailPart.replace(/[0-9]/g, ''); 
    }

    return "User";
  };

  // Hydration Match logic
  if (!mounted) return null;
  // end
  return (
    <header className="body-font mt-4 ml-8 mr-8 bg-[#ED6D07] rounded-md ">
      <div className="mx-auto flex flex-col md:flex-row items-center justify-center md:justify-between p-3 gap-4 md:gap-0">
        <img src="/logo/logo.png" alt="logo" className="h-16 w-auto max-w-[180px] object-contain" />
        <nav className="flex flex-col lg:flex-row  justify-center items-center gap-1.5 lg:gap-8 text-center">
          <a href='/' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Home</a>
          <a href='/about-us' className="inline-flex justify-center text-center items-center cursor-pointer hover:bg-red-600 rounded-lg p-2 text-white text-xl font-bold font-['Libre_Baskerville']">AboutUs</a>
          <a href='/orphan-page-checker' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Orphan Page<br />Checker</a>
          <a href='/broken-link-checker' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Broken Link<br />Checker</a>
          <a href='/blog' className="inline-flex items-center justify-center text-center cursor-pointer hover:bg-red-600 rounded-lg  p-2 text-white text-xl font-bold font-['Libre_Baskerville']">Blog</a>
        </nav>
        {/* add */}
       
        {/* login/signup button */}
        <div className="flex flex-col lg:flex-row gap-3.5 relative"> 
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
            <div 
              className="relative group" 
              onMouseEnter={() => setShowDropdown(true)} 
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="inline-flex items-center justify-center bg-white rounded-lg px-5 py-2 gap-2 text-black text-xl font-bold font-['Libre_Baskerville'] cursor-pointer shadow-md min-w-[130px]">
                <IconUserCircle size={30} className="text-[#ED6D07]" />
                <span className="capitalize">{getButtonName()}</span> 
                <IconChevronDown size={20} className={`transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div className="absolute right-0 mt-0 w-64 pt-2 z-50">
                  <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-4 text-left overflow-hidden">
                    <div className="border-b pb-3 mb-3">
                      {/* Dropdown mein Full Name: firstName + lastName */}
                      
                      <p className="text-md text-gray-500 truncate mt-0.5 ">{user.email}</p>
                    </div>
                    
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 text-red-600 hover:bg-red-50 p-2 rounded-lg font-bold transition-all text-base cursor-pointer"
                    >
                      <IconLogout size={20} /> Sign Out
                    </button>
                  </div>
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