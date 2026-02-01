import React from 'react'
import { blogs } from '../data'

const page = ({params}) => {
  const slug = params.slug;
  const blog = blogs.find((blog)=> blog.slug === slug);
  if(!blog){
    return (
      <main className='m-8 bg-gray-200 rounded-2xl p-4'>
        <img src="/page-not-found/page not found.png" alt="Page not found" className="mx-auto w-96 h-96 object-contain"/>
        <h1 className="text-5xl text-center font-['Libre_Baskerville']">Blog not found</h1>
      </main>
    )
  }
  return (
    <main className='m-8 bg-gray-200 rounded-2xl p-4'>
      <h1 className="p-2 mb-6 text-4xl text-start font-semibold font-['Libre_Baskerville']">{blog.title}</h1>

      <div className="flex  justify-center   overflow-hidden mb-6">
        <img src={blog.picture} alt={blog.title} className='object-fill w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96 '/>

      </div>
      
    
      <p className="text-2xl font-['Rosario'] whitespace-pre-line">{blog.description}</p>
    </main>
  ); 

  
}

export default page;