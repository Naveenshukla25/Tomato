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
    <div>
        <form className='ml-10 w-2xl space-y-3 text-xl' onSubmit={submitHandler} >
            <div>
                <p>Upload Image</p>
                <label>
                    <img className='w-20 h-20' src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={ handleupload } type='file' />
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

