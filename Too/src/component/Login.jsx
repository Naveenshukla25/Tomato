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
    <div className='absolute z-1 h-screen w-screen bg-gray-500 opacity-95 flex justify-center  '>
        <form  onSubmit={ onLogin } className=' bg-white p-4 flex flex-col gap-4 border-2 border-gray-500 rounded-2xl shadow-lg'>
            <div className='flex gap-35 items-center'>
                <h2 className='text-xl font-semibold'>{ currState }</h2>
                <img onClick={()=>{ setShowLogin(false) } } src={assets.cross_icon} alt='' />
            </div>
            <div className='flex flex-col gap-4  '>
                { currState=== "Login" ?<> </>:<input onChange= { onChangeHandler } value={data.name} name='name' className='p-1 border-2 border-gray-200' type='text' placeholder='your-name' required /> }
                <input onChange={onChangeHandler} value={data.email} name='email' className='p-1 border-2 border-gray-200 ' type='email' placeholder='Email' required />
                <input onChange={onChangeHandler} value={data.password} name='password' className='p-1 border-2 border-gray-200 ' type='password' placeholder='password' required />
            </div>
            <button className='bg-orange-500 text-white px-25 py-2 rounded-sm cursor-pointer '> 
                { currState === "SignUp"?"Create-Account":"Login" } 
            </button>
            <div className='flex justify-center items-center '>
                <input type='checkbox' required />
                <p className='text-gray-500' >By continuing,I agree term and conditions</p>
            </div>
            { currState === "Login" 
            ?<p className='text-gray-500'> Create New Account ? <span onClick={ ()=>{setCurrState("SignUp")} } className='text-orange-500 cursor-pointer' > Click Here</span> </p>
            :<p className='text-gray-500' > Already have Account <span onClick={ ()=>{setCurrState("Login")} }  className='text-orange-500 cursor-pointer'> Login Here</span> </p>}
        </form>
    </div>
  )
}

export default Login


