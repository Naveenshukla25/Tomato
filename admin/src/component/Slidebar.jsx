import React from 'react'
import assets from "../assets/assets"
import { NavLink , useNavigate} from 'react-router-dom'

const Slidebar = () => {
  const navigator = useNavigate();
  return (
    <div className='w-full md:w-[250px] lg:w-[280px] border-r-2 border-gray-200 bg-white'>
      <div className='p-4 sm:p-6 md:p-8 flex flex-row md:flex-col gap-3 sm:gap-4 md:gap-6 overflow-x-auto md:overflow-x-visible'>
        <NavLink 
          to='/add' 
          className={({isActive}) => 
            `flex items-center gap-3 sm:gap-4 md:gap-6 border-2 border-gray-200 p-3 sm:p-4 cursor-pointer rounded-lg transition-all duration-200 min-w-fit md:min-w-0 ${
              isActive 
                ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                : 'bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
            }`
          }
        >
          <img src={assets.add_icon} alt="" className='w-5 h-5 sm:w-6 sm:h-6' />
          <p className='text-sm sm:text-base font-medium whitespace-nowrap'>Add Item</p>
        </NavLink>
        <NavLink 
          to='/list' 
          className={({isActive}) => 
            `flex items-center gap-3 sm:gap-4 md:gap-6 border-2 border-gray-200 p-3 sm:p-4 cursor-pointer rounded-lg transition-all duration-200 min-w-fit md:min-w-0 ${
              isActive 
                ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                : 'bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
            }`
          }
        >
          <img src={assets.order_icon} alt="" className='w-5 h-5 sm:w-6 sm:h-6' />
          <p className='text-sm sm:text-base font-medium whitespace-nowrap'>List Item</p>
        </NavLink>
        <NavLink 
          to='/order' 
          className={({isActive}) => 
            `flex items-center gap-3 sm:gap-4 md:gap-6 border-2 border-gray-200 p-3 sm:p-4 cursor-pointer rounded-lg transition-all duration-200 min-w-fit md:min-w-0 ${
              isActive 
                ? 'bg-orange-500 text-white border-orange-500 shadow-md' 
                : 'bg-white hover:bg-gray-50 hover:border-gray-300 hover:shadow-sm'
            }`
          }
        >
          <img src={assets.order_icon} alt="" className='w-5 h-5 sm:w-6 sm:h-6' />
          <p className='text-sm sm:text-base font-medium whitespace-nowrap'>Order Item</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Slidebar
