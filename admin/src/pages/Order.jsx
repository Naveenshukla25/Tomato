import React ,{ useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import assets from "../assets/assets.js"

const Order = () => {
  const[orders,setOrder] = useState([]);

  const fetchAllOrder = async () => {
    const res = await axios.get( assets.url +'/api/order/userorder');
    if(res.data.success){
      setOrder(res.data.data);
      console.log(res.data.data);
    }else{
      toast.error("Error in fetching order")
    }
  }
  useEffect(()=>{
    fetchAllOrder()
  },[])
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 lg:p-10'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8'>Order Management</h1>
        
        {orders.length === 0 ? (
          <div className='bg-white rounded-xl shadow-md p-8 sm:p-12 text-center'>
            <img src={assets.parcel_icon} alt="No orders" className='w-24 h-24 mx-auto mb-4 opacity-50' />
            <p className='text-gray-500 text-lg sm:text-xl'>No orders found</p>
          </div>
        ) : (
          <div className='space-y-4 sm:space-y-6'>
            {orders.map((order, index)=>{
                return (
                  <div 
                    className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden' 
                    key={index}
                  > 
                    <div className='p-4 sm:p-6 md:p-8'>
                      {/* Header Section - Icon and Item Count */}
                      <div className='flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6'>
                        <div className='flex-shrink-0'>
                          <img 
                            className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain' 
                            src={assets.parcel_icon} 
                            alt="Order icon" 
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
                            <div>
                              <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>
                                Order #{index + 1}
                              </h2>
                              <p className='text-sm sm:text-base text-gray-500 mt-1'>
                                {order.items?.length || 0} item{(order.items?.length || 0) !== 1 ? 's' : ''}
                              </p>
                            </div>
                            <div className='flex-shrink-0'>
                              <select 
                                className='w-full sm:w-auto px-4 py-2 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 cursor-pointer text-sm sm:text-base font-medium'
                              >
                                <option value="Food Processing">Processing</option>
                                <option value="Out for Delivery">Out for Delivery</option>
                                <option value="Delivered">Delivered</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Main Content Grid */}
                      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
                        {/* Order Items Section */}
                        <div className='md:col-span-1'>
                          <h3 className='text-sm sm:text-base font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
                            Order Items
                          </h3>
                          <div className='space-y-2'>
                            {order.items?.map((item, itemIndex)=>{
                                return(
                                  <div 
                                    className='bg-gray-50 rounded-lg p-3 border border-gray-200' 
                                    key={itemIndex}
                                  >
                                    <p className='font-semibold text-gray-800 text-sm sm:text-base'>
                                      {item.name}
                                    </p>
                                    <p className='text-gray-600 text-xs sm:text-sm mt-1'>
                                      Quantity: <span className='font-medium'>{item.quantity}</span>
                                    </p>
                                  </div>
                                )
                            })}
                          </div>
                        </div>

                        {/* Customer Information Section */}
                        <div className='md:col-span-1'>
                          <h3 className='text-sm sm:text-base font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
                            Customer Details
                          </h3>
                          <div className='bg-gray-50 rounded-lg p-4 space-y-2 sm:space-y-3 border border-gray-200'>
                            <div>
                              <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>Name</p>
                              <p className='text-sm sm:text-base font-semibold text-gray-800 mt-1'>
                                {order.address?.firstName} {order.address?.lastName}
                              </p>
                            </div>
                            <div>
                              <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>Address</p>
                              <p className='text-sm sm:text-base text-gray-800 mt-1 break-words'>
                                {order.address?.street}, {order.address?.city}, {order.address?.state} {order.address?.zip}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Amount Section */}
                        <div className='md:col-span-1 lg:col-span-1'>
                          <h3 className='text-sm sm:text-base font-semibold text-gray-700 mb-3 uppercase tracking-wide'>
                            Order Summary
                          </h3>
                          <div className='bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 sm:p-6 border-2 border-orange-200'>
                            <p className='text-xs sm:text-sm text-gray-600 uppercase tracking-wide mb-2'>Total Amount</p>
                            <p className='text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600'>
                              ${order.amount?.toFixed(2) || '0.00'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Order
