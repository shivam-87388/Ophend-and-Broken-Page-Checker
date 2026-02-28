'use client'
import React from 'react'
const Footer = () => {
  return (
  <footer className="bg-[#ED9D05] rounded-tl-[50px] rounded-tr-[50px]">
  <div className="px-5 py-8 mx-auto">
    <div className="flex flex-wrap w-full md:text-left text-center order-first gap-4 lg:gap-0">
      {/* logo section */}
      <div className="flex justify-center lg:justify-start lg:w-1/4 md:w-1/2 w-full h-24 px-4 ">
       <img src="/logo/logo.png"alt="logo"></img>
      </div>
      <div className="flex flex-col items-center lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="font-bold font-['Nunito'] text-xl text-white ">Quick Links
        </h2>
        <nav className=" list-none mt-2 lg:text-start text-center space-y-2.5 items-center">
          <li>
            <a href='/'className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Home</a>
          </li>
          <li>
            <a href='/about-us'className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">About Us</a>
          </li>
          <li>
            <a href='/orphan-page-checker'className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Orphan Page <br/>Checker</a>
          </li>
          <li>
            <a href='/broken-link-checker'className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Broken Link <br/>Checker</a>
          </li>
          <li>
            <a href='/blog'className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Blog</a>
          </li>
        </nav>
      </div>

      {/* social link section */}
      <div className="flex flex-col items-center lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="font-bold font-['Nunito'] text-xl text-white">
          Social Links
        </h2>
        <nav className="list-none mt-2 lg:text-start text-center space-y-2.5 items-center">
          <li>
            <a className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Whatshapp</a>
          </li>
           <li>
            <a className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Instagram</a>
          </li>
          <li>
            <a className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Facebook</a>
          </li>
          <li>
            <a className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">LinkedIn</a>
          </li>
           <li>
            <a href="https://github.com/shivam-87388"target="blank"className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Github</a>
            </li>
             <li>
            <a className="inline-block text-white font-['Nunito'] text-lg cursor-pointer font-semibold transition-transform transform hover:scale-95">Mail</a>
          </li>
        </nav>
      </div>
      <div className="lg:w-1/4 md:w-1/2 w-full px-4">
        <h2 className="text-white font-bold font-['Nunito'] text-xl mb-1">
          Newsletter
        </h2>
        <p className="text-white/90 text-sm mb-3 font-['PT Sans'] mt-2 md:text-left text-center">
          Subscribe to get SEO tips, updates & tools.
        </p>
        <div className="flex xl:flex-nowrap md:flex-nowrap lg:flex-wrap flex-wrap justify-center items-end md:justify-start">
          <div className="relative w-40 sm:w-auto xl:mr-4 lg:mr-0 sm:mr-4 mr-2">
            <label htmlFor="newsletter-email"
              className="sr-only"
            >
             Email address
            </label>
            <input
            type="email"
            id="newsletter-email"
            required
            placeholder="Enter your email"
              className="py-2.5 sm:py-3 px-4 rounded-lg block w-full bg-layer border-layer-line sm:text-sm text-foreground placeholder:text-muted-foreground-1 focus:border-primary-focus focus:ring-primary-focus disabled:opacity-50 border-1 border-black   focus:border-hidden disabled:pointer-events-none"
            />
          </div>
          <button className="py-3 px-4 inline-flex items-center gap-x-2 font-['Nunito'] font-semibold rounded-lg bg-white text-black text-sm hover:bg-red-600 hover:text-white  disabled:opacity-50 cursor-pointer">
            Subscribe
          </button>
        </div>
        
      </div>
    </div>
  </div>
  {/* privicy policy */}
  <div className="bg-gray-100">
    <div className="container py-2 mx-auto flex justify-between items-center sm:flex-row flex-col">
      <p className="text-[#525252] text-md font-bold font-['Nunito'] text-center sm:text-left">© Copyright LinkSentinel 2026. All rights reserved.</p>
    <div className="flex lg:gap-8 gap-2">
         <p className="text-[#525252] text-md font-bold font-['Nunito'] text-center sm:text-left">Terms & Condition</p>
      <p className="text-[#525252] text-md font-bold font-['Nunito'] text-center sm:text-left">Privacy Policy</p>
      </div>

     
      
    </div>
  </div>
</footer>



  ) 
}

export default Footer;