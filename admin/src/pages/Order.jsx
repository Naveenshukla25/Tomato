import React ,{ useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import assets from "../assets/assets.js"

const Order = () => {
  const [orders, setOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get(assets.url + '/api/order/list');
      if (res.data.success) {
        setOrder(res.data.data);
      } else {
        toast.error("Error in fetching orders");
      }
    } catch (error) {
      // Fallback in case backend has not been restarted yet
      try {
        const fallback = await axios.get(assets.url + '/api/order/userorder');
        if (fallback.data && fallback.data.success) {
          setOrder(fallback.data.data);
          return;
        }
      } catch (e) {}
      toast.error("Failed to fetch orders from server");
    } finally {
      setLoading(false);
    }
  }

  const getNormalizedStatus = (status) => {
    const s = (status || '').toLowerCase().trim();
    if (s.includes('delivered')) return 'Delivered';
    if (s.includes('out') || s.includes('delivery')) return 'Out for Delivery';
    return 'Food Processing';
  };

  const statusHandler = async (event, orderId) => {
    const newStatus = event.target.value;
    try {
      const res = await axios.post(assets.url + '/api/order/status', {
        orderId,
        id: orderId,
        status: newStatus,
      });
      if (res.data.success) {
        toast.success(res.data.message || `Status updated to ${newStatus}`);
        setOrder((prevOrders) =>
          prevOrders.map((ord) =>
            ord._id === orderId ? { ...ord, status: newStatus } : ord
          )
        );
      } else {
        toast.error(res.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating status on server");
    }
  }

  useEffect(() => {
    fetchAllOrder();
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 lg:p-10'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800'>Order Management</h1>
            <p className='text-gray-500 text-sm sm:text-base mt-1'>Manage and track all customer orders</p>
          </div>
          <button 
            onClick={fetchAllOrder} 
            className='self-start sm:self-auto px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 font-medium text-gray-700 text-sm flex items-center gap-2 cursor-pointer transition-colors'
          >
            <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Orders
          </button>
        </div>
        
        {orders.length === 0 ? (
          <div className='bg-white rounded-xl shadow-md p-8 sm:p-12 text-center'>
            <img src={assets.parcel_icon} alt="No orders" className='w-24 h-24 mx-auto mb-4 opacity-50' />
            <p className='text-gray-500 text-lg sm:text-xl'>No orders found</p>
          </div>
        ) : (
          <div className='space-y-4 sm:space-y-6'>
            {orders.map((order, index) => {
                const totalItemsCount = order.items?.reduce((acc, curr) => acc + (curr.quantity || 1), 0) || 0;
                const formattedDate = order.date ? new Date(order.date).toLocaleString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'N/A';

                return (
                  <div 
                    className='bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden border border-gray-100' 
                    key={order._id || index}
                  > 
                    <div className='p-4 sm:p-6 md:p-8'>
                      {/* Header Section - Icon and Item Count */}
                      <div className='flex items-start gap-4 sm:gap-6 mb-4 sm:mb-6'>
                        <div className='flex-shrink-0'>
                          <img 
                            className='w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-contain bg-orange-50 rounded-xl p-2' 
                            src={assets.parcel_icon} 
                            alt="Order icon" 
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
                            <div>
                              <div className='flex items-center gap-2'>
                                <h2 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800'>
                                  Order #{order._id ? order._id.slice(-6).toUpperCase() : (index + 1)}
                                </h2>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                                  order.status === 'Delivered' 
                                    ? 'bg-green-100 text-green-800' 
                                    : order.status === 'Out for Delivery'
                                    ? 'bg-blue-100 text-blue-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}>
                                  {order.status || 'Food Processing'}
                                </span>
                              </div>
                              <p className='text-xs sm:text-sm text-gray-500 mt-1'>
                                Date: {formattedDate} | Total Units: {totalItemsCount}
                              </p>
                            </div>
                            <div className='flex-shrink-0'>
                              <label className='block text-xs font-semibold text-gray-600 mb-1 sm:hidden'>Update Status:</label>
                              <select 
                                value={getNormalizedStatus(order.status)}
                                onChange={(e) => statusHandler(e, order._id)}
                                className='w-full sm:w-auto px-4 py-2 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 cursor-pointer text-sm sm:text-base font-semibold shadow-sm'
                              >
                                <option value="Food Processing">Food Processing</option>
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
                          <h3 className='text-sm sm:text-base font-semibold text-gray-700 mb-3 uppercase tracking-wide flex items-center justify-between'>
                            <span>Order Items</span>
                            <span className='text-xs font-normal text-gray-500'>{order.items?.length || 0} unique item(s)</span>
                          </h3>
                          <div className='space-y-2 max-h-48 overflow-y-auto pr-1'>
                            {order.items?.map((item, itemIndex) => {
                                return (
                                  <div 
                                    className='bg-gray-50 rounded-lg p-3 border border-gray-200 flex items-center justify-between' 
                                    key={itemIndex}
                                  >
                                    <div>
                                      <p className='font-semibold text-gray-800 text-sm sm:text-base'>
                                        {item.name}
                                      </p>
                                      <p className='text-gray-600 text-xs sm:text-sm mt-0.5'>
                                        Quantity: <span className='font-bold text-orange-600'>{item.quantity}</span>
                                      </p>
                                    </div>
                                    <p className='text-sm font-semibold text-gray-700'>
                                      ${((Number(item.price) || 0) * (item.quantity || 1)).toFixed(2)}
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
                              <p className='text-sm sm:text-base font-semibold text-gray-800 mt-0.5'>
                                {order.address?.firstName} {order.address?.lastName}
                              </p>
                            </div>
                            {order.address?.email && (
                              <div>
                                <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>Email</p>
                                <p className='text-sm text-gray-700 mt-0.5 break-all'>{order.address?.email}</p>
                              </div>
                            )}
                            <div>
                              <p className='text-xs sm:text-sm text-gray-500 uppercase tracking-wide'>Address</p>
                              <p className='text-sm text-gray-800 mt-0.5 break-words'>
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
                          <div className='bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4 sm:p-6 border-2 border-orange-200 h-[calc(100%-2rem)] flex flex-col justify-between'>
                            <div>
                              <p className='text-xs sm:text-sm text-gray-600 uppercase tracking-wide mb-2'>Total Amount</p>
                              <p className='text-2xl sm:text-3xl md:text-4xl font-bold text-orange-600'>
                                ${Number(order.amount || 0).toFixed(2)}
                              </p>
                            </div>
                            <div className='mt-4 pt-3 border-t border-orange-200 text-xs text-gray-600'>
                              <span>Payment: </span>
                              <span className='font-semibold text-gray-800'>
                                {order.payment ? "Paid Online" : "Cash on Delivery"}
                              </span>
                            </div>
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
