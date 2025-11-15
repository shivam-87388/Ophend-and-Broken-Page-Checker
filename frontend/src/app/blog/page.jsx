import React from 'react'

const Blog = () => {
  return (
    <div>
        {/* Card Row */}
<div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-x-auto">
  <div className="flex gap-8 lg:gap-12 min-w-max">

    {/* Card 1 */}
    <a className="group flex flex-col w-80 focus:outline-hidden flex-shrink-0" href="#">
      <div className="aspect-[16/12] overflow-hidden bg-gray-100 rounded-2xl dark:bg-neutral-800">
        <img
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover w-full h-full rounded-2xl"
          src="https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?q=80&w=560&auto=format&fit=crop"
          alt="Blog Image"
        />
      </div>
      <div className="pt-4">
        <h3 className="relative inline-block font-medium text-lg text-black dark:text-white before:absolute before:bottom-0.5 before:left-0 before:-z-10 before:w-full before:h-1 before:bg-lime-400 before:transition-transform before:origin-left before:scale-x-0 group-hover:before:scale-x-100">
          eYoga
        </h3>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          A revamped and dynamic approach to yoga analytics
        </p>
      </div>
    </a>

    {/* Card 2 */}
    <a className="group flex flex-col w-80 focus:outline-hidden flex-shrink-0" href="#">
      <div className="aspect-[16/12] overflow-hidden bg-gray-100 rounded-2xl dark:bg-neutral-800">
        <img
          className="group-hover:scale-105 transition-transform duration-500 ease-in-out object-cover w-full h-full rounded-2xl"
          src="https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=560&auto=format&fit=crop"
          alt="Blog Image"
        />
      </div>
      <div className="pt-4">
        <h3 className="relative inline-block font-medium text-lg text-black dark:text-white before:absolute before:bottom-0.5 before:left-0 before:-z-10 before:w-full before:h-1 before:bg-lime-400 before:transition-transform before:origin-left before:scale-x-0 group-hover:before:scale-x-100">
          Nike React
        </h3>
        <p className="mt-1 text-gray-600 dark:text-neutral-400">
          Rewriting sport's playbook for billions of athletes
        </p>
      </div>
    </a>

    {/* Add more cards here ... */}

  </div>
</div>
{/* End Card Row */}

    </div>
  )
}

export default Blog;