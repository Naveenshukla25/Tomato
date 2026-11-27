import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../frontend_assets/assets'

const Cart = () => {
  const navigate = useNavigate();
  const { cartItem, food_list, removeFromCart, addToCart, getAmount, token } = useContext(StoreContext);
  
  const cartItems = food_list.filter(item => cartItem[item._id] > 0);
  const hasOutOfStock = cartItems.some(item => item.inStock === false);
  const outOfStockItems = cartItems.filter(item => item.inStock === false);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-center text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-gray-800'>Your Cart</h1>
        
        {/* Out of Stock Warning Banner */}
        {hasOutOfStock && (
          <div className='mb-6 bg-red-50 border-2 border-red-300 rounded-xl p-4 sm:p-5 flex items-start gap-3 shadow-sm'>
            <svg className='w-6 h-6 text-red-600 flex-shrink-0 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' />
            </svg>
            <div>
              <h3 className='font-bold text-red-800 text-sm sm:text-base'>Action Required: Out of Stock Items in Cart</h3>
              <p className='text-xs sm:text-sm text-red-700 mt-1'>
                The following item(s) are currently out of stock: <span className='font-semibold'>{outOfStockItems.map(i => i.name).join(', ')}</span>. Please remove them using the delete button before proceeding to order.
              </p>
            </div>
          </div>
        )}

        {cartItems.length === 0 ? (
          <div className='text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md mx-auto'>
            <img src={assets.basket_icon} alt='Empty Cart' className='w-20 h-20 mx-auto mb-4 opacity-40'/>
            <p className='text-xl font-bold text-gray-700 mb-2'>Your cart is empty</p>
            <p className='text-gray-500 text-sm mb-6'>Explore top dishes and add your favorites to get started.</p>
            <Link to='/' className='inline-block px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-colors font-semibold shadow'>
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
            {/* Cart Items */}
            <div className='lg:col-span-2 space-y-4'>
              {/* Desktop Table Header */}
              <div className="hidden md:grid grid-cols-6 gap-4 items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 text-sm">
                <p className='font-bold text-gray-700'>Item</p>
                <p className='font-bold text-gray-700 col-span-2'>Title</p>
                <p className='font-bold text-gray-700'>Price</p>
                <p className='font-bold text-gray-700'>Quantity</p>
                <p className='font-bold text-gray-700'>Total</p>
              </div>
              
              {/* Cart Items */}
              {cartItems.map((item, index) => {
                const isOutOfStock = item.inStock === false;

                return (
                  <div 
                    key={item._id || index} 
                    className={`bg-white rounded-xl shadow-sm p-4 md:p-6 border-2 transition-all ${
                      isOutOfStock ? 'border-red-300 bg-red-50/20' : 'border-gray-200'
                    }`}
                  >
                    {/* Mobile Layout */}
                    <div className='md:hidden space-y-4'>
                      <div className='flex gap-4'>
                        <div className='relative'>
                          <img className={`w-20 h-20 object-cover rounded-lg ${isOutOfStock ? 'opacity-60 grayscale-[40%]' : ''}`} src={item.image} alt={item.name} />
                          {isOutOfStock && (
                            <span className='absolute bottom-0 inset-x-0 bg-red-600 text-white text-[9px] font-bold text-center py-0.5 rounded-b-lg'>
                              OUT OF STOCK
                            </span>
                          )}
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <h3 className='font-semibold text-gray-800 text-base'>{item.name}</h3>
                          </div>
                          {isOutOfStock && (
                            <span className='inline-block text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded mt-1'>
                              Currently Unavailable
                            </span>
                          )}
                          <p className='text-orange-500 font-bold text-lg mt-1'>${item.price}</p>
                        </div>
                        <button 
                          onClick={() => { removeFromCart(item._id) }} 
                          className='text-red-500 hover:text-red-700 transition-colors p-1'
                          title='Remove from cart'
                        >
                          <img src={assets.cross_icon} alt='Remove' className='w-5 h-5'/>
                        </button>
                      </div>
                      <div className='flex items-center justify-between pt-2 border-t border-gray-100'>
                        <span className='text-gray-600 text-sm font-medium'>Quantity:</span>
                        <div className='flex items-center gap-3 bg-gray-100 rounded-lg px-3 py-1'>
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className='text-orange-500 hover:text-orange-700 font-bold text-lg cursor-pointer'
                          >-</button>
                          <span className='font-semibold w-8 text-center'>{cartItem[item._id]}</span>
                          <button 
                            onClick={() => !isOutOfStock && addToCart(item._id)}
                            disabled={isOutOfStock}
                            className={`font-bold text-lg ${isOutOfStock ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 hover:text-orange-700 cursor-pointer'}`}
                          >+</button>
                        </div>
                        <span className='font-bold text-gray-800'>${((Number(item.price) || 0) * cartItem[item._id]).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    {/* Desktop Layout */}
                    <div className='hidden md:grid grid-cols-6 gap-4 items-center'>
                      <div className='relative w-16 h-16'>
                        <img className={`w-16 h-16 object-cover rounded-lg ${isOutOfStock ? 'opacity-60 grayscale-[40%]' : ''}`} src={item.image} alt={item.name} />
                        {isOutOfStock && (
                          <span className='absolute bottom-0 inset-x-0 bg-red-600 text-white text-[8px] font-bold text-center py-0.5 rounded-b-lg'>
                            OUT OF STOCK
                          </span>
                        )}
                      </div>
                      <div className='col-span-2'>
                        <p className='font-semibold text-gray-800'>{item.name}</p>
                        {isOutOfStock && (
                          <span className='inline-block text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded mt-0.5'>
                            Item Out of Stock
                          </span>
                        )}
                      </div>
                      <p className='text-orange-500 font-semibold'>${item.price}</p>
                      <div className='flex items-center gap-2 bg-gray-100 rounded-lg px-2 py-1 w-fit'>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className='text-orange-500 hover:text-orange-700 font-bold px-1.5 cursor-pointer'
                        >-</button>
                        <span className='font-semibold w-6 text-center'>{cartItem[item._id]}</span>
                        <button 
                          onClick={() => !isOutOfStock && addToCart(item._id)}
                          disabled={isOutOfStock}
                          className={`font-bold px-1.5 ${isOutOfStock ? 'text-gray-300 cursor-not-allowed' : 'text-orange-500 hover:text-orange-700 cursor-pointer'}`}
                        >+</button>
                      </div>
                      <div className='flex items-center justify-between'>
                        <p className='font-bold text-gray-800'>${((Number(item.price) || 0) * cartItem[item._id]).toFixed(2)}</p>
                        <button 
                          onClick={() => { removeFromCart(item._id) }} 
                          className='text-red-500 hover:text-red-700 transition-colors ml-4 cursor-pointer p-1'
                          title='Remove item'
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
              <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24'>
                <h2 className='font-bold text-2xl mb-6 text-gray-800'>Cart Total</h2>
                
                <div className='space-y-4 mb-6'>
                  <div className='flex justify-between text-gray-600'>
                    <p>Subtotal</p>
                    <p className='font-semibold text-gray-800'>${getAmount().toFixed(2)}</p>
                  </div>
                  <hr className='border-gray-200' />
                  <div className='flex justify-between text-gray-600'>
                    <p>Delivery Fee</p>
                    <p className='font-semibold text-gray-800'>$2.00</p>
                  </div>
                  <hr className='border-gray-200' />
                  <div className='flex justify-between text-lg font-bold text-gray-800'>
                    <p>Total</p>
                    <p className='text-orange-500'>${(getAmount() + 2).toFixed(2)}</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => {
                    if (hasOutOfStock) {
                      alert('Please remove out of stock items from your cart before proceeding to order.');
                      return;
                    }
                    navigate('/order');
                  }} 
                  disabled={hasOutOfStock}
                  className={`w-full px-6 py-3.5 rounded-xl font-bold mb-4 shadow transition-all ${
                    hasOutOfStock
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-orange-500 hover:bg-orange-600 text-white cursor-pointer hover:shadow-md'
                  }`}
                > 
                  {hasOutOfStock ? 'REMOVE OUT OF STOCK ITEMS' : 'PROCEED TO CHECKOUT'}
                </button>
                
                <div className='border-t border-gray-200 pt-4'>
                  <h3 className='font-semibold text-gray-700 mb-3 text-sm'>Promo Code</h3>
                  <div className='flex gap-2'>
                    <input 
                      type='text' 
                      placeholder='Enter promo code' 
                      className='flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500'
                    />
                    <button className='px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-semibold text-sm cursor-pointer'> 
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

