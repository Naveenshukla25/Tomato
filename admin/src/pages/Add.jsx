import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = () => {
    const [image,setImage] = useState(false);
    const [imgurl,setImgurl] = useState("");
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:""
    })

    const handleupload = async(event)=>{
    const file = event.target.files[0];
    if(!file) return;
    const imgdata =  new FormData();
    imgdata.append('file',file);
    imgdata.append('upload_preset','first_upload');
    imgdata.append('cloud_name','deq1dvpgp');
    const res = await fetch('https://api.cloudinary.com/v1_1/deq1dvpgp/image/upload',{
        method:'POST',
        body:imgdata
    })
    const result = await res.json();
    setImgurl(result.url);
    console.log(result.url);
    }

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({...data,[name]:value }))
    }

    const submitHandler = async(event) =>{
        event.preventDefault();
        const foodData = {
            name: data.name,
            description: data.description,
            price: Number(data.price),
            category: data.category,
            image: imgurl
        };
        const response = await axios.post(assets.url+'/api/food/add', foodData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:""
            })
            setImage(false);
            setImgurl("");
            toast.success("Food Item Added Successfully");
        }else{
            toast.error("Error");
        }
    }
  return (
    <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6 md:p-8 lg:p-10'>
        <div className='max-w-4xl mx-auto'>
            <div className='bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 lg:p-12'>
                <h1 className='text-3xl sm:text-4xl font-bold text-gray-800 mb-2 sm:mb-4'>Add New Food Item</h1>
                <p className='text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base'>Fill in the details below to add a new item to your menu</p>
                
                <form className='space-y-6 sm:space-y-8' onSubmit={submitHandler}>
                    {/* Image Upload Section */}
                    <div className='space-y-3'>
                        <label className='block text-lg sm:text-xl font-semibold text-gray-700 mb-3'>
                            Upload Image
                        </label>
                        <div className='flex flex-col items-center justify-center'>
                            <label className='cursor-pointer group'>
                                <div className='relative overflow-hidden rounded-xl border-2 border-dashed border-gray-300 group-hover:border-orange-500 transition-all duration-300 bg-gray-50 group-hover:bg-orange-50 p-6 sm:p-8'>
                                    <img 
                                        className='w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105 mx-auto' 
                                        src={imgurl || assets.upload_area} 
                                        alt="Upload area" 
                                    />
                                    {!imgurl && (
                                        <div className='mt-4 text-center'>
                                            <p className='text-sm text-gray-500 group-hover:text-orange-600 transition-colors'>
                                                Click to upload
                                            </p>
                                            <p className='text-xs text-gray-400 mt-1'>
                                                PNG, JPG up to 10MB
                                            </p>
                                        </div>
                                    )}
                                </div>
                                <input 
                                    onChange={handleupload} 
                                    type='file' 
                                    accept='image/*'
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>

                    {/* Product Name */}
                    <div className='space-y-2'>
                        <label className='block text-lg sm:text-xl font-semibold text-gray-700'>
                            Product Name <span className='text-red-500'>*</span>
                        </label>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.name} 
                            name='name' 
                            className='w-full px-4 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 placeholder-gray-400' 
                            type='text' 
                            placeholder='Enter product name...' 
                            required
                        />
                    </div>

                    {/* Product Description */}
                    <div className='space-y-2'>
                        <label className='block text-lg sm:text-xl font-semibold text-gray-700'>
                            Product Description <span className='text-red-500'>*</span>
                        </label>
                        <textarea 
                            onChange={onChangeHandler} 
                            value={data.description} 
                            name='description' 
                            className='w-full px-4 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 placeholder-gray-400 resize-none' 
                            cols='30' 
                            rows='5' 
                            placeholder='Write a detailed description of the product...'
                            required
                        />
                    </div>

                    {/* Category and Price */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
                        {/* Product Category */}
                        <div className='space-y-2'>
                            <label className='block text-lg sm:text-xl font-semibold text-gray-700'>
                                Product Category <span className='text-red-500'>*</span>
                            </label>
                            <select 
                                name='category' 
                                onChange={onChangeHandler}
                                value={data.category}
                                className='w-full px-4 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 cursor-pointer appearance-none bg-[url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e")] bg-[length:1.5em_1.5em] bg-[right_0.75rem_center] bg-no-repeat pr-10'
                                required
                            >
                                <option value="" disabled>Select a category</option>
                                <option value="Salad">Salad</option>
                                <option value="Roll">Roll</option>
                                <option value="Desert">Desert</option>
                                <option value="Sandwich">Sandwich</option>
                                <option value="cake">Cake</option>
                                <option value="Pure-veg">Pure-veg</option>
                                <option value="pasta">pasta</option>
                                <option value="Noodle">Noodle</option>
                            </select>
                        </div>

                        {/* Product Price */}
                        <div className='space-y-2'>
                            <label className='block text-lg sm:text-xl font-semibold text-gray-700'>
                                Product Price <span className='text-red-500'>*</span>
                            </label>
                            <div className='relative'>
                                <span className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold'>$</span>
                                <input 
                                    onChange={onChangeHandler} 
                                    value={data.price} 
                                    className='w-full pl-8 pr-4 py-3 sm:py-4 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all duration-200 text-gray-800 placeholder-gray-400' 
                                    type='number' 
                                    name='price' 
                                    placeholder='20.00' 
                                    step='0.01'
                                    min='0'
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className='pt-4'>
                        <button 
                            type='submit' 
                            className='w-full sm:w-auto px-8 sm:px-16 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300'
                        >
                            Add Food Item
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Add

