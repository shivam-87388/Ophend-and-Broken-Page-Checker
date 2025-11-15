import React from 'react'
import { IconUser } from '@tabler/icons-react';

const Navbar = () => {
    return (
        <nav className="w-full bg-white shadow-sm">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">

          {/* nav */}
          <div className='flex juastify-center items-center gap-10'>
             <nav className="items-center hidden lg:flex gap-10   ">
            <a href="/" className="text-lg font-semibold text-gray-600 hover:text-indigo-500">Home</a>
            <a href="/about-us" className="text-lg font-semibold text-gray-600 hover:text-indigo-500">About</a>
            <a href="/contact-us" className="text-lg font-semibold text-gray-600 hover:text-indigo-500">Contact Us</a>
            <a href="/blog" className="text-lg font-semibold text-gray-600 hover:text-indigo-500">Blog</a>
            
          </nav>

          </div>
         
          {/* buttons */}

          {/* signup-button */}
          <div className="flex items-center gap-4">
            <a href='\createaccount'
             className="rounded-lg border border-indigo-500 px-5 py-2 text-lg font-semibold text-indigo-600 hover:bg-indigo-50">
              Create Account
            </a>
            {/* sign-in button */}
            <a href='/signin'
             className="flex items-center gap-2 rounded-lg bg-indigo-100 px-5 py-2 text-lg font-semibold text-indigo-600 hover:bg-indigo-200">
              <IconUser className="h-6 w-6" />
              Sign In
            </a>
          </div>
        </div>
      </nav>
    )
}

export default Navbar;