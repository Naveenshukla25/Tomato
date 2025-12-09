import React, { useState,useContext } from 'react'
import { assets } from '../frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({id,name,description,price,image}) => {
    const {cartItem ,addToCart,removeFromCart } = useContext(StoreContext);

  return (
    <div className='p-1 bg-white  shadow-md rounded-lg '>
      <div className='relative '>
        <img src={"http://localhost:4000/image/"+image} className=''  />
        { !cartItem?.[id] 
            ?<img onClick={()=>addToCart(id)} src={assets.add_icon_white} className='w-[2rem] absolute bottom-2 right-2 cursor-pointer'/>
            :<div className='absolute bottom-2 right-2 flex items-center gap-2 p-2 rounded-2xl bg-white'>
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} className='w-[2rem]' />
                <p>{cartItem?.[id]}</p>
                <img onClick={()=>addToCart(id)} src={assets.add_icon_green} className='w-[2rem]' />
            </div>
        }
      </div>
      <div className='flex justify-between items-center'>
        <p className='font-bold ' >{name}</p>
        <img className='w-[4rem]' src={assets.rating_starts} alt=''></img>
      </div>
      <p className='text-gray-600 w-full '>{description}</p>
      <p className='text-orange-600 mt-4 mb-4 '>${price}</p>
    </div>
  )
}

export default FoodItem

