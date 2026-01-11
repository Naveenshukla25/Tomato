import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { Link } from 'react-router-dom';
import axios  from 'axios';

const PlaceOrder = () => {
  const { getAmount, food_list, cartItem ,token,url } = useContext(StoreContext);
  const [data,setData]=  useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };
  const orderPlace = async (event) => {
    let orderItem = [];
    food_list.map((item) => {
      if(cartItem[item._id] > 0){
        let iteminfo = item;
        iteminfo["quantity"] = cartItem[item._id];
        orderItem.push(iteminfo);
      }
    })
    let orderData = {
      address: data,
      items: orderItem,
      amount: getAmount()+2,
    }
    let res = await axios.post( url+"/api/order/place", orderData , { headers: { token }})
    if(res.data.success){
      alert(res.data.message);
    }
    else{
      alert(res.data.message);
    }
  }
  useEffect(()=>{
    console.log(data);
  },[data])

  return ( 
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <form className='space-y-8' onSubmit={(e) => { e.preventDefault(); orderPlace(e); }}>
          <h2 className='font-bold text-2xl md:text-3xl text-gray-800 mb-6'>Delivery Information</h2>
          
          <div className='bg-white rounded-lg shadow-sm p-6 md:p-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>First Name *</label>
                <input 
                  name='firstName' 
                  onChange={onChangeHandler} 
                  value={data.firstName} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='text' 
                  placeholder='First name' 
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Last Name *</label>
                <input 
                  name='lastName' 
                  onChange={onChangeHandler} 
                  value={data.lastName} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='text' 
                  placeholder='Last name' 
                  required
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Email *</label>
                <input 
                  name='email' 
                  onChange={onChangeHandler} 
                  value={data.email} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='email' 
                  placeholder='Email address' 
                  required
                />
              </div>
              <div className='md:col-span-2'>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Street Address *</label>
                <input 
                  name='street' 
                  onChange={onChangeHandler} 
                  value={data.street} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='text' 
                  placeholder='Street address' 
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>City *</label>
                <input 
                  name='city' 
                  onChange={onChangeHandler} 
                  value={data.city} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='text' 
                  placeholder='City' 
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>State *</label>
                <input 
                  name='state' 
                  onChange={onChangeHandler} 
                  value={data.state} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='text' 
                  placeholder='State' 
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Zip Code *</label>
                <input 
                  name='zip' 
                  onChange={onChangeHandler} 
                  value={data.zip} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='text' 
                  placeholder='Zip code' 
                  required
                />
              </div>
              <div>
                <label className='block text-sm font-semibold text-gray-700 mb-2'>Country</label>
                <input 
                  name='country' 
                  onChange={onChangeHandler} 
                  value={data.country || ''} 
                  className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all' 
                  type='text' 
                  placeholder='Country' 
                />
              </div>
            </div>
          </div>
          
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8'>
            <div className='lg:col-span-2'></div>
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-lg shadow-sm p-6 sticky top-24'>
                <h2 className='font-bold text-2xl mb-6 text-gray-800'>Order Summary</h2>
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
                    <p>Grand Total</p>
                    <p className='text-orange-500'>${(getAmount() + 2).toFixed(2)}</p>
                  </div>
                </div>
                <button 
                  type='submit'
                  className='w-full px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-semibold shadow-md'
                > 
                  PROCEED TO PAYMENT
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default PlaceOrder


