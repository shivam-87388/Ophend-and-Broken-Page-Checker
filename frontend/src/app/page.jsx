'use client'
import React from 'react'
import { IconFileSearch , IconLinkOff } from "@tabler/icons-react";

const Homepage = () => {
  return (
  <main className="m-8">
    {/* herosection */}
    <section className="bg-gray-100  rounded-2xl shadow-md">
  <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-8 lg:grid-cols-12">
    <div className="mr-auto place-self-center lg:col-span-7">
      <h1 className="max-w-2xl mb-4 font-extrabold tracking-tight font-['Nunito'] leading-tight text-4xl md:text-6xl dark:text-white">
        Your Website
Health Checker
— Fast & Accurate
      </h1>
      <p className="max-w-2xl mb-6 font-['PT Sans'] text-gray-800 lg:mb-8 md:text-lg leading-relaxed">
       Scan your website for orphaned pages and broken links with our fast and accurate tools.
      </p>
      <div className='flex flex-col md:flex-row gap-6 w-fit'>
         <a
        href="/broken-link-checker"
        className="inline-flex  items-center justify-center px-5 py-3 text-lg font-['Nunito'] font-medium text-center  rounded-lg text-white  bg-red-600 ring-2 ring-red-600 ring-offset-2 cursor-pointer transition-transform transform hover:scale-95"
      > 
        Broken Link
        <IconLinkOff size={30} className="ml-2"/>   
      </a>
      <a
        href="/orphan-page-checker"
        className="inline-flex  items-center justify-center px-5 py-3 text-lg font-['Nunito'] font-medium text-center  rounded-lg text-white  bg-zinc-500 ring-2 ring-zinc-500 ring-offset-2 cursor-pointer transition-transform transform hover:scale-95"
      >
        Orphan Page
        <IconFileSearch size={30} className="ml-2"/>  
      </a>
      </div>
     
      
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
      <p className="text-base md:text-lg mt-2 p-4 font-['PT Sans']">Maintain your website’s quality with smart scanning tools designed for speed, accuracy, and simplicity. Your website deserves to stay clean, organized, and error-free.</p>
    <hr className="border-t-2 border-gray-300 "></hr>
    {/* Features section */}
    <section className="mt-4 bg-gray-100 p-4 rounded-2xl">
      <h2 className="text-3xl md:text-4xl font-semibold font-['Nunito'] mb-1.5">Features Section</h2>
      <h3 className="text-xl md:text-2xl font-medium font-['Nunito'] mb-1.5">Powerful Features for Better SEO</h3>
        <ul className="space-y-2 pl-2">
          <li>
            <h4 className="text-lg md:text-xl font-semibold font-['Nunito']">Orphan Page Checker
            </h4>
            <p className="text-base md:text-lg font-['PT Sans']">Find pages that exist on your website but are not linked internally, making them invisible to users and search engines.
            </p>
          </li>
          <li>
            <h4 className="text-lg md:text-xl font-semibold font-['Nunito']">Broken Link Checker
            </h4>
            <p className="text-base md:text-lg font-['PT Sans']">Detect broken pages and links that return errors such as 404 or server issues.
            </p>
          </li>
          <li>
            <h4 className="text-lg md:text-xl font-semibold font-['Nunito']">Fast Website Scanning
            </h4>
            <p className="text-base md:text-lg font-['PT Sans']">Get accurate results within seconds using our optimized scanning system.
            </p>
          </li>
        </ul>
    </section>
{/* how it works section */}
    <section className="mt-4 bg-gray-100 p-4 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold font-['Nunito']">How It Works</h2>
        <ol className="list-decimal pl-6 mt-2 text-base md:text-lg font-['PT Sans']">
        <li>
          Select the tool you want to use (Orphan page checker or Broken link checker).
        </li>
        <li>
          Enter your website URL
        </li>
        <li>
          We analyze your website
        </li>
        <li>
          View a detailed report with detected issues
        </li>
        </ol>
    </section>
  </main>


  )
}

export default Homepage;