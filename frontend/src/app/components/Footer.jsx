import React from 'react'
const Footer = () => {
  return (
   <footer className=" bg-[#ED9D05] rounded-tl-[50px] rounded-tr-[50px]">
  <div className="container p-6 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
    {/* logo section */}
    <div className="flex items-center w-64 flex-shrink-0 md:mx-0 mx-auto   md:text-left">
       <img src="/logo/logo.png" alt="logo" className="w-90 "/>
    </div>

    <div className="lg:w-1/4 md:w-1/2 w-full px-4 ">
        <h2 className="font-bold font-['Libre_Baskerville'] text-center text-white tracking-widest text-xl mb-3">Quick Links</h2>
        <nav className="list-none mb-10 items-center text-center">
          <li>
            <a href='#' className="text-white font-['Libre_Baskerville'] text-xl font-semibold ">Home</a>
          </li>
          <li>
            <a href='#' className="text-white font-['Libre_Baskerville'] text-xl font-semibold ">About us</a>
          </li>
          <li>
            <a href='#' className="text-white font-['Libre_Baskerville'] text-xl font-semibold  ">Orphan Page <br/>Checker</a>
          </li>
          <li>
            <a href='#' className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Broken Link <br/>Checker</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="font-bold font-['Libre_Baskerville'] text-start text-white tracking-widest text-xl mb-3">Social Links</h2>
        <nav className="list-none mb-10 text-start">
          <li>
            <img src="/socialmedia-icon/whatsapp logo.png" alt="whatsapp" className="w-8 h-8 inline-block mr-2"/>
            <a className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Whatshapp</a>
          </li>
          <li>
            <img src="/socialmedia-icon/instagram logo.png" alt="instagram" className="w-8 h-8 inline-block mr-2"/>
            <a className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Instagram</a>
          </li>
          <li>
            <img src="/socialmedia-icon/facebook logo.png" alt="facebook" className="w-8 h-8 inline-block mr-2"/>
            <a className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Facebook</a>
          </li>
          <li>
            <img src="/socialmedia-icon/linkedin logo.png" alt="linkedin" className="w-8 h-8 inline-block mr-2"/>
            <a className="text-white font-['Libre_Baskerville'] text-xl font-semibold">LinkedIn</a>
          </li>
          <li>
            <img src="/socialmedia-icon/github logo.png" alt="linkedin" className="w-8 h-8 inline-block mr-2"/>
            <a className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Github</a>
          </li>
          <li>
            <img src="/socialmedia-icon/gmail logo.png" alt="mail" className="w-8 h-8 inline-block mr-2"/>
            <a className="text-white font-['Libre_Baskerville'] text-xl font-semibold">Mail</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4 flex justify-center items-center"> 
        <button className="bg-white rounded-[5px] p-2 text-black text-xl font-bold font-['Libre_Baskerville'] cursor-pointer hover:">Submit</button>

      </div>

    
  </div>
  <div className="bg-gray-100">
    <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <p className="text-gray-500 font-['Libre_Baskerville'] text-md text-center sm:text-left">© 2026 LinkSentinel</p>
      <span className='inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start'>
        <a href='#' className="text-gray-500 font-['Libre_Baskerville']">Terms & Conditions</a>
        <a href='#' className="ml-4 text-gray-500 font-['Libre_Baskerville']">Privacy Policy</a>
      </span>
    </div>
  </div>
</footer>
  ) 
}

export default Footer;