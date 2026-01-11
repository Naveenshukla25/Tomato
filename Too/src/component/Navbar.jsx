import React from 'react'
import { assets } from '../frontend_assets/assets'
import { Link} from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../Context/StoreContext';
import  {useNavigate } from 'react-router-dom';


const Navbar = ({ setShowLogin }) => {
  const [menu,setMenu] = React.useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const { token ,setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/')
  } 

  return (
    <div className='bg-white shadow-md sticky top-0 z-50'>
      <div className='p-4 w-full max-w-7xl mx-auto flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' className='flex-shrink-0' onClick={() => setMobileMenuOpen(false)}> 
          <img src={assets.logo} alt='' className='w-24 md:w-32'/> 
        </Link>
        
        {/* Desktop Navigation items */}
        <ul className='hidden md:flex gap-4 lg:gap-6 text-gray-600 text-sm lg:text-base cursor-pointer'>
          <a href='/' onClick={() => setMenu('home')} className={`transition-colors ${menu === 'home' ? 'border-b-2 border-orange-500 text-orange-500 font-semibold' : 'hover:text-orange-500'}`}> Home </a>
          <a href='#explore-menu' onClick={ () => setMenu('menu')} className={`transition-colors ${menu === 'menu' ? 'border-b-2 border-orange-500 text-orange-500 font-semibold' : 'hover:text-orange-500'}`}> Menu </a>
          <a href='#app-download' onClick={() => setMenu('Mobile')} className={`transition-colors ${menu === 'Mobile' ? 'border-b-2 border-orange-500 text-orange-500 font-semibold' : 'hover:text-orange-500'}`}> Mobile App </a>
          <a href='#footer' onClick={() => setMenu('Contact')} className={`transition-colors ${menu === 'Contact' ? 'border-b-2 border-orange-500 text-orange-500 font-semibold' : 'hover:text-orange-500'}`}> Contact Us </a>
        </ul>

        {/* Desktop Search icon and signin button */}
        <div className='hidden md:flex items-center gap-4 lg:gap-6'>
          {/* Search icon */}
          <img src={assets.search_icon} alt='' className='w-5 h-5 cursor-pointer hover:opacity-70 transition-opacity'/> 
          {/* Basket icon */}
          <Link to='/cart' className='relative'>
            <img src={assets.basket_icon} alt='' className='w-6 h-6 cursor-pointer hover:opacity-70 transition-opacity'/>
          </Link>
          {/* Signin button */}
          <div>
            {!token 
              ?<button onClick={() => setShowLogin(true)} className='bg-white px-4 lg:px-6 py-2 text-gray-600 border-2 border-orange-500 rounded-full cursor-pointer hover:bg-orange-500 hover:text-white transition-all duration-300 text-sm lg:text-base font-semibold'> 
                Sign In
              </button> 
            : <div className="relative cursor-pointer group">
            <img src={assets.profile_icon} alt="" className='w-6 h-6' />
            <ul className="absolute right-0 z-10 hidden group-hover:flex flex-col gap-2 w-36 bg-white border-2 border-gray-200 rounded-xl p-3 shadow-lg">
            <li className="flex items-center gap-2 hover:text-orange-500 transition-colors">
            <img src={assets.bag_icon} alt="" className='w-4 h-4' />
              <p className='text-sm'>Orders</p>
            </li>
            <hr className='border-gray-200' />
            <li onClick={logout} className="flex items-center gap-2 hover:text-red-500 transition-colors cursor-pointer">
            <img src={assets.logout_icon} alt="" className='w-4 h-4' />
              <p className='text-sm'>Logout</p>
            </li>
            </ul>
          </div>}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden flex items-center gap-3'>
          <Link to='/cart' className='relative'>
            <img src={assets.basket_icon} alt='' className='w-6 h-6'/>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className='p-2 text-gray-600 focus:outline-none'
            aria-label='Toggle menu'
          >
            <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {mobileMenuOpen ? (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
              ) : (
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h16' />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className='md:hidden border-t border-gray-200 bg-white'>
          <ul className='flex flex-col p-4 space-y-4'>
            <a href='/' onClick={() => {setMenu('home'); setMobileMenuOpen(false)}} className={`py-2 px-4 rounded-lg transition-colors ${menu === 'home' ? 'bg-orange-500 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}> Home </a>
            <a href='#explore-menu' onClick={() => {setMenu('menu'); setMobileMenuOpen(false)}} className={`py-2 px-4 rounded-lg transition-colors ${menu === 'menu' ? 'bg-orange-500 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}> Menu </a>
            <a href='#app-download' onClick={() => {setMenu('Mobile'); setMobileMenuOpen(false)}} className={`py-2 px-4 rounded-lg transition-colors ${menu === 'Mobile' ? 'bg-orange-500 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}> Mobile App </a>
            <a href='#footer' onClick={() => {setMenu('Contact'); setMobileMenuOpen(false)}} className={`py-2 px-4 rounded-lg transition-colors ${menu === 'Contact' ? 'bg-orange-500 text-white font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}> Contact Us </a>
            {!token ? (
              <button onClick={() => {setShowLogin(true); setMobileMenuOpen(false)}} className='w-full py-2 px-4 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors mt-2'> 
                Sign In
              </button>
            ) : (
              <div className='space-y-2'>
                <div className='py-2 px-4 text-gray-600 flex items-center gap-2'>
                  <img src={assets.bag_icon} alt="" className='w-5 h-5' />
                  <span>Orders</span>
                </div>
                <button onClick={() => {logout(); setMobileMenuOpen(false)}} className='w-full py-2 px-4 text-red-500 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2'>
                  <img src={assets.logout_icon} alt="" className='w-5 h-5' />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </ul>
        </div>
      )}
    </div>
  )
}

export default Navbar

