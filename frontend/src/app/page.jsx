'use client'
import React from 'react'

const Homepage = () => {
  return (
    
 <div className="m-8 bg-[#fcfcfb] rounded-br-[135px] p-8 shadow-2xl">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">

    {/* Left Content */}
    <div>
      <h1 className="text-6xl font-bold font-['Libre_Baskerville'] leading-tight">
        <span className="text-black">
          Your Website <br /> Health
        </span>{' '}
        <span className="text-[#EE0D0C]">
          Checker — <br /> Fast & Accurate
        </span>
      </h1>
    </div>

    {/* Right Image */}
    <div className="flex justify-end">
      <img
        src="/image/hero.png.png"
        alt="Website Health Checker"
        className="w-[420px] h-auto object-contain"
      />
    </div>

  </div>
</div>


  )
}

export default Homepage