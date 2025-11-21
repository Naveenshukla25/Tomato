import React from 'react'
import { assets } from '../frontend_assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-10 text-white px-20 mt-10">
      <div className="container mx-auto flex justify-between flex-wrap ">
        <div className=" ">
          <img src={assets.logo} alt="Logo" className="mr-4" />
          <p className="text-lg mt-1">Tomato - Your favorite dishes and restaurants!</p>
          <div className='flex justify-start mt-4 gap-4 cursor-pointer  '>
            <img src={assets.facebook_icon}  alt=''/>
            <img src={assets.twitter_icon}  alt=''/>
            <img src={assets.linkedin_icon}  alt=''/>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Company</h2>
          <ul className="mt-4 space-y-2">
            <li>About us</li>
            <li>Blog</li>
            <li>Contact us</li>
            <li>Careers</li>
          </ul>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Get in Touch</h2>
          <ul className=" ">
            <li>+919569224160</li>
            <li>Contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr className="my-8 border-gray-700" />
      <p className="text-center">
        Copyright 2025 @ Tomato.com - All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer
