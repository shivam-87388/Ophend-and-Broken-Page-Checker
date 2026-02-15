'use client'
import React from 'react'

const aboutus = () => {
  return (
    <main className='m-8'>
      <h1 className="p-2 text-5xl text-center font-['Roboto Mono']">About-us
      </h1>
      <hr className="border-t-2 border-gray-400 mb-6"></hr>
      {/* pargrapgh section */}
      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
    <p className="text-xl font-['Spectral']">We provide a powerful SEO tool that helps website owners, SEO professionals, and developers identify orphan pages and broken links on their websites.</p>
    <p className="text-xl mt-1.5 font-['Spectral']">Orphan pages are pages that exist on a website but are not linked from any internal page, making them hard for users and search engines to find.</p>
    <p className="text-xl mt-1.5  font-['Spectral']">Broken links are links that return errors or fail to load properly, which can negatively impact user experience and search engine rankings.</p>
    <p className="text-xl mt-1.5 font-['Spectral']">Our goal is to help you maintain a well-structured, SEO-friendly website by detecting these issues quickly and accurately.</p>
      </section>
      {/* What Our Tool Offers section */}
      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl  font-bold font-['Roboto Mono']">What Our Tool Offers?</h2>
        <p className="text-xl font-['Spectral']">Our SEO tool is built to analyze websites efficiently and provide actionable results, including:</p>
        <ol className="list-decimal pl-6 mt-2">
          <li className="text-xl font-['Spectral']">Detection of hidden website issues.</li> 
          <li className="text-xl font-['Spectral']">Analysis of internal structure and crawlability.</li>
          <li className="text-xl font-['Spectral']">Identification of SEO-impacting errors.</li>
          <li className="text-xl font-['Spectral']">Support for better indexing and performance.</li>
        </ol>
      </section>
      {/* Why It Matters section */}
      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
         <h2 className="text-2xl  font-bold font-['Roboto Mono']">Why It Matters</h2>
        <p className="text-xl font-['Spectral']">Search engines prefer websites that are easy to crawl and navigate. Orphan pages and broken pages can block search engine bots and frustrate users. By fixing these issues, you can improve your website’s visibility, rankings, and overall user experience.</p>
      </section>
      {/* our mission section */}
      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
         <h2 className="text-2xl  font-bold font-['Roboto Mono']">Our Mission</h2>
        <p className="text-xl font-['Spectral']">Our mission is to make technical SEO simple, accurate, and accessible for everyone.</p>
        <p className="text-xl font-['Spectral']">We aim to help users understand their website structure better and take informed actions to improve indexing, navigation, and search visibility.</p>
      </section>

      
      


      
      
    </main>
  )
}

export default aboutus;
