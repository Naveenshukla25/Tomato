import React, { useEffect, useState } from 'react'
import { assets } from '../frontend_assets/assets'
import axios from 'axios'
import { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'

const Login = ({ setShowLogin }) => {
    const { token , setToken,url } = useContext(StoreContext);
    const [currState,setCurrState] = useState("Login");
    const [data,setData] = useState({
        name:"",
        email:"",
        password:""
    })

    const onChangeHandler = (event)=>{
        const { name, value } = event.target; // Correctly get both name and value
        setData( (prevData) => ({ ...prevData, [name]: value }) ); // Use prevData for clarity
    }


    const onLogin = async(event)=>{
        event.preventDefault();
        let newUrl;
        if (currState === "Login") {
            newUrl = url+"/api/user/login"
        } else {
            newUrl = url+"/api/user/register"
        }
        const res = await axios.post(newUrl, data);
        if (res.data.success) {
            setToken(res.data.token);
            localStorage.setItem("token", res.data.token);
            setShowLogin(false);
        } else {
            alert(res.data.message)
        } 
    }
    useEffect(()=>{
        console.log(data)
    },[data])
return (
    <div className='fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center p-4'>
        <form onSubmit={onLogin} className='bg-white p-6 md:p-8 flex flex-col gap-6 rounded-2xl shadow-2xl w-full max-w-md relative animate-fade-in'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>{currState}</h2>
                <button 
                    type='button'
                    onClick={()=>{ setShowLogin(false) }} 
                    className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                    aria-label='Close'
                >
                    <img src={assets.cross_icon} alt='Close' className='w-5 h-5' />
                </button>
            </div>
            <div className='flex flex-col gap-4'>
                { currState=== "Login" ? null : (
                    <div>
                        <label className='block text-sm font-semibold text-gray-700 mb-2'>Your Name</label>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            name='name' 
                            className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all' 
                            type='text' 
                            placeholder='Enter your name' 
                            required 
                        />
                    </div>
                )}
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Email</label>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.email} 
                        name='email' 
                        className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all' 
                        type='email' 
                        placeholder='Enter your email' 
                        required 
                    />
                </div>
                <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>Password</label>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.password} 
                        name='password' 
                        className='w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all' 
                        type='password' 
                        placeholder='Enter your password' 
                        required 
                    />
                </div>
            </div>
            <button type='submit' className='bg-orange-500 text-white px-6 py-3 rounded-lg cursor-pointer font-semibold hover:bg-orange-600 transition-colors shadow-md'> 
                { currState === "SignUp" ? "Create Account" : "Login" } 
            </button>
            <div className='flex items-start gap-2'>
                <input type='checkbox' required className='mt-1' />
                <p className='text-sm text-gray-600'>By continuing, I agree to the terms and conditions</p>
            </div>
            <div className='text-center'>
                { currState === "Login" 
                ? <p className='text-gray-600 text-sm'>Don't have an account? <span onClick={()=>{setCurrState("SignUp")}} className='text-orange-500 cursor-pointer font-semibold hover:text-orange-600 transition-colors'> Sign Up Here</span> </p>
                : <p className='text-gray-600 text-sm'>Already have an account? <span onClick={()=>{setCurrState("Login")}} className='text-orange-500 cursor-pointer font-semibold hover:text-orange-600 transition-colors'> Login Here</span> </p>
                }
            </div>
        </form>
    </div>
  )
}

export default Login


