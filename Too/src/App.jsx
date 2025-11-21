import { useState } from 'react';
import Navbar from './component/Navbar';
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Login from './component/Login';
import PlaceOrder from './pages/PlaceOrder';
import Footer from './component/Footer';

function App() {
  const [showLogin,setShowLogin] = useState(false);
  return (
    <>
    { showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className=' '>
        <Navbar setShowLogin={setShowLogin}/>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/order' element={<PlaceOrder/>} />
          </Routes>
      </div>
      <Footer/>
    </>
  )
}

export default App
