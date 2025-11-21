import React from 'react'
import assets from "../assets/assets"

const Navbar = () => {
  return (
    <div className='flex justify-between align-center p-1 shadow-md'>
        <img src={assets.logo} alt="" />
        <img src={assets.profile_image } alt="" />
    </div>
  )
}

export default Navbar
