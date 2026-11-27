import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import assets from '../assets/assets';

const List = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await axios.get(assets.url + '/api/food/list');
      if (res.data.success) {
        setList(res.data.data);
      } else {
        toast.error("Error in fetching items");
      }
    } catch (error) {
      toast.error("Failed to connect to server");
    } finally {
      setLoading(false);
    }
  }

  const removeFood = async (foodId) => {
    try {
      const res = await axios.post(assets.url + '/api/food/remove', { id: foodId });
      if (res.data.success) {
        toast.success(res.data.message);
        await fetchList();
      } else {
        toast.error("Error deleting item");
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  }

  const toggleStock = async (foodId, currentStock) => {
    try {
      const newStockStatus = currentStock === false ? true : false;
      const res = await axios.post(assets.url + '/api/food/update-stock', {
        id: foodId,
        inStock: newStockStatus,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        setList((prev) =>
          prev.map((item) =>
            item._id === foodId ? { ...item, inStock: newStockStatus } : item
          )
        );
      } else {
        toast.error(res.data.message || "Failed to update stock");
      }
    } catch (error) {
      toast.error("Error updating stock status");
    }
  }

  useEffect(() => {
    fetchList();
  }, []);
  
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 lg:p-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800'>Product List & Inventory</h1>
            <p className='text-gray-500 text-sm sm:text-base mt-1'>Manage items, pricing, and stock availability</p>
          </div>
          <button 
            onClick={fetchList} 
            className='self-start sm:self-auto px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium text-gray-700 text-sm flex items-center gap-2 cursor-pointer transition-colors'
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh List
          </button>
        </div>
        
        {list.length === 0 ? (
          <div className='bg-white rounded-xl shadow-md p-8 sm:p-12 text-center'>
            <div className='w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center'>
              <svg className='w-12 h-12 text-gray-400' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' />
              </svg>
            </div>
            <p className='text-gray-500 text-lg sm:text-xl'>No items found</p>
            <p className='text-gray-400 text-sm sm:text-base mt-2'>Add your first item to get started</p>
          </div>
        ) : (
          <>
            {/* Desktop Table Header */}
            <div className='hidden md:grid md:grid-cols-12 gap-4 bg-white rounded-t-xl border-2 border-gray-200 p-4 font-semibold text-gray-700 uppercase text-xs sm:text-sm tracking-wide items-center'>
              <div className='col-span-2'>Image</div>
              <div className='col-span-3'>Name</div>
              <div className='col-span-2'>Category</div>
              <div className='col-span-1'>Price</div>
              <div className='col-span-2 text-center'>Stock Status</div>
              <div className='col-span-2 text-center'>Actions</div>
            </div>

            {/* Items List */}
            <div className='space-y-3 sm:space-y-4'>
              {list.map((item, index) => {
                const isInStock = item.inStock !== false;

                return (
                  <div 
                    key={item._id || index} 
                    className={`bg-white rounded-lg md:rounded-none md:last:rounded-b-xl border-2 ${
                      !isInStock ? 'border-red-200 bg-red-50/20' : 'border-gray-200'
                    } hover:border-orange-300 hover:shadow-lg transition-all duration-200 overflow-hidden`}
                  >
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-4 p-4 sm:p-5 md:p-4 items-center'>
                      {/* Image */}
                      <div className='md:col-span-2 flex justify-center md:justify-start relative'>
                        <img 
                          className={`w-24 h-24 sm:w-28 sm:h-28 md:w-20 md:h-20 object-cover rounded-lg border-2 ${
                            !isInStock ? 'border-red-300 opacity-75 grayscale-[40%]' : 'border-gray-100'
                          }`} 
                          src={item.image} 
                          alt={item.name} 
                        />
                        {!isInStock && (
                          <span className='absolute bottom-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow'>
                            OUT OF STOCK
                          </span>
                        )}
                      </div>

                      {/* Name */}
                      <div className='md:col-span-3'>
                        <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden'>Name</p>
                        <p className='text-base sm:text-lg md:text-base font-semibold text-gray-800 break-words'>
                          {item.name}
                        </p>
                        <p className='text-xs text-gray-500 line-clamp-1 mt-0.5 hidden md:block'>
                          {item.description}
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
                      <div className='md:col-span-1'>
                        <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden'>Price</p>
                        <p className='text-lg sm:text-xl md:text-base font-bold text-orange-600'>
                          ${(Number(item.price) || 0).toFixed(2)}
                        </p>
                      </div>

                      {/* Stock Status Badge */}
                      <div className='md:col-span-2 flex flex-col items-start md:items-center justify-center gap-1'>
                        <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide mb-1 md:hidden'>Stock Status</p>
                        {isInStock ? (
                          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200'>
                            <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
                            In Stock
                          </span>
                        ) : (
                          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200'>
                            <span className='w-2 h-2 rounded-full bg-rose-500'></span>
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className='md:col-span-2 flex flex-col sm:flex-row md:flex-col lg:flex-row items-center justify-center gap-2'>
                        {/* Toggle Stock Button */}
                        <button
                          onClick={() => toggleStock(item._id, isInStock)}
                          title={isInStock ? "Click to mark as Out of Stock" : "Click to mark as In Stock"}
                          className={`w-full sm:w-auto px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all flex items-center justify-center gap-1 shadow-sm ${
                            isInStock
                              ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300'
                          }`}
                        >
                          <svg className='w-3.5 h-3.5' fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <span>{isInStock ? 'Set Out of Stock' : 'Set In Stock'}</span>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => removeFood(item._id)}
                          title="Delete item"
                          className='w-full sm:w-auto px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-semibold rounded-lg text-xs cursor-pointer transition-all flex items-center justify-center gap-1'
                        >
                          <svg className='w-3.5 h-3.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                          </svg>
                          <span>Delete</span>
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

