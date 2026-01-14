import React, { useState } from 'react'
import { menu_list } from '../frontend_assets/assets';

const ExploreMenu = ({category,setCategory}) => {
    
  return (
    <div className='p-4 md:p-6 lg:p-8' id='explore-menu'>
        <h2 className='text-gray-800 font-bold text-2xl sm:text-3xl md:text-4xl text-center mb-3'>Explore our Menu</h2>
        <p className='text-gray-600 text-center mt-2 mb-6 md:mb-8 text-sm sm:text-base max-w-2xl mx-auto px-4'>Choose your favorite meal from our wide selection of available meals and enjoy a delicious lunch or dinner at home</p>
      <div className='max-w-7xl mx-auto overflow-x-auto pb-4 px-4 sm:px-6 lg:px-8'>
        <div className='flex gap-3 sm:gap-4 md:gap-6 min-w-max md:justify-center md:flex-wrap'> 
          { menu_list.map((item,index)=>{
              return(
                  <div 
                    onClick={()=>{setCategory(prev=>prev === item.menu_name?"All":item.menu_name )}} 
                    key={index}
                    className='flex-shrink-0 cursor-pointer transition-all duration-300 hover:scale-105'
                  >
                      <img 
                        className={`rounded-2xl md:rounded-3xl transition-all duration-300 ${
                          category===item.menu_name
                            ?'border-orange-500 border-4 p-2 shadow-lg'
                            :'border-transparent border-4 p-2 hover:border-orange-300'
                        }`}
                        src={item.menu_image} 
                        alt={item.menu_name}
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                      <p className={`text-center mt-2 text-sm font-semibold transition-colors ${
                        category===item.menu_name ? 'text-orange-500' : 'text-gray-600'
                      }`}>{item.menu_name}</p>
                  </div>
              )
          })}
        </div>
      </div>
      <hr className="my-8 md:my-12 border-gray-200 max-w-7xl mx-auto" />
    </div>
  )
}

export default ExploreMenu
