import React from 'react'
import { assets } from '../frontend_assets/assets'
import { Link} from 'react-router-dom';
import { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import  {useNavigate } from 'react-router-dom';


const Navbar = ({ setShowLogin }) => {
  const [menu,setMenu] = React.useState("home");
  const { token ,setToken } = useContext(StoreContext);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/')
  } 

  return (
    <div>
      <div className='p-4 w-auto ml-25 mr-25 flex justify-between items-center'>
        {/* Logo */}
        <Link to='/' > <img src={assets.logo} alt=''/> </Link>
        {/* Navigation items */}
        <ul className='flex gap-2.5 text-gray-500 size-10px  cursor-pointer'>
          <a href='/' onClick={() => setMenu('home')} className={menu === 'home' ? ' border-b-2 border-gray-400' : ''}> Home </a>
          <a href='#explore-menu' onClick={ () => setMenu('menu')}   className={menu === 'menu' ? 'border-b-2 border-gray-400' : ''} > Menu </a>
          <a href='#app-download' onClick={() => setMenu('Mobile')} className={menu === 'Mobile' ? 'border-b-2 border-gray-400' : " " }> mobile-app </a>
          <a href='#footer' onClick={() => setMenu('Contact')} className={menu === 'Contact' ? 'border-b-2 border-gray-400' : ''}> contact-us </a>
        </ul>
        {/* Search icon and signin button */}
        <div className='flex items-center gap-8'>
          {/* Search icon */}
          <img src={assets.search_icon} alt=''/> 
          {/* Basket icon */}
          <div>
            <Link to='/cart' > <img src={assets.basket_icon} alt=''/></Link>
            <div> </div>
          </div>
          {/* Signin button */}
          <div>
            {!token 
              ?<button onClick={() => setShowLogin(true)} className=' bg-white px-6 py-2 text-gray-400 border-2 border-gray-400 rounded-2xl cursor-pointer hover:bg-gray-400 hover:text-white transition-all duration-100'> 
                Signin
              </button> 
            : <div className="relative cursor-pointer group">
            <img src={assets.profile_icon} alt="" />
            <ul  className="absolute right-0 z-1 hidden group-hover:flex flex-col gap-2 w-30 bg-white border-2 border-gray-400 rounded-2xl p-2">
            <li className="flex items-center gap-2">
            <img src={assets.bag_icon} alt="" />
              <p>Orders</p>
            </li>
            <hr />
            <li onClick={logout} className="flex items-center gap-2">
            <img src={assets.logout_icon} alt="" />
              <p>Logout</p>
            </li>
            </ul>
          </div>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
