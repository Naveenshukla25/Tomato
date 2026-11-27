import React, { useState, useContext } from 'react'
import { assets } from '../frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext';

const FoodItem = ({ id, name, description, price, image, inStock }) => {
  const { cartItem, addToCart, removeFromCart } = useContext(StoreContext);
  const isInStock = inStock !== false;

  return (
    <div className={`bg-white shadow-md hover:shadow-xl rounded-xl overflow-hidden transition-all duration-300 hover:scale-[1.02] flex flex-col h-full border ${
      !isInStock ? 'border-red-200 bg-red-50/10' : 'border-gray-100'
    }`}>
      <div className='relative w-full aspect-square overflow-hidden bg-gray-100'>
        <img 
          src={image} 
          className={`w-full h-full object-cover transition-transform duration-300 hover:scale-105 ${
            !isInStock ? 'opacity-70 grayscale-[35%]' : ''
          }`} 
          alt={name}
        />

        {/* Out of stock badge banner */}
        {!isInStock && (
          <div className='absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-md tracking-wider'>
            OUT OF STOCK
          </div>
        )}

        {/* Add to cart / counter / out-of-stock overlay */}
        {!isInStock ? (
          <div className='absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-gray-800/85 text-white text-xs font-semibold shadow-lg backdrop-blur-sm cursor-not-allowed select-none'>
            Unavailable
          </div>
        ) : !cartItem?.[id] ? (
          <button 
            onClick={() => addToCart(id)} 
            className='absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-500 transition-all duration-300 hover:scale-110 cursor-pointer group'
            title='Add to Cart'
          >
            <img src={assets.add_icon_white} className='w-5 h-5 filter brightness-0 group-hover:brightness-100 group-hover:invert' alt='Add'/>
          </button>
        ) : (
          <div className='absolute bottom-3 right-3 flex items-center gap-2 px-3 py-2 rounded-full bg-white shadow-lg border border-gray-100'>
            <button onClick={() => removeFromCart(id)} className='hover:scale-110 transition-transform cursor-pointer'>
              <img src={assets.remove_icon_red} className='w-5 h-5' alt='Remove' />
            </button>
            <p className='font-bold text-gray-800 min-w-[20px] text-center'>{cartItem?.[id]}</p>
            <button onClick={() => addToCart(id)} className='hover:scale-110 transition-transform cursor-pointer'>
              <img src={assets.add_icon_green} className='w-5 h-5' alt='Add' />
            </button>
          </div>
        )}
      </div>

      <div className='p-4 flex flex-col flex-grow'>
        <div className='flex justify-between items-start mb-2'>
          <p className='font-bold text-gray-800 text-lg flex-1 pr-2 line-clamp-1'>{name}</p>
          <img className='w-20 h-4 object-contain flex-shrink-0' src={assets.rating_starts} alt='Rating'/>
        </div>
        <p className='text-gray-600 text-sm mb-4 line-clamp-2 flex-grow'>{description}</p>
        <div className='flex justify-between items-center mt-auto pt-2 border-t border-gray-100'>
          <p className='text-orange-500 font-bold text-xl'>${price}</p>
          {!isInStock ? (
            <span className='text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded'>
              Out of stock
            </span>
          ) : (
            <span className='text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded'>
              Available
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default FoodItem


