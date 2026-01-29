import React from 'react'
import { blogs } from '../data'

const page = ({params}) => {
  const slug = params.slug;
  const blog = blogs.find((blog)=> blog.slug === slug);
  if(!blog){
    return <h1 className='text-5xl text-center'>Blog not found</h1>
  }
  return (
    <main className='m-8 bg-gray-200 rounded-2xl p-4'>
      <h1 className="p-2 mb-6 text-5xl text-center font-['Libre_Baskerville']">{blog.title}</h1>
      <img src={blog.picture} alt={blog.title} className=' w-auto h-96 object-fill  rounded-2xl'/>
    
      <p className=''>{blog.description}</p>
    </main>
  ); 

  
}

export default page;