'use client'
import React from 'react'
const Footer = () => {
  return (
  
<footer className="mt-auto bg-[#ED9D05] rounded-tl-[50px] rounded-tr-[50px]">
  <div className="mt-auto w-full max-w-[85rem] sm:px-6 p-4 mx-auto">
     {/* Grid */}
    <div className="grid lg:grid-cols-4 gap-6">
      <div className=" flex justify-center col-span-full lg:col-span-1">
        <img src="/logo/logo.png" alt="logo" className="h-24  w-auto max-w-[180px] object-contain"/>
      </div>
      {/* End Col */}

      <nav aria-label="Footer Navigation" className=" col-span-1">
        <h4 className="font-bold font-['Libre_Baskerville'] text-center text-xl text-white ">Quick Links</h4>
         <ul className="mt-2 text-center">
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-lg font-semibold ">Home</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-lg font-semibold ">About us</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-lg font-semibold ">Orphan Page <br/>Checker</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-lg font-semibold ">Broken Link <br/>Checker</a></li>
        <li><a href='/' className="transition duration-300 hover:scale-90 text-white font-['Libre_Baskerville'] text-lg font-semibold ">Blog</a></li>
      </ul>
      </nav>
      {/* End Col */}

      <nav aria-label="Footer Navigation" className=" col-span-1">
        <h4 className="text-white font-bold font-['Libre_Baskerville'] lg:text-center text-xl">Quick Links</h4>
          <ul className="mt-3 grid">
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
           <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/github logo.png" alt="Github" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">Github</span></a>
          </li>
          <li>
             <a href="#" className="inline-flex items-center transition duration-300 hover:scale-90 gap-1.5"><img src="/socialmedia-icon/gmail logo.png" alt="mail" className="w-10"/> <span className="text-white font-['Libre_Baskerville'] text-lg font-semibold">Mail</span></a>
          </li>
      </ul>
      </nav>
 {/* Newsletter */}
      <div className="col-span-full md:col-span-2 lg:col-span-1">
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
      className="flex-1 px-4 py-2 rounded-md border border-zinc-700 "
    />

    <button
      type="submit"
      className="bg-white text-md font-bold font-['Libre_Baskerville'] cursor-pointer rounded-[5px] p-2"
    >
      Subscribe
    </button>

  </form>
</div>




    </div>
  </div>
</footer>

  ) 
}

export default Footer;