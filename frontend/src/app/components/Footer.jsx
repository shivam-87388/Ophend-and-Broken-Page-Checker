'use client'
import React from 'react'
const Footer = () => {
  return (
   <footer className="bg-[#ED9D05] rounded-tl-[50px] rounded-tr-[50px] p-4">
    <div className="flex lg:flex-row flex-col items-center lg:justify-between">
      <div className="">
        <img src="/logo/logo.png" alt="logo" className="h-24 w-auto max-w-[180px] object-contain ml-8 mt-4 mb-4"/>
      </div>
     <nav aria-label="Footer Navigation" className="align-center">
      <h2 className="font-bold font-['Libre_Baskerville'] text-center text-white tracking-widest text-xl mb-3">Quick Links</h2>
      <ul className="">
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-xl font-semibold ">Home</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-xl font-semibold ">About us</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-xl font-semibold ">Orphan Page <br/>Checker</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-xl font-semibold ">Broken Link <br/>Checker</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-xl font-semibold ">Blog</a></li>
      </ul>
     </nav>
    <nav aria-label="Footer Navigation" className="align-center">
      <h2 className="font-bold font-['Libre_Baskerville'] text-center text-white tracking-widest text-xl mb-3">Social Links</h2>
      <ul className="">
         <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/whatsapp logo.png" alt="Whatshapp" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Whatshapp</span></a>
          </li>
          <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/facebook logo.png" alt="Facebook" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Facebook</span></a>
          </li>
          <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/instagram logo.png" alt="Instagram" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Instagram</span></a>
          </li>
          <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/linkedin logo.png" alt="LinkedIn" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-xl font-semibold">LinkedIn</span></a>
          </li>
          <li>
           <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/github logo.png" alt="Github" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Github</span></a>
          </li>
          <li>
             <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/gmail logo.png" alt="mail" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Mail</span></a>
          </li>
      </ul>
    </nav>
    
     

        

     

    </div>

   </footer>
  ) 
}

export default Footer;