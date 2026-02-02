'use client'
import React from 'react'

const Homepage = () => {
  return (
  <main className="m-8">
    {/* herosection */}
    <section className="bg-gray-100  rounded-2xl">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4  font-extrabold tracking-tight font-['Libre_Baskerville'] leading-none lg:text-6xl text-5xl   dark:text-white">
        Your Website
Health Checker
— Fast & Accurate
      </h1>
      <p className="max-w-2xl mb-6 font-light font-['Rosario'] text-gray-800 lg:mb-8 lg:text-3xl text-2xl dark:text-gray-400">
       Scan your website for orphaned pages and broken links with our fast and accurate tools.
      </p>
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-xl font-['Libre_Baskerville'] font-medium text-center text-black rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-transparent hover:ring-2 hover:ring-red-600 hover:ring-offset-2 transition-all duration-200"
      > 
        Broken Link
        <br/>
        Checker
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </a>
      <a
        href="#"
        className="inline-flex items-center justify-center px-5 py-3 lg:mt-0 mt-2 font-['Libre_Baskerville'] text-xl font-medium text-center text-black border-2 border-gray-400 rounded-lg hover:bg-gray-200 transition-all duration-200 "
      >
        Orphan page
        <br/>
        Checker
      </a>
    </div>
    <div className=" mt-8 lg:mt-0 lg:col-span-5 lg:flex">
      <img
        src="/image/1770046977255.png"
        alt="mockup"
        className='rounded-lg'
      />
    </div>
  </div>
</section>
    {/* hero section close */}
    {/* paragraph section */}
    <div className='mt-4 p-4'>
      <p className="text-left text-black text-2xl md:text-3xl font-['Rosario']">Maintain your website’s quality with smart scanning tools designed for speed, accuracy, and simplicity. Your website deserves to stay clean, organized, and error-free.</p>
    </div>
    <hr className="border-t-2 border-gray-400"></hr>
    {/* Features section */}
    <section className="mt-4 bg-gray-100 p-4 rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Features Section</h2>
      <h3 className="mt-2 text-2xl md:text-3xl font-semibold font-['Libre_Baskerville']">Powerful Features for Better SEO</h3>
        <ul className="mt-2 space-y-2 pl-2">
          <li>
            <h4 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Orphan Page Checker
            </h4>
            <p className="text-xl md:text-2xl font-['Rosario']">Find pages that exist on your website but are not linked internally, making them invisible to users and search engines.
            </p>
          </li>
          <li>
            <h4 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Broken Link Checker
            </h4>
            <p className="text-xl md:text-2xl font-['Rosario']">Detect broken pages and links that return errors such as 404 or server issues.
            </p>
          </li>
          <li>
            <h4 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Fast Website Scanning
            </h4>
            <p className="text-xl md:text-2xl font-['Rosario']">Get accurate results within seconds using our optimized scanning system.
            </p>
          </li>
        </ul>
    </section>
{/* how it works section */}
    <section className="mt-4 bg-gray-100 p-4 rounded-2xl">
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
    </section>
  </main>


  )
}

export default Homepage