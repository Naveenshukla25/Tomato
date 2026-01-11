import React, { useState,useContext } from 'react'
import { assets } from '../frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({id,name,description,price,image}) => {
    const {cartItem ,addToCart,removeFromCart,url } = useContext(StoreContext);

  return (
    <div className='bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 flex flex-col h-full'>
      <div className='relative w-full aspect-square overflow-hidden'>
        <img 
          src={url+"/image/"+image} 
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-110' 
          alt={name}
        />
        { !cartItem?.[id] 
            ? <button 
                onClick={()=>addToCart(id)} 
                className='absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition-all duration-300 hover:scale-110 cursor-pointer'
              >
                <img src={assets.add_icon_white} className='w-5 h-5 filter brightness-0' alt='Add'/>
              </button>
            : <div className='absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-full bg-white shadow-lg'>
                <button onClick={()=>removeFromCart(id)} className='hover:scale-110 transition-transform'>
                  <img src={assets.remove_icon_red} className='w-5 h-5' alt='Remove' />
                </button>
                <p className='font-bold text-gray-800 min-w-[20px] text-center'>{cartItem?.[id]}</p>
                <button onClick={()=>addToCart(id)} className='hover:scale-110 transition-transform'>
                  <img src={assets.add_icon_green} className='w-5 h-5' alt='Add' />
                </button>
            </div>
        }
      </div>
      <div className='p-4 flex flex-col flex-grow'>
        <div className='flex justify-between items-start mb-2'>
          <p className='font-bold text-gray-800 text-lg flex-1 pr-2 line-clamp-1'>{name}</p>
          <img className='w-20 h-4 object-contain flex-shrink-0' src={assets.rating_starts} alt='Rating'/>
        </div>
        <p className='text-gray-600 text-sm mb-4 line-clamp-2 flex-grow'>{description}</p>
        <div className='flex justify-between items-center mt-auto'>
          <p className='text-orange-500 font-bold text-xl'>${price}</p>
        </div>
      </div>
    </div>
  )
}

export default FoodItem


