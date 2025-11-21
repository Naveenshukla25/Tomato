import React from 'react'
import assets from "../assets/assets"
import { NavLink , useNavigate} from 'react-router-dom'

const Slidebar = () => {
  const navigator = useNavigate();
  return (
    <div className='w-[20%] h-[100vh] border-2 border-gray-200 @md:display-none '>
      <div className='p-8 flex flex-col gap-6  '>
        <NavLink to='/add' className='flex items-center gap-8 border-2 border-gray-200 p-2 cursor-pointer '>
          <img src={assets.add_icon} alt="" />
          <p>Add Item</p>
        </NavLink>
        <NavLink to='/list' className='flex items-center gap-8 border-2 border-gray-200 p-2 cursor-pointer ' >
          <img src={assets.order_icon} alt="" />
          <p>List  Item</p>
        </NavLink>
        <NavLink to='/order' className='flex items-center gap-8 border-2 border-gray-200 p-2 cursor-pointer '>
          <img src={assets.order_icon} alt="" />
          <p>Order Item</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Slidebar
