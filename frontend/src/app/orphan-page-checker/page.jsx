'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Link as LinkIcon } from 'lucide-react'
import axios from 'axios'
import '@fortawesome/fontawesome-free/css/all.min.css';

const Page = () => {
  const router = useRouter()
  const [website, setWebsite] = useState("")
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      alert("Please login first to use this tool!")
      router.push('/signin') 
    }
  }, [])

const handleSubmit = async (e) => {
  e.preventDefault();
  setResult(null); // 🟢 Sabse pehle purana data saaf karein
  setLoading(true);

  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(
      "http://localhost:5000/api/orphan",
      { website },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 🔍 Check karein terminal data match ho raha hai
    console.log("Naya Data Aaya:", res.data); 
    setResult(res.data); // 🟢 Naya 138 wala data yahan set hoga

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="m-8">
      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
      <h1 className="text-3xl md:text-4xl font-bold font-['Libre_Baskerville']">Orphan Page Checker</h1>
    <h2 className="text-xl font-semibold md:text-2xl font-['Libre_Baskerville']">Find Hidden Pages That Search Engines Can’t Discover</h2>
    <p className="text-xl md:text-2xl font-['Rosario']">Orphan pages are web pages that exist on your website but are not linked from any internal pages. Because search engines rely on internal links to crawl and discover content, orphan pages often remain unindexed or perform poorly in search results.</p>
    <p className="text-xl mt-2.5 md:text-2xl font-['Rosario']">This <span className="font-bold">Orphan Page Checker</span> analyzes your website structure using your sitemap and internal links to accurately identify orphan pages.</p>
    <p className="text-xl mt-2.5 md:text-2xl font-semibold  font-['Rosario']">Note: <span className='font-normal text-xl md:text-2xl'>*A valid XML sitemap is required for this analysis.*</span></p>
      </section>

      
    
<form onSubmit={handleSubmit} className="mt-2 p-4 ">
  <label
    htmlFor="website-url"
    className="text-2xl font-['Libre_Baskerville'] text-black"
  >
    Enter your website URL
  </label>

  <div className="flex items-center gap-3 mt-2">
    {/* Input */}
    <div className="flex items-center border-2 gap-2.5 p-2.5 border-gray-500 rounded-md w-[340px]">
      <LinkIcon size={20} absoluteStrokeWidth />
      <input
        className="text-black outline-none flex-1"
        type="url"
        id="website-url"
        placeholder="https://example.com"
        value={website}                     
        onChange={(e) => setWebsite(e.target.value)}
        required
      />
    </div>
    {/* Button */}
    <button
      type="submit"
      className="finline-flex items-center justify-center px-3 py-2 mr-3 text-xl font-['Lora'] font-medium text-center text-white rounded-lg bg-red-600 ring-2 ring-red-600 ring-offset-2 cursor-pointer transition-transform transform hover:scale-95"
    >
      <i className="fa-brands fa-searchengin fa-lg"></i>
      <span>Analysis</span>
    </button>
  </div>
  {/* note text  */}
  <p className="mt-2 text-red-600 text-sm">
    *Make sure your Website Url is valid.
  </p>
</form>

{loading && (
  <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-700 animate-pulse">
    <p className="font-bold font-['Rosario'] text-xl">Processing Analysis...</p>
    <p className="text-sm italic text-gray-600">The tool is scanning your sitemap and crawling internal links. Please wait.</p>
  </div>
)}

{/*New Result */}
{/* 🟢 UPDATED: Result Display logic */}
{result && (
  <section className="mt-6 p-6 bg-white border-2 border-red-500 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-red-600 mb-4 border-b pb-2 font-['Libre_Baskerville']">Orphan Page Report</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
        <p className="text-gray-500 font-['Rosario'] font-bold">Total Pages in Sitemap</p>
        {/* 🟢 Backend se 'totalInSitemap' dikhao */}
        <p className="text-3xl font-bold text-gray-800">{result.totalInSitemap || 0}</p> 
      </div>
      <div className="p-4 bg-red-50 rounded-lg border border-red-100">
  <p className="text-red-700 font-['Rosario'] font-bold">Orphan Pages Found</p>
  <p className="text-3xl font-bold text-red-600">
  {result.count} 
</p>
</div>
    </div>

    <h3 className="font-bold text-xl mb-3 font-['Libre_Baskerville'] text-black">Detected URLs:</h3>
    <div className="max-h-60 overflow-y-auto border p-2 rounded bg-gray-50">
      <ul className="list-disc pl-6 space-y-1">
        {/* 🟢 Backend se 'data' array map karein */}
        {(result.data || []).map((url, index) => (
          <li key={index} className="text-blue-600 text-sm mb-1 truncate font-['Rosario'] hover:text-red-600 transition-colors">
            {url}
          </li>
        ))}
        {(!result.data || result.data.length === 0) && (
          <p className="text-green-600 font-bold italic p-2">Zero Orphan Pages Found!</p>
        )}
      </ul>
    </div>
  </section>
)}

<section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">How the Orphan Page Checker Works.</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">This tool follows a structured analysis process to ensure accurate results.</p>
        <p className="text-xl font-semibold md:text-2xl font-['Rosario']">Step-by-Step Process:</p>
        <ol className="list-decimal pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">The tool searches for an XML sitemap on your website.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">All URLs listed in the sitemap are collected.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">The tool crawls your website to identify internally linked pages.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Sitemap URLs are compared with internally linked URLs.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Pages present in the sitemap but missing internal links are identified as <span className='font-bold'>Orphan Pages</span>.</li>
        </ol>
        <p className="text-lg font-semibold  font-['Rosario']">Note: <span className='font-normal text-lg'>*If no sitemap is found, the analysis will not run.*</span></p>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Why a Sitemap Is Required</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">A sitemap provides a complete list of pages that exist on your website.</p>
        <p className="text-xl md:text-2xl font-['Rosario']">Without it, the tool cannot determine whether a page exists but lacks internal links.</p>
        <p className="text-xl font-bold md:text-2xl font-['Rosario']">Sitemap Benefits:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Helps search engines discover all pages</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Acts as a reference for orphan page detection.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Improves crawling efficiency.</li>
        </ul>
        <p className="text-lg font-semibold  font-['Rosario']">Without a sitemap, orphan page analysis is not possible.</p>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Why Orphan Pages Are Bad for SEO</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">Orphan pages can negatively impact your website’s SEO performance in several ways:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Search engines may not crawl or index them.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">No internal link authority is passed.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Reduced visibility in search results.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Wasted content and ranking potential.</li>
        </ul>
        <p className="text-lg font-normal font-['Rosario']">Fixing orphan pages helps improve crawlability, indexing, and overall website health.</p>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">How to Fix Orphan Pages</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">Once orphan pages are identified, you should:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Add internal links from relevant pages.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Include them in navigation or category pages.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Improve your internal linking structure.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Update sitemap after fixing links.</li>
        </ul>
        <p className="text-lg font-normal font-['Rosario']">These steps help search engines properly discover and rank your content.</p>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Who Should Use This Tool</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">This tool is ideal for:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">SEO professionals.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Website owners.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Digital marketers.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Developers managing large websites.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Anyone looking to improve site structure and SEO health.</li>
        </ul>
      </section>    
    </main>
  )
}

export default Page;