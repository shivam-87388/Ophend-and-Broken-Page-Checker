import React from 'react'
import Link from 'next/link';

const Blog = () => {
  const blogs = [
    {
       slug:"understanding-orphan-pages-and-broken-pages-the-ultimate-seo-guide",
        title:"Understanding Orphan Pages and Broken Pages: The Ultimate SEO Guide",
        shortDesc:"Learn what orphan pages and broken pages are, how they impact SEO performance, and practical ways to identify, fix, and prevent them for a healthier website.",
        picture:"/blogpicture/Gemini_Generated_Image_49stdm49stdm49st.png",
},
// blog#2:
{
        slug:"what-are-orphan-pages",
        title:"What Are Orphan Pages?",
        shortDesc:"Orphan pages are unlinked website pages that remain invisible to users and search engines, negatively affecting SEO performance.",
        picture:"/blogpicture/Gemini_Generated_Image_b78evgb78evgb78e.png",
},
// blog#3:
{
        slug:"what-are-broken-pages",
        title:"What Are Broken Pages?",
        shortDesc:"A broken page, also known as a 404 error page, is a webpage that cannot be accessed because the URL is incorrect, the page has been deleted, or there is a server issue. When users or search engines try to visit a broken page, they receive an error message indicating that the page is not found.",
        picture:"/blogpicture/Gemini_Generated_Image_ee5zz2ee5zz2ee5z.png",
},
// blog#4:
{
        slug:"how-to-detect-orphan-and-broken-pages",
        title:"How to Detect Orphan and Broken Pages",
        shortDesc:"Learn how to identify orphan and broken pages on your website using tools like Google Search Console, Screaming Frog, and manual checks.",
        picture:"/blogpicture/Gemini_Generated_Image_t7fwdlt7fwdlt7fw.png",
},
// blog#5:
{
        slug:"best-practices-to-prevent-orphan-and-broken-pages",
        title:"Best Practices to Prevent Orphan & Broken Pages",
        shortDesc:"Learn practical SEO best practices to prevent orphan and broken pages, improve crawlability, and maintain a healthy website structure.",
        picture:"/blogpicture/Gemini_Generated_Image_6rdvuk6rdvuk6rdv.png",
},
// blog#6:
{
        slug:"how-to-fix-orphan-pages-and-broken-pages",
        title:"How to Fix Orphan Pages and Broken Pages",
        shortDesc:"Learn how to identify and fix orphan pages and broken pages to improve SEO, crawlability, and user experience.",
        picture:"/blogpicture/Gemini_Generated_Image_netfnunetfnunetf.png",
},
     
      
      
       
  ]
  return (
    <main className='m-8'>
      <h1 className="p-2 text-5xl text-center font-['Nunito']">Blogs
      </h1>
       <hr className="border-t-2 border-gray-400 mb-6"></hr>
      <section className='p-4 bg-gray-200 rounded-2xl'>
        <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-auto">
  <div className="grid lg:grid-cols-3  gap-8 sm:grid-cols-1 md:grid-cols-2">

{ blogs.map(blog => (
  <article key={blog.slug} className="flex justify-center flex-shrink-0 p-4 bg-white  rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col w-full max-w-sm">
      {/* Image */}
      <div className="aspect-[16/12] overflow-hidden rounded-2xl">
        <img
          src={blog.picture}
         alt="image"
          
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-fill w-full h-full rounded-2xl"
        />
      </div>

      {/* Content */}
      <div className="pt-4 ">
        <h2 className="text-xl font-semibold md:text-2xl font-['Nunito']">
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