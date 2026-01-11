import React, { useContext } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import { food_list } from '../frontend_assets/assets'
import { StoreContext } from '../Context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../frontend_assets/assets'

const Cart = () => {
  const Navigate = useNavigate();
  const { cartItem, food_list, removeFromCart, addToCart, getAmount }  = useContext(StoreContext);
  
  const cartItems = food_list.filter(item => cartItem[item._id] > 0);
  
   return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800'>Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className='text-center py-16'>
            <img src={assets.basket_icon} alt='Empty Cart' className='w-24 h-24 mx-auto mb-4 opacity-50'/>
            <p className='text-xl text-gray-500 mb-4'>Your cart is empty</p>
            <Link to='/' className='inline-block px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold'>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-4'>
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-6 gap-4 items-center bg-white p-4 rounded-lg shadow-sm">
                <p className='font-semibold text-gray-700'>Item</p>
                <p className='font-semibold text-gray-700 col-span-2'>Title</p>
                <p className='font-semibold text-gray-700'>Price</p>
                <p className='font-semibold text-gray-700'>Quantity</p>
                <p className='font-semibold text-gray-700'>Total</p>
              </div>
              
              {/* Cart Items */}
              {cartItems.map((item,index) => {
                return (
                  <div key={index} className='bg-white rounded-lg shadow-sm p-4 md:p-6'>
                    {/* Mobile Layout */}
                    <div className='md:hidden space-y-4'>
                      <div className='flex gap-4'>
                        <img className='w-20 h-20 object-cover rounded-lg' src={item.image} alt={item.name} />
                        <div className='flex-1'>
                          <h3 className='font-semibold text-gray-800 mb-1'>{item.name}</h3>
                          <p className='text-orange-500 font-bold text-lg'>${item.price}</p>
                        </div>
                        <button 
                          onClick={()=>{ removeFromCart(item._id)}} 
                          className='text-red-500 hover:text-red-700 transition-colors'
                        >
                          <img src={assets.cross_icon} alt='Remove' className='w-5 h-5'/>
                        </button>
                      </div>
                      <div className='flex items-center justify-between pt-2 border-t'>
                        <span className='text-gray-600'>Quantity:</span>
                        <div className='flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-1'>
                          <button 
                            onClick={()=>removeFromCart(item._id)}
                            className='text-orange-500 hover:text-orange-700 font-bold text-lg'
                          >-</button>
                          <span className='font-semibold w-8 text-center'>{cartItem[item._id]}</span>
                          <button 
                            onClick={()=>addToCart(item._id)}
                            className='text-orange-500 hover:text-orange-700 font-bold text-lg'
                          >+</button>
                        </div>
                        <span className='font-bold text-gray-800'>${(item.price * cartItem[item._id]).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className='hidden md:grid grid-cols-6 gap-4 items-center'>
                      <img className='w-16 h-16 object-cover rounded-lg' src={item.image} alt={item.name} />
                      <p className='font-semibold text-gray-800 col-span-2'>{item.name}</p>
                      <p className='text-orange-500 font-semibold'>${item.price}</p>
                      <div className='flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 w-fit'>
                        <button 
                          onClick={()=>removeFromCart(item._id)}
                          className='text-orange-500 hover:text-orange-700 font-bold'
                        >-</button>
                        <span className='font-semibold w-8 text-center'>{cartItem[item._id]}</span>
                        <button 
                          onClick={()=>addToCart(item._id)}
                          className='text-orange-500 hover:text-orange-700 font-bold'
                        >+</button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='font-bold text-gray-800'>${(item.price * cartItem[item._id]).toFixed(2)}</p>
                        <button 
                          onClick={()=>{ removeFromCart(item._id)}} 
                          className='text-red-500 hover:text-red-700 transition-colors ml-4'
                        >
                          <img src={assets.cross_icon} alt='Remove' className='w-5 h-5'/>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
            {/* Cart Summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-lg shadow-sm p-6 sticky top-24'>
                <h2 className='font-bold text-2xl mb-6 text-gray-800'>Cart Total</h2>
                
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-gray-600'>
                    <p>Subtotal</p>
                    <p className='font-semibold'>${getAmount().toFixed(2)}</p>
                  </div>
                  <hr className='border-gray-200' />
                  <div className='flex justify-between text-gray-600'>
                    <p>Delivery Fee</p>
                    <p className='font-semibold'>$2.00</p>
                  </div>
                  <hr className='border-gray-200' />
                  <div className='flex justify-between text-lg font-bold text-gray-800'>
                    <p>Total</p>
                    <p className='text-orange-500'>${(getAmount() + 2).toFixed(2)}</p>
                  </div>
                </div>
                
                <button 
                  onClick={()=>{ Navigate('/order')}} 
                  className='w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold mb-4 shadow-md'
                > 
                  PROCEED TO ORDER
                </button>
                
                <div className='border-t pt-4'>
                  <h3 className='font-semibold text-gray-700 mb-3'>Promo Code</h3>
                  <div className='flex gap-2'>
                    <input 
                      type='text' 
                      placeholder='Enter code' 
                      className='flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                    <button className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-semibold'> 
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart

