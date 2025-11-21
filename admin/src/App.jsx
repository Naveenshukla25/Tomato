import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './component/Navbar'
import Slidebar from './component/Slidebar'
import Add from './pages/Add'
import Order from './pages/Order'
import List from './pages/List'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer/>
      <Navbar/>
      <hr className='b-1 border-gray-200' />
      <div className='flex '>
        <Slidebar/>
        <Routes>
          <Route path='/add' element={<Add/>}/>
          <Route path='/list' element={<List/>}/>
          <Route path='/order' element={<Order/>}/>
        </Routes>
      </div>      
    </>
  )
}

export default App
