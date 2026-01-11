import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import assets from '../assets/assets';

const List = () => {
  const [list,setList] = useState([]);

  const fetchList = async () => {
    const res = await axios.get( assets.url+'/api/food/list');
    if(res.data.success){
      setList(res.data.data);
    }else{
        toast.error("Error in fetching ")
    }
  }
  const removeFood = async (foodId) => {
    const res = await axios.post( assets.url +'/api/food/remove',{ id:foodId });
    await fetchList();
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      console.log("error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 lg:p-10'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8'>Food Items List</h1>
        
        {list.length === 0 ? (
          <div className='bg-white rounded-xl shadow-md p-8 sm:p-12 text-center'>
            <div className='w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
              <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
              </svg>
            </div>
            <p className='text-gray-500 text-lg sm:text-xl'>No food items found</p>
            <p className='text-gray-400 text-sm sm:text-base mt-2'>Add your first item to get started</p>
          </div>
        ) : (
          <>
            {/* Desktop Table Header - Hidden on mobile */}
            <div className='hidden md:grid md:grid-cols-12 gap-4 bg-white rounded-t-xl border-2 border-gray-200 p-4 font-semibold text-gray-700 uppercase text-sm tracking-wide'>
              <div className='col-span-2'>Image</div>
              <div className='col-span-3'>Name</div>
              <div className='col-span-2'>Category</div>
              <div className='col-span-2'>Price</div>
              <div className='col-span-3 text-center'>Action</div>
            </div>

            {/* Items List */}
            <div className='space-y-3 sm:space-y-4'>
              {list.map((item,index)=>{
                return (
                  <div 
                    key={index} 
                    className='bg-white rounded-lg md:rounded-none md:last:rounded-b-xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-200 overflow-hidden'
                  >
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-5 md:p-4 items-center'>
                      {/* Image */}
                      <div className='md:col-span-2 flex justify-center md:justify-start'>
                        <img 
                          className='w-24 h-24 sm:w-28 sm:h-28 md:w-20 md:h-20 object-cover rounded-lg border-2 border-gray-100' 
                          src={item.image} 
                          alt={item.name} 
                        />
                      </div>

                      {/* Name */}
                      <div className='md:col-span-3'>
                        <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden'>Name</p>
                        <p className='text-base sm:text-lg md:text-base font-semibold text-gray-800 break-words'>
                          {item.name}
                        </p>
                      </div>

                      {/* Category */}
                      <div className='md:col-span-2'>
                        <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden'>Category</p>
                        <span className='inline-block px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs sm:text-sm font-medium'>
                          {item.category}
                        </span>
                      </div>

                      {/* Price */}
                      <div className='md:col-span-2'>
                        <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden'>Price</p>
                        <p className='text-lg sm:text-xl md:text-lg font-bold text-orange-600'>
                          ${(Number(item.price) || 0).toFixed(2)}
                        </p>
                      </div>

                      {/* Action Button */}
                      <div className='md:col-span-3 flex justify-center md:justify-end'>
                        <button
                          onClick={() => removeFood(item._id)}
                          className='px-4 sm:px-6 py-2 sm:py-3 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-red-300 text-sm sm:text-base flex items-center gap-2 w-full sm:w-auto justify-center'
                        >
                          <svg className='w-4 h-4 sm:w-5 sm:h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                          </svg>
                          <span className='hidden sm:inline'>Delete</span>
                          <span className='sm:hidden'>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default List

