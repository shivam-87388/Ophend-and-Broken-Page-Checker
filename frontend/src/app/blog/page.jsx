import React from 'react'
import Link from 'next/link';

const Blog = () => {
  const blogs = [
    // blog 1
    {
      id: 1,
      title:"Understanding Orphan Pages and Broken Pages: The Ultimate SEO Guide",
      desc:"In today’s digital age, having a website is just the first step. To rank well on search engines like Google, a website must be technically sound, user-friendly, and SEO optimized. One of the most overlooked technical SEO issues is the presence of orphan pages and broken pages.",
      picture:'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=560&auto=format&fit=crop'
    },
     //  blog 2
     {
       id: 2,
       title:"What Are Orphan Pages?",
       desc:"desc2",
       picture:'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=560&auto=format&fit=crop'
      },
      // blog 3
     {
       id: 3,
       title:"title 3",
       desc:"desc3",
       picture:'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=560&auto=format&fit=crop'
      },
      // blog 4
     {
       id: 4,
       title:"title 4",
       desc:"desc4",
       picture:'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=560&auto=format&fit=crop'
      },
      // blog 5 
     {
       id: 5,
       title:"title 5",
       desc:"desc5",
       picture:'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=560&auto=format&fit=crop'
      },
      // blog 6
     {
       id: 6,
       title:"title 6",
       desc:"desc6",
       picture:'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=560&auto=format&fit=crop'
      },
      
      
       
  ]
  return (
    <main className='m-8'>
      <h1 className="p-2 mb-6 text-5xl text-center font-['Libre_Baskerville']">Blog
        <hr className=""></hr>
      </h1>
      <section className='p-4 bg-gray-200 rounded-2xl'>
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-auto">
  <div className="grid grid-cols-3 gap-8 min-w-max ">

{ blogs.map(blog => (
  <article key={blog.id} className="flex justify-center  flex-shrink-0 p-4 bg-white  rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <Link
      href={`/blog/${blog.id}`}
      className="group flex flex-col w-80 focus:outline-hidden ">
      {/* Image */}
      <div className="aspect-[16/12] overflow-hidden bg-gray-100 rounded-2xl">
        <img
          src={blog.picture}
         alt="image"
          
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out
          object-cover w-full h-full rounded-2xl"
        />
      </div>

      {/* Content */}
      <div className="pt-4 ">
        <h2 className="font-[libre-baskerville] font-bold text-xl text-black dark:text-white  ">
          {blog.title}
        </h2>

        
          <p className="mt-1 text-gray-600 dark:text-neutral-400 line-clamp-3">
            {blog.desc}
          </p>
        
      </div>
    </Link>
  </article>
))}


  </div>
</div>
        
         
      </section>

    </main>
    
   
  )
}

export default Blog;