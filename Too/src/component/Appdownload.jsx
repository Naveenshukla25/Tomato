import React from 'react'
import { assets } from '../frontend_assets/assets'

const Appdownload = () => {
  return (
    <div className=' m-auto p-10 items-center '>
        <p className='text-black font-semibold text-3xl text-center ' >
            For Better Experience Download <br/> Tomato App
        </p>
        <div className='flex justify-center gap-4 mt-8 cursor-pointer '>
         <img src={assets.app_store} alt="" />
         <img src={assets.play_store} alt="" />
        </div>
    </div>
  )
}

export default Appdownload
