'use client'
import React from 'react'
const Footer = () => {
  return (
  
<footer className="mt-auto bg-[#ED9D05] rounded-tl-[50px] rounded-tr-[50px]">
  <div className="mt-auto w-full max-w-[85rem] sm:px-6 p-4 mx-auto">
     {/* Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className=" flex justify-center col-span-full lg:col-span-1">
        <img src="/logo/logo.png" alt="logo" className="h-24  w-auto max-w-[180px] object-contain"/>
      </div>
      {/* End Col */}

      <nav aria-label="Footer Navigation" className=" col-span-1 flex flex-col items-center text-center ">
        <h4 className="font-bold font-['Libre_Baskerville']  text-xl text-white ">Quick Links</h4>
         <ul className="mt-2 grid gap-3 place-items-center ">
        <li><a href='/' className="inline-block text-white font-['Libre_Baskerville'] text-lg font-semibold transition-transform transform hover:scale-95">Home</a></li>
        <li><a href='/about-us' className="inline-block text-white font-['Libre_Baskerville'] text-lg font-semibold transition-transform transform hover:scale-95">About us</a></li>
        <li><a href='/orphan-page-checker' className="inline-block text-white font-['Libre_Baskerville'] text-lg font-semibold transition-transform transform hover:scale-95">Orphan Page <br/>Checker</a></li>
        <li><a href='/broken-link-checker' className="inline-block text-white font-['Libre_Baskerville'] text-lg font-semibold transition-transform transform hover:scale-95">Broken Link <br/>Checker</a></li>
        <li><a href='/blog' className="inline-block text-white font-['Libre_Baskerville'] text-lg font-semibold transition-transform transform hover:scale-95">Blog</a></li>
      </ul>
      </nav>
      {/* End Col */}

      <nav aria-label="Footer Navigation" className="col-span-1 flex flex-col items-center text-center">
        <h4 className="text-white font-bold font-['Libre_Baskerville'] text-xl ">Social Links</h4>
          <ul className="mt-2 flex flex-col items-start ">
         <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/whatsapp logo.png" alt="Whatshapp" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">Whatshapp</span></a>
          </li>
          <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/facebook logo.png" alt="Facebook" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">Facebook</span></a>
          </li>
          <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/instagram logo.png" alt="Instagram" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">Instagram</span></a>
          </li>
          <li>
            <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/linkedin logo.png" alt="LinkedIn" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">LinkedIn</span></a>
          </li>
          <li>
           <a href="https://github.com/shivam-87388" target='blank' className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/github logo.png" alt="Github" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">Github</span></a>
          </li>
          <li>
             <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/gmail logo.png" alt="mail" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">Mail</span></a>
          </li>
      </ul>
      </nav>
 {/* Newsletter */}
      <div className="md:col-span-2 lg:col-span-1 flex flex-col items-center text-center lg:items-start lg:text-left">
  <h4 className="text-white font-bold font-['Libre_Baskerville'] text-xl  mb-1">
    Newsletter
  </h4>

  <p className="text-white/90 text-sm mb-3">
    Subscribe to get SEO tips, updates & tools.
  </p>

  <form className="flex items-center gap-2">

    <label htmlFor="newsletter-email" className="sr-only">
      Email address
    </label>

    <input
      type="email"
      id="newsletter-email"
      required
      placeholder="Enter your email"
      className="w-full px-4 py-2 rounded-[5px] border border-black/30 outline-none  focus:ring-1 hover:ring-2 "
    />

    <button
      type="submit"
      className="bg-white text-black font-bold font-['Libre_Baskerville'] px-4 py-2 rounded-md cursor-pointer hover:bg-red-600 hover:text-white transition"
    >
      Subscribe
    </button>

  </form>
</div>

    </div>
    
  </div>
  {/* privicy policy | terms and conditions */}
  <div className="flex justify-between items-center bg-white w-full  mx-auto py-2 px-5 flex-wrap flex-col sm:flex-row md:gap-2">
      <p className="text-[#525252] text-md font-bold font-['Libre_Baskerville'] text-center sm:text-left">© Copyright LinkSentinel 2026. All rights reserved.</p>
      <div className="flex lg:gap-8 gap-2">
         <p className="text-[#525252] text-md font-bold font-['Libre_Baskerville'] text-center sm:text-left">Terms & Condition</p>
      <p className="text-[#525252] text-md font-bold font-['Libre_Baskerville'] text-center sm:text-left">Privacy Policy</p>
      </div>
     
      
  </div>
</footer>

  ) 
}

export default Footer;