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
      router.push('/login') 
    }
  }, [router])

  // Backend ko data bhejne ke liye
  const handleSubmit = async (e) => {
    e.preventDefault()
    setResult(null)

    try {
      setLoading(true)
      const token = localStorage.getItem("token") //authentacation

      const res = await axios.post(
        "http://localhost:5000/api/broken", // Backend Route
        { website },
        {
          headers: {
            Authorization: `Bearer ${token}` // Passing Token to protect middleware
          }
        }
      )

      setResult(res.data) 

    } catch (error) {
      console.error(error)
      if (error.response?.status === 401) {
        alert("Session expired. Please login again.")
        router.push('/login')
      } else {
        alert("Error: " + (error.response?.data?.message || "Scan failed"))
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <main className="m-8">
      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
      <h1 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Broken Link Checker</h1>
    <h2 className="text-xl font-semibold md:text-2xl font-['Libre_Baskerville']">Detect and Fix Broken Links That Harm Your SEO</h2>
    <p className="text-xl md:text-2xl font-['Rosario']">Broken links are hyperlinks that lead to pages or resources that no longer exist or cannot be accessed. These links create a poor user experience and negatively affect your website’s SEO performance.</p>
    <p className="text-xl mt-2.5 md:text-2xl font-['Rosario']">The <span className="font-bold">Broken Link Checker Tool</span> scans your website and identifies links that return errors such as 404 (Page Not Found), server errors, or unreachable URLs.</p>
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
      className="finline-flex items-center justify-center px-3 py-2 mr-3 text-xl font-['Libre_Baskerville'] font-medium text-center text-black rounded-lg border-2 border-red-600 hover:bg-red-600 hover:text-white hover:border-transparent hover:ring-2 hover:ring-red-600 hover:ring-offset-2 transition-all duration-200"
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
    <p className="font-bold">Crawling your website...</p>
    <p className="text-sm italic text-gray-600">This may take a minute depending on the number of links.</p>
  </div>
)}

{/*  RESULTS SECTION:  */}
{result && (
  <section className="mt-6 p-6 bg-white border-2 border-red-500 rounded-2xl shadow-lg">
    <h2 className="text-2xl font-bold text-red-600 mb-4 border-b pb-2">Analysis Report</h2>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="p-4 bg-gray-100 rounded-lg">
        <p className="text-gray-500">Total Unique Links Found</p>
        <p className="text-3xl font-bold">{result.totalLinks}</p>
      </div>
      <div className={`p-4 rounded-lg ${result.brokenLinks.length > 0 ? 'bg-red-50' : 'bg-green-50'}`}>
        <p className="text-gray-500">Broken Links Detected</p>
        <p className={`text-3xl font-bold ${result.brokenLinks.length > 0 ? 'text-red-600' : 'text-green-600'}`}>
          {result.brokenLinks.length}
        </p>
      </div>
    </div>

    {/* Broken Links table */}
    {result.brokenLinks.length > 0 ? (
      <div className="max-h-60 overflow-y-auto border rounded-lg">
        <table className="min-w-full bg-white">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="px-4 py-2 border text-left">Broken URL</th>
              <th className="px-4 py-2 border text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {result.brokenLinks.map((link, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-blue-600 text-sm truncate max-w-xs">{link.url}</td>
                <td className="px-4 py-2 border">
                  <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">{link.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p className="text-green-600 font-bold italic">No broken links found! Sab sahi hai.</p>
    )}
  </section>
)}

<section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">How the Broken Link Checker Works.</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">This tool uses automated crawling to detect broken or non-working links across your website.</p>
        <p className="text-xl font-semibold md:text-2xl font-['Rosario']">Step-by-Step Process:</p>
        <ol className="list-decimal pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">The tool crawls all accessible pages of your website.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">It extracts all internal and external links.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Each link is checked for response status.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Links returning error responses are marked as <span className='font-bold'>Broken Links</span>.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">A detailed report is generated for review.</li>
        </ol>
      </section>

       <section className="mt-4 bg-gray-100 p-4 rounded-2xl">
      <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Types of Broken Links Detected</h2>
      <p className="mt-2 text-xl md:text-2xl font-['Rosario']">The tool identifies multiple types of broken links including:</p>
        <ul className="mt-2 space-y-2 pl-2">
          <li>
            <h4 className="text-xl font-semibold md:text-2xl font-['Libre_Baskerville']">404 Error (Page Not Found)
            </h4>
            <p className="text-xl md:text-2xl font-['Rosario']">The requested page does not exist on the server.
            </p>
          </li>
          <li>
            <h4 className="text-xl font-semibold md:text-2xl font-['Libre_Baskerville']">Server Errors (500 Errors)
            </h4>
            <p className="text-xl md:text-2xl font-['Rosario']">Indicates server issues that prevent page loading.
            </p>
          </li>
          <li>
            <h4 className="text-xl font-semibold md:text-2xl font-['Libre_Baskerville']">Redirect Errors
            </h4>
            <p className="text-xl md:text-2xl font-['Rosario']">Improper or broken redirections leading to inaccessible pages.
            </p>
          </li>
          <li>
            <h4 className="text-xl font-semibold md:text-2xl font-['Libre_Baskerville']">Timeout / Unreachable Links
            </h4>
            <p className="text-xl md:text-2xl font-['Rosario']">Links that fail to respond or take too long to load.
            </p>
          </li>
        </ul>
    </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Broken Link Analysis Results</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">Once scanning is complete, a detailed report will be displayed below.</p>
        <p className="text-xl font-semibold md:text-2xl font-['Rosario']">The Report Includes:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Total pages crawled.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Total links found.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Total broken links detected.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Status code of each broken link.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Source page where broken link exists.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Broken link URL.</li>
        </ul>
        <p className="text-xl md:text-2xl font-['Rosario']">This information helps users quickly identify and fix issues.</p>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Why Broken Links Are Bad for SEO</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">Broken links can significantly harm your website’s performance:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Poor user experience.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Increased bounce rate.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Negative search engine ranking signals.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Reduced website credibility.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Crawl budget wastage.</li>
        </ul>
        <p className="text-xl md:text-2xl font-['Rosario']">Fixing broken links improves website usability and SEO performance.</p>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">How to Fix Broken Links</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">After identifying broken links, you can fix them by:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Updating incorrect URLs.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Replacing broken links with working alternatives.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Removing outdated or deleted page links.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Setting up proper redirects (301 redirects).</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Restoring deleted pages if necessary.</li>
        </ul>
      </section>

      <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Internal vs External Broken Links</h2>
        <h3 className="text-xl font-semibold md:text-2xl font-['Rosario']">Internal Broken Links</h3>
        <p className="text-xl md:text-2xl font-['Rosario']">Links that point to pages within your website but lead to errors.</p>
        <p className="mt-2.5 text-xl md:text-2xl font-['Rosario']">These affect:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Website navigation.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Internal linking structure.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">SEO ranking signals.</li>
        </ul>
        <hr className="border-t-gray-300 border-t-2 my-4"></hr>
        <h3 className="text-xl font-semibold md:text-2xl font-['Rosario']">External Broken Links</h3>
        <p className="text-xl md:text-2xl font-['Rosario']">Links pointing to other websites that are no longer available.</p>
        <p className="mt-2.5 text-xl md:text-2xl font-['Rosario']">These affect:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">Content credibility.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">User trust.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Outbound link quality.</li>
        </ul>
      </section> 

       <section className="mt-4 p-4 bg-gray-100 rounded-2xl">
        <h2 className="text-2xl md:text-3xl font-bold font-['Libre_Baskerville']">Who Should Use This Tool</h2>
        <p className="text-xl md:text-2xl font-['Rosario']">This tool is ideal for:</p>
        <ul className="list-disc pl-6 mt-2">
          <li className="text-xl md:text-2xl font-['Rosario']">SEO professionals.</li> 
          <li className="text-xl md:text-2xl font-['Rosario']">Website owners.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Developers.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Content managers.</li>
          <li className="text-xl md:text-2xl font-['Rosario']">Digital marketing teams.</li>
        </ul>
        <p className="text-xl md:text-2xl font-['Rosario']">Anyone managing website content can benefit from broken link detection.</p>
      </section>   
    </main>
  )
}

export default Page;