import React from 'react'
import { assets } from '../frontend_assets/assets'

const Appdownload = () => {
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16' id='app-download'>
        <p className='text-gray-800 font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-4'>
            For Better Experience Download <br className='hidden sm:block'/> <span className='sm:hidden'> </span>Tomato App
        </p>
        <div className='flex justify-center gap-4 md:gap-6 mt-8 md:mt-12 cursor-pointer'>
         <a href='#' className='hover:scale-105 transition-transform duration-300'>
           <img src={assets.app_store} alt="Download on App Store" className='w-32 md:w-40 h-auto' />
         </a>
         <a href='#' className='hover:scale-105 transition-transform duration-300'>
           <img src={assets.play_store} alt="Get it on Google Play" className='w-32 md:w-40 h-auto' />
         </a>
        </div>
    </div>
  )
}

export default Appdownload
