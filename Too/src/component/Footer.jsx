import React from 'react'
import { assets } from '../frontend_assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10" id='footer'>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <img src={assets.logo} alt="Logo" className="w-24 md:w-32 mb-4" />
            <p className="text-base md:text-lg text-gray-300 mb-4 max-w-md">Tomato - Your favorite dishes and restaurants! Order delicious meals and enjoy a delightful dining experience.</p>
            <div className='flex gap-4 mt-6'>
              <a href='#' className='hover:opacity-70 transition-opacity'>
                <img src={assets.facebook_icon} alt='Facebook' className='w-6 h-6'/>
              </a>
              <a href='#' className='hover:opacity-70 transition-opacity'>
                <img src={assets.twitter_icon} alt='Twitter' className='w-6 h-6'/>
              </a>
              <a href='#' className='hover:opacity-70 transition-opacity'>
                <img src={assets.linkedin_icon} alt='LinkedIn' className='w-6 h-6'/>
              </a>
            </div>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-4">Company</h2>
            <ul className="space-y-3 text-gray-300">
              <li className='hover:text-white transition-colors cursor-pointer'>About us</li>
              <li className='hover:text-white transition-colors cursor-pointer'>Blog</li>
              <li className='hover:text-white transition-colors cursor-pointer'>Contact us</li>
              <li className='hover:text-white transition-colors cursor-pointer'>Careers</li>
            </ul>
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold mb-4">Get in Touch</h2>
            <ul className="space-y-3 text-gray-300">
              <li className='flex items-center gap-2'>
                <span>📞</span>
                <a href='tel:+919569224160' className='hover:text-white transition-colors'>+919569224160</a>
              </li>
              <li className='flex items-center gap-2'>
                <span>✉️</span>
                <a href='mailto:Contact@tomato.com' className='hover:text-white transition-colors break-all'>Contact@tomato.com</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-gray-700" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <p className="text-center text-gray-400 text-sm md:text-base">
          Copyright 2025 @ Tomato.com - All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer
