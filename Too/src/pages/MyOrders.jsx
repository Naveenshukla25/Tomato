import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';
import { assets } from '../frontend_assets/assets';
import { Link } from 'react-router-dom';

const MyOrders = ({ setShowLogin }) => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState(null);

  const normalizeStatus = (status) => {
    const s = (status || '').toLowerCase().trim();
    if (s.includes('delivered')) return 'Delivered';
    if (s.includes('out') || s.includes('delivery')) return 'Out for Delivery';
    return 'Food Processing';
  };

  const fetchOrders = async (silent = false) => {
    if (!token) return;
    if (!silent) setLoading(true);
    try {
      const response = await axios.post(
        url + '/api/order/userorders',
        {},
        { headers: { token } }
      );
      if (response.data && response.data.success) {
        setData(response.data.data);
      } else {
        const fallback = await axios.post(
          url + '/api/order/userorder',
          {},
          { headers: { token } }
        );
        if (fallback.data && fallback.data.success) {
          setData(fallback.data.data);
        }
      }
    } catch (error) {
      try {
        const fallback = await axios.get(url + '/api/order/userorder', {
          headers: { token }
        });
        if (fallback.data && fallback.data.success) {
          setData(fallback.data.data);
        }
      } catch (e) {
        console.error('Failed to fetch user orders:', e);
      }
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
      // Auto-poll every 3 seconds to instantly reflect status changes made in admin panel
      const interval = setInterval(() => {
        fetchOrders(true);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [token]);

  const getStatusBadge = (rawStatus) => {
    const status = normalizeStatus(rawStatus);
    switch (status) {
      case 'Delivered':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200'>
            <span className='w-2 h-2 rounded-full bg-emerald-500'></span>
            Delivered
          </span>
        );
      case 'Out for Delivery':
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-blue-100 text-blue-800 border border-blue-200'>
            <span className='w-2 h-2 rounded-full bg-blue-500 animate-pulse'></span>
            Out for Delivery
          </span>
        );
      default:
        return (
          <span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold bg-amber-100 text-amber-800 border border-amber-200'>
            <span className='w-2 h-2 rounded-full bg-amber-500 animate-pulse'></span>
            Food Processing
          </span>
        );
    }
  };

  // If user is not logged in
  if (!token) {
    return (
      <div className='min-h-[70vh] flex items-center justify-center bg-gray-50 px-4'>
        <div className='max-w-md w-full text-center bg-white p-8 rounded-2xl shadow-lg border border-gray-100'>
          <img
            src={assets.bag_icon}
            alt='Orders'
            className='w-20 h-20 mx-auto mb-4 opacity-40'
          />
          <h2 className='text-2xl font-bold text-gray-800 mb-2'>Sign In to View Orders</h2>
          <p className='text-gray-500 text-sm mb-6'>
            You need to be logged in to track and view your order history.
          </p>
          <button
            onClick={() => setShowLogin && setShowLogin(true)}
            className='w-full py-3 px-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow-md transition-all cursor-pointer'
          >
            Sign In Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-6xl mx-auto'>
        {/* Page Title & Refresh */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8'>
          <div>
            <h1 className='text-2xl sm:text-3xl font-bold text-gray-900'>My Orders</h1>
            <p className='text-gray-500 text-sm mt-1'>
              Track your deliveries and view past orders
            </p>
          </div>
          <button
            onClick={fetchOrders}
            className='self-start sm:self-auto px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 font-medium text-gray-700 text-sm flex items-center gap-2 cursor-pointer transition-colors'
          >
            <svg
              className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`}
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
              />
            </svg>
            Refresh
          </button>
        </div>

        {/* Loading Indicator */}
        {loading && data.length === 0 ? (
          <div className='flex justify-center items-center py-24'>
            <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500'></div>
          </div>
        ) : data.length === 0 ? (
          /* Empty State */
          <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-12 text-center max-w-lg mx-auto'>
            <img
              src={assets.parcel_icon}
              alt='No orders'
              className='w-24 h-24 mx-auto mb-4 opacity-40'
            />
            <h3 className='text-xl font-bold text-gray-800 mb-2'>No Orders Placed Yet</h3>
            <p className='text-gray-500 text-sm mb-6'>
              Looks like you haven't ordered anything yet. Browse our menu to find your favorite food!
            </p>
            <Link
              to='/'
              className='inline-block px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl shadow transition-colors'
            >
              Explore Menu
            </Link>
          </div>
        ) : (
          /* Orders List */
          <div className='space-y-6'>
            {data.map((order, index) => {
              const totalItemsCount = order.items.reduce(
                (sum, item) => sum + (item.quantity || 1),
                0
              );
              const formattedDate = order.date
                ? new Date(order.date).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Recent';

              const isTracking = trackingOrderId === order._id;

              return (
                <div
                  key={order._id || index}
                  className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow'
                >
                  {/* Order Top Bar */}
                  <div className='bg-gray-50/80 px-4 sm:px-6 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm text-gray-600'>
                    <div className='flex items-center gap-3'>
                      <span className='font-bold text-gray-900'>
                        Order #{order._id ? order._id.slice(-6).toUpperCase() : index + 1}
                      </span>
                      <span>•</span>
                      <span>{formattedDate}</span>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Order Body */}
                  <div className='p-4 sm:p-6'>
                    <div className='grid grid-cols-1 md:grid-cols-12 gap-6 items-center'>
                      {/* Parcel Icon & Items */}
                      <div className='md:col-span-6 flex items-start gap-4'>
                        <img
                          src={assets.parcel_icon}
                          alt='Order'
                          className='w-14 h-14 object-contain flex-shrink-0 bg-orange-50 rounded-xl p-2 border border-orange-100'
                        />
                        <div className='flex-1 min-w-0'>
                          <p className='font-semibold text-gray-800 text-sm sm:text-base mb-1'>
                            {order.items.map((item, i) => {
                              if (i === order.items.length - 1) {
                                return `${item.name} x ${item.quantity}`;
                              } else {
                                return `${item.name} x ${item.quantity}, `;
                              }
                            })}
                          </p>
                          <p className='text-xs text-gray-500'>
                            Total Items: <span className='font-medium text-gray-700'>{totalItemsCount}</span>
                          </p>
                          {order.address && (
                            <p className='text-xs text-gray-400 mt-1 truncate'>
                              Delivering to: {order.address.street}, {order.address.city}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Total Amount */}
                      <div className='md:col-span-3 text-left md:text-center border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0'>
                        <span className='text-xs text-gray-500 block uppercase tracking-wide'>
                          Total Amount
                        </span>
                        <span className='text-xl sm:text-2xl font-bold text-orange-600'>
                          ${Number(order.amount).toFixed(2)}
                        </span>
                      </div>

                      {/* Action Button */}
                      <div className='md:col-span-3 flex justify-start md:justify-end border-t md:border-t-0 md:border-l border-gray-100 pt-3 md:pt-0'>
                        <button
                          onClick={() => {
                            setTrackingOrderId(isTracking ? null : order._id);
                            fetchOrders(false);
                          }}
                          className='w-full sm:w-auto px-5 py-2.5 bg-orange-50 hover:bg-orange-100 text-orange-600 font-semibold rounded-xl text-xs sm:text-sm border border-orange-200 transition-colors flex items-center justify-center gap-2 cursor-pointer'
                        >
                          <svg className='w-4 h-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' />
                          </svg>
                          <span>{isTracking ? 'Hide Details' : 'Track Order'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Live Order Tracking Stepper (Always Visible and Real-time) */}
                    {(() => {
                      const currentNormStatus = normalizeStatus(order.status);
                      const isOutForDelivery = currentNormStatus === 'Out for Delivery' || currentNormStatus === 'Delivered';
                      const isDelivered = currentNormStatus === 'Delivered';

                      return (
                        <div className='mt-6 pt-5 border-t border-gray-100 bg-gray-50/70 rounded-xl p-4'>
                          <div className='flex items-center justify-between mb-4'>
                            <h4 className='text-xs font-bold text-gray-600 uppercase tracking-wide flex items-center gap-1.5'>
                              <span className='w-2 h-2 rounded-full bg-orange-500 animate-pulse'></span>
                              Live Tracking Progress
                            </h4>
                            <span className='text-xs font-semibold text-gray-500'>
                              Status: <span className='text-gray-800 font-bold'>{currentNormStatus}</span>
                            </span>
                          </div>

                          <div className='grid grid-cols-3 gap-2 text-center text-xs'>
                            {/* Step 1: Placed & Processing */}
                            <div className='flex flex-col items-center'>
                              <div className='w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold mb-1 shadow'>
                                ✓
                              </div>
                              <span className='font-bold text-gray-800'>Processing</span>
                              <span className='text-[10px] text-gray-500'>Order Confirmed</span>
                            </div>

                            {/* Step 2: Out for Delivery */}
                            <div className='flex flex-col items-center'>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 transition-all duration-300 ${
                                  isOutForDelivery
                                    ? 'bg-orange-500 text-white shadow ring-2 ring-orange-200'
                                    : 'bg-gray-200 text-gray-500'
                                }`}
                              >
                                {isOutForDelivery ? '✓' : '2'}
                              </div>
                              <span className={`font-bold transition-colors ${isOutForDelivery ? 'text-orange-600' : 'text-gray-400'}`}>
                                Out for Delivery
                              </span>
                              <span className='text-[10px] text-gray-500'>On The Way</span>
                            </div>

                            {/* Step 3: Delivered */}
                            <div className='flex flex-col items-center'>
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center font-bold mb-1 transition-all duration-300 ${
                                  isDelivered
                                    ? 'bg-emerald-500 text-white shadow ring-2 ring-emerald-200'
                                    : 'bg-gray-200 text-gray-500'
                                }`}
                              >
                                {isDelivered ? '✓' : '3'}
                              </div>
                              <span className={`font-bold transition-colors ${isDelivered ? 'text-emerald-600' : 'text-gray-400'}`}>
                                Delivered
                              </span>
                              <span className='text-[10px] text-gray-500'>Order Received</span>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
