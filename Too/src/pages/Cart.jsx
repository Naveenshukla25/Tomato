import React, { useContext } from 'react'
import Navbar from '../component/Navbar'
import Footer from '../component/Footer'
import { food_list } from '../frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'

const Cart = () => {
  const Navigate = useNavigate();
  const { cartItem, food_list, removeFromCart,  getAmount }  = useContext(StoreContext);
   return (
    <div className=' min-h-screen ml-25 mr-25 ' >
      <h1 className='text-center text-3xl font-bold mt-10'> This is Cart Page </h1>
      <div className='mt-10'>
        <div className="flex justify-around items-center  " >
          <p>Items</p>
          <p>Title</p>
          <p>Prices </p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove </p>
        </div>
         <hr className='my-1 border-gray-200 ' />
        
        {food_list.map((item,index)=>{
          if( cartItem[item._id] )
            {
              return (
                <div>
                <div className=" flex justify-around items-center space-y-5  " key={index} >
                  <img className='w-20 h-20  ' src={item.image} alt="" />
                  <p> {item.name} </p>
                  <p> ${item.price} </p>
                  <p> { cartItem[item._id] } </p>
                  <p> ${ item.price*cartItem[item._id] } </p>
                  <p onClick={()=>{ removeFromCart(item._id)}} className='text-red-500 cursor-pointer ' > * </p>
                </div>
                <hr className='my-1 border-gray-200 ' />
                </div>
              )
            }
        })}
        <div className='flex justify-between items-center  ' >
                    <div className='w-xl space-y-2 items-center'>
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
                      <button onClick={()=>{ Navigate('/order')}} className='px-6 py-2 bg-orange-500 text-white rounded-sm cursor-pointer '> 
                        PROCEED TO ORDER
                      </button>
                    </div>
                    <div className='mt-0 text-gray-500 '>
                        <h3>If have promo code , Enter here</h3>
                        <input type='text' placeholder='promr-code' className='px-2 py-1 bg-gray-200' />
                        <button className= 'px-6 py-1 bg-black text-white items-center rounded-sm'> 
                          Submit 
                        </button>
                    </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
