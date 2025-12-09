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
    <div className=''>
      <form   className='ml-30 mr-25 space-y-1'>
        <h2 className='font-semibold text-2xl '> Delivery Information </h2>
        <div className=''>
          <input name='firstName' onChange={ onChangeHandler} value={data.firstName} className='p-1 border-2 border-gray-200 ' type='text' placeholder='First-name' />
          <input name='lastName' onChange={ onChangeHandler} value={data.lastName} className='p-1 border-2 border-gray-200 ' type='text' placeholder='Last-name' />
        </div>
        <div>
          <input name='email' onChange={onChangeHandler} value={data.email} className='p-1 border-2 border-gray-200 ' type='text' placeholder='Email' />
          <input name='street' onChange={onChangeHandler} value={data.street} className='p-1 border-2 border-gray-200 ' type='text' placeholder='Street' />
        </div>
        <div>
          <input name='city' onChange={onChangeHandler} value={data.city} className='p-1 border-2 border-gray-200 ' type='text' placeholder='City' />
          <input name='state' onChange={onChangeHandler} value={data.state} className='p-1 border-2 border-gray-200 ' type='text' placeholder='State' />
        </div>
        <div>
          <input name='zip' onChange={onChangeHandler} value={data.zip} className='p-1 border-2 border-gray-200 ' type='text' placeholder='Zip-code' />
          <input name='country' onChange={onChangeHandler} value={data.country} className='p-1 border-2 border-gray-200 ' type='text' placeholder='Country' />
        </div>
        <div className='flex justify-between items-center mt-3' >
                    <div className='w-full space-y-2 items-center'>
                      <h2 className='font-semibold text-2xl'> Cart Total</h2>
                      <div className='flex justify-between items-center  text-gray-500 mb-0 '> 
                        <p>Sub Total</p>
                        <p> ${ getAmount()  } </p>
                      </div>
                      <hr className=' border-gray-200 ' />
                      <div className='flex justify-between items-center text-gray-500 mb-0 '> 
                        <p >Delivery Fees</p>
                        <p > $ 2 </p>
                      </div>
                      <hr className=' my-1 border-gray-200 ' />
                      <div className='flex justify-between items-center text-gray-900 font-semibold mb-0 '> 
                        <p>Grand Total</p>
                        <p> ${ getAmount() + 2} </p>
                      </div>
                      <br/>
                      <Link to='/order'>
                      <button onClick={orderPlace} className='px-6 py-2 bg-orange-500 text-white rounded-sm cursor-pointer '> 
                        PROCEED TO PAYMENT 
                      </button>
                      </Link>
                    </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder


