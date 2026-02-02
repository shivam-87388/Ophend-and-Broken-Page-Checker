import React from 'react'
import { blogs } from '../data'
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const page = ({params}) => {
  const slug = params.slug;
  const blog = blogs.find((blog)=> blog.slug === slug);
  if(!blog){
    return (
      <main className='m-8 bg-gray-100 rounded-2xl p-4'>
       <div className="max-w-3xl flex flex-col mx-auto size-full">
  {/* ========== HEADER ========== */}
 
  {/* ========== END HEADER ========== */}
  {/* ========== MAIN CONTENT ========== */}
  <main id="content">
    <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
        {/* <h1 className="block text-7xl font-bold text-foreground sm:text-9xl">
        404
      </h1> */}
       <img src="/page-not-found/page not found.png" alt="Page not found" className="mx-auto w-96 h-96 object-contain"/> 
      
      <p className="mt- text-muted-foreground-2">
        Oops, something went wrong.
      </p>
      <p className="text-muted-foreground-2">
        Sorry, we couldn't find your page.
      </p>
      <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
        <a
          className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-primary border border-primary-line text-primary-foreground hover:bg-primary-hover focus:outline-hidden focus:bg-primary-focus disabled:opacity-50 disabled:pointer-events-none"
          href="/"
        >
          <svg
            className="shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to home
        </a>
      </div>
    </div>
  </main>
  {/* ========== END MAIN CONTENT ========== */}
  {/* ========== FOOTER ========== */}
  <footer className="mt-auto text-center py-5">
    <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8">
      <p className="text-sm text-muted-foreground-1">
        © All Rights Reserved. 2026.
      </p>
    </div>
  </footer>
  {/* ========== END FOOTER ========== */}
</div>
      </main>
    )
  }
  return (
    <main className='m-8 bg-gray-100 rounded-2xl p-4'>
      

      <div className="flex  justify-center   overflow-hidden mb-6">
        <img src={blog.picture} alt={blog.title} className='object-fill w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96 '/>

      </div>
      <h1 className="p-2 mb-6 text-4xl text-start font-semibold font-['Libre_Baskerville']">{blog.title}</h1>
     
      <ReactMarkdown  remarkPlugins={[remarkGfm]}
    components={{
      p: ({children}) => (<p className="text-2xl font-['Rosario'] mb-2">{children}</p>),
      h2: ({children}) => (<h2 className="pt-2 text-2xl font-bold font-['Rosario'] ">{children}</h2>),
      li: ({children}) => (<li className="text-2xl font-['Rosario'] ">{children}</li>),
      ol: ({children}) => (<ol className="list-decimal pl-6 mt-2 ">{children}</ol>),
      ul: ({children}) => (<ul className="list-disc pl-6 mt-2">{children}</ul>),
      }}>{blog.description}</ReactMarkdown>
      
    
    </main>
  ); 

  
}

export default page;