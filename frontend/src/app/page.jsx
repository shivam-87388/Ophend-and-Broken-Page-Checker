'use client'
import React from 'react'

const Homepage = () => {
  return (
  <main className="m-8">
    {/* herosection */}
    <section className=" mt-4 gap-4 bg-gray-200 p-4 rounded-2xl  ">
      <div className="flex  md:flex-row flex-col items-center justify-between  gap-8">
        <div className="flex-1 ">
          <div >
            <h1 className=" text-left text-4xl md:text-5xl font-bold font-['Libre_Baskerville']  text-black">Your Website<br/> Health <span className='text-[#EE0D0C]'>Checker <br/>—Fast &Accurate</span></h1>
          </div>
          {/* buttons section */}
          <div className="flex gap-2 mt-2 flex-wrap ">
            <a href="#" className="text-center bg-[#EE0D0C] text-white p-2 rounded-lg inline-block  cursor-pointer transition-all duration-300 hover:scale-105 text-xl font-bold font-['Libre_Baskerville']">Check Orphan <br/>Page</a>
            <a href="#" className="text-center bg-[#EE0D0C] text-white p-2 rounded-lg inline-block cursor-pointer transition-all duration-300 hover:scale-105 text-xl  font-bold font-['Libre_Baskerville']">Broken Link <br/>Checker</a>
          </div>

        </div>

         {/* img section */}
        <div className=" flex-1 flex justify-center">
        <img src="/image/hero.png.png" alt="heroimage" className="w-full max-w-sm md:max-w-md"/>
        </div>
      </div>
      {/* hero section paragraph */}
      <div className="flex-wrap ">
        <p className=" text-2xl md:text-3xl font-['Rosario']">Scan your website for orphaned pages and broken links with our fast and accurate tools.</p>
      </div>

    </section>
    

    <div className='mt-4 p-4 flex-wrap'>
      <p className="text-left text-black text-2xl md:text-3xl font-['Rosario']">Maintain your website’s quality with smart scanning tools designed for speed, accuracy, and simplicity. Your website deserves to stay clean, organized, and error-free.</p>
      <hr className="border-gray-400"></hr>
    </div>

    {/* Features section */}
    <section className="mt-4 flex-wrap bg-gray-200 p-4 rounded-2xl">
      <h2 className="text-4xl md:text-5xl font-bold font-['Libre_Baskerville']">Features Section</h2>
      <h3 className="mt-2 text-3xl md:text-4xl font-bold font-['Libre_Baskerville']">Powerful Features for Better SEO</h3>
      <div className="mt-2 flex flex-col gap-2">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Orphan Page Checker</h3>
          <p className="text-xl md:text-2xl font-['Rosario']">Find pages that exist on your website but are not linked internally, making them invisible to users and search engines.</p>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Broken Link Checker</h3>
          <p className="text-xl md:text-2xl font-['Rosario']">Detect broken pages and links that return errors such as 404 or server issues.</p>
        </div>  
        <div>
          <h3 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Fast Website Scanning</h3>
          <p className="text-xl md:text-2xl font-['Rosario']">Get accurate results within seconds using our optimized scanning system.</p>
        </div>
      </div>
    </section>

    <section className="mt-4 flex-wrap bg-gray-200 p-4 rounded-2xl">
      <div className="">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">How It Works</h2>
        <ol className="list-decimal pl-6 mt-2 gap-2">
          <li className="text-xl md:text-2xl font-['Rosario']">
          Select the tool you want to use (Orphan page checker or Broken link checker).
        </li>
        <li className="text-xl md:text-2xl font-['Rosario']">
          Enter your website URL
        </li>
        <li className="text-xl md:text-2xl font-['Rosario']">
          We analyze your website
        </li>
        <li className="text-xl md:text-2xl font-['Rosario']">
          View a detailed report with detected issues
        </li>
        </ol>
        
      </div>
  
    </section>
        


    
    

  </main>


  )
}

export default Homepage