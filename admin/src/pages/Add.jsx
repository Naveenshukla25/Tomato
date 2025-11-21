import React, { useEffect, useState } from 'react'
import assets from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = () => {
    const [image,setImage] = useState(false);
    const [data,setData] = useState({
        name:"",
        description:"",
        price:"",
        category:""
    })
    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData((data) => ({...data,[name]:value }))
    }
    const submitHandler = async(event) =>{
        event.preventDefault();
        const formData = new FormData();
        formData.append('name',data.name);
        formData.append('description',data.description);
        formData.append('price',Number(data.price));
        formData.append('category',data.category);
        formData.append('image',image);
        const response = await axios.post('http://localhost:4000/api/food/add',formData);
        if(response.data.success){
            setData({
                name:"",
                description:"",
                price:"",
                category:""
            })
            setImage(false);
            toast.success("Food Item Added Successfully");
        }else{
            toast.error("Error");
        }
    }
  return (
    <div>
        <form className='ml-10 w-2xl space-y-3 text-xl' onSubmit={submitHandler} >
            <div>
                <p>Upload Image</p>
                <label>
                    <img className='w-20 h-20' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0]) } type='file' />
            </div>
            <div>
                <p> Product Name</p>
                <input onChange={onChangeHandler } value={data.name} name='name' className='bg-gray-100' type='text' placeholder='type-here' />
            </div>
            <div>
                <p> Product Description </p>
                <textarea onChange={onChangeHandler} value={data.description} name='description' className='bg-gray-100' cols='30' rows='4' placeholder='write content here' >
                </textarea>
            </div>
            <div className='flex gap-10'>
                <div>
                    <p>Product Category </p>
                    <select name='category' onChange={onChangeHandler}>
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
                <div>
                    <p> Product Price </p>
                    <input onChange={onChangeHandler} value={data.price} className='bg-gray-100' type='Number' name='price' placeholder='$20' />
                </div>
            </div>
            <button type='submit' className='px-20 py-2 bg-gray-900 text-white' >
                Add
            </button>
        </form>
    </div>
  )
}

export default Add
