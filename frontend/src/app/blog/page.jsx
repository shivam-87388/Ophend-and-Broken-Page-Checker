import React from 'react'
import Link from 'next/link';

const Blog = () => {
  const blogs = [
    // blog 1
    {
      slug:"understanding-orphan-pages-and-broken-pages-the-ultimate-seo-guide",
      title:"Understanding Orphan Pages and Broken Pages: The Ultimate SEO Guide",
      shortDesc:"A complete SEO guide explaining orphan pages and broken pages, how they affect rankings and traffic, and how fixing them improves website performance.",
      picture:'/blogpicture/Gemini_Generated_Image_49stdm49stdm49st.png'
    },
     //  blog 2
     {
       slug:"what-are-orphan-pages",
       title:"What Are Orphan Pages?",
       shortDesc:"Orphan pages are unlinked website pages that remain invisible to users and search engines, negatively affecting SEO performance.",
       picture:'/blogpicture/Gemini_Generated_Image_b78evgb78evgb78e.png'
      },
      // blog 3
     {
       slug:"What-Are-Broken-Pages",
       title:"What Are Broken Pages?",
       shortDesc:"Broken pages return error codes such as 404 or 500, wasting crawl budget, losing backlinks, and lowering search rankings.",
       picture:'/blogpicture/Gemini_Generated_Image_ee5zz2ee5zz2ee5z.png'
      },
      // blog 4
     {
       slug:"How to Detect Orphan and Broken Pages",
       title:"How to Detect Orphan and Broken Pages",
       shortDesc:"Learn how to identify orphan and broken pages on your website using tools like Google Search Console, Screaming Frog, and manual checks.",
       picture:'/blogpicture/Gemini_Generated_Image_t7fwdlt7fwdlt7fw.png'
      },
      // blog 5 
     {
       slug:"Best-Practices-to-Prevent-Orphan-&-Broken-Pages",
       title:"Best Practices to Prevent Orphan & Broken Pages",
       shortDesc:"To prevent orphan and broken pages, ensure all internal links are properly maintained, use a reliable CMS, and regularly audit your website for broken links.",
       picture:'/blogpicture/Gemini_Generated_Image_49stdm49stdm49st.png'
      },
      // blog 6
     {
       slug:"How-to-Fix-Orphan-Pages-and-Broken-Pages",
       title:"How to Fix Orphan Pages and Broken Pages",
       shortDesc:"Learn how to fix orphan and broken pages on your website using tools like Google Search Console, Screaming Frog, and manual checks.",
       picture:'/blogpicture/Gemini_Generated_Image_49stdm49stdm49st.png'
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
  <article key={blog.slug} className="flex justify-center flex-shrink-0 py-4 bg-white  rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col w-80 focus:outline-hidden ">
      {/* Image */}
      <div className="aspect-[16/12] overflow-hidden bg-gray-100 rounded-2xl">
        <img
          src={blog.picture}
         alt="image"
          
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out
          object-fill w-full h-full rounded-2xl"
        />
      </div>

      {/* Content */}
      <div className="pt-4 ">
        <h2 className="font-[libre-baskerville] font-bold text-xl text-black dark:text-white  ">
          {blog.title}
        </h2>

        
          <p className="mt-1 text-gray-600 dark:text-neutral-400 line-clamp-3">
            {blog.shortDesc}
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