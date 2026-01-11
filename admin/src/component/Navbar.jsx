import React from 'react'
import assets from "../assets/assets"

const Navbar = () => {
  return (
    <div className='flex justify-between items-center p-3 sm:p-4 md:p-5 shadow-md bg-white sticky top-0 z-10'>
        <img src={assets.logo} alt="Logo" className='h-8 sm:h-10 md:h-12 w-auto object-contain' />
        <img src={assets.profile_image} alt="Profile" className='h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full object-cover border-2 border-gray-200 hover:border-orange-500 transition-colors duration-200 cursor-pointer' />
    </div>
  )
}

export default Navbar
