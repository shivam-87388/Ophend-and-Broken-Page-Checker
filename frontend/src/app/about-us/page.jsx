import React from 'react'

const aboutus = () => {
  return (
    <div className="w-[1440px] h-[1200px] p-12 bg-white inline-flex flex-col justify-between items-start overflow-hidden">
  <div className="self-stretch px-12 py-5 bg-amber-500 rounded-[20px] inline-flex justify-center items-center gap-2">
    <div className="justify-start text-white text-5xl font-bold font-['Libre_Baskerville'] underline">
      About-US
    </div>
  </div>
  <div className="self-stretch py-3.5 flex flex-col justify-center items-start gap-2.5">
    <div className="self-stretch justify-start text-black text-3xl font-medium font-['Rosario']">
      We provide a powerful SEO tool that helps website owners, SEO
      professionals, and developers identify orphan pages and broken pages on
      their websites.
    </div>
    <div className="self-stretch justify-start">
      <span className="text-black text-3xl font-medium font-['Rosario']">
        Orphan pages are pages that exist on a website but are not linked from
        any internal page, making them hard for users and search engines{" "}
      </span>
      <span className="text-black text-3xl font-medium font-['Rosario']">
        to
      </span>
      <span className="text-black text-3xl font-medium font-['Rosario']">
        {" "}
        find. Broken pages are pages that return errors or fail to load
        properly, which can negatively impact user experience and search engine
        rankings.
      </span>
    </div>
    <div className="self-stretch justify-start text-black text-3xl font-medium font-['Rosario']">
      Our goal is to help you maintain a well-structured, SEO-friendly website
      by detecting these issues quickly and accurately.
    </div>
  </div>
  <div className="w-[1340px] py-0.5 flex flex-col justify-start items-start gap-2">
    <div className="self-stretch h-0 outline outline-2 outline-offset-[-1px] outline-black/50" />
  </div>
  <div className="self-stretch flex flex-col justify-center items-start gap-[5px]">
    <div className="self-stretch h-9 justify-start text-black text-4xl font-normal font-['Libre_Baskerville']">
      What We Do
    </div>
    <div className="self-stretch h-52 flex flex-col justify-center items-start gap-0.5">
      <div className="self-stretch justify-start text-black text-3xl font-normal font-['Rosario']">
        Identify orphan pages with no internal links.
      </div>
      <div className="self-stretch justify-start text-black text-3xl font-normal font-['Rosario']">
        Detect broken pages causing crawl errors.
      </div>
      <div className="self-stretch justify-start text-black text-3xl font-normal font-['Rosario']">
        Analyze website structure for better SEO.
      </div>
      <div className="self-stretch justify-start text-black text-3xl font-normal font-['Rosario']">
        Help improve indexing, navigation, and performance.
      </div>
    </div>
  </div>
  <div className="self-stretch flex flex-col justify-center items-start">
    <div className="self-stretch justify-start text-black text-4xl font-normal font-['Libre_Baskerville']">
      Why It Matters
    </div>
    <div className="self-stretch h-32 justify-start text-black text-3xl font-normal font-['Rosario']">
      Search engines prefer websites that are easy to crawl and navigate. Orphan
      pages and broken pages can block search engine bots and frustrate users.
      By fixing these issues, you can improve your website’s visibility,
      rankings, and overall user experience.
    </div>
  </div>
</div>

  )
}

export default aboutus;
