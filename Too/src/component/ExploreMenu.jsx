import React, { useState } from 'react'
import { menu_list } from '../frontend_assets/assets';

const ExploreMenu = ({category,setCategory}) => {
 
  return (
    <div className= 'p-4 '>
        <h2 className='text-gray-600 font-semibold text-3xl text-center ' >Explore our Menu</h2>
        <p className=' text-gray-500 text-center mt-2 '>Choose your favorite meal from our wide selection of available meals and enjoy a delicious lunch or dinner at home</p>
      <div className=' ml-25 mr-25 flex justify-between gap-4 mt-4' > 
        { menu_list.map((item,index)=>{
            return(
                <div onClick={()=>{setCategory(prev=>prev === item.menu_name?"All":item.menu_name )}} key={index}>
                    <img className={category===item.menu_name?'border-red-400 border-4 rounded-3xl p-2':"" }src={item.menu_image} alt={item.menu_name} />
                    <p className='text-center text-gray-500'>{item.menu_name}</p>
                </div>
            )
        })}
      </div>
      <hr className="my-8 border-gray-200" />
    </div>
  )
}

export default ExploreMenu
