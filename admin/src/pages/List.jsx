import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { removeFood } from '../../../server/controller/foodController';

const List = () => {
  const [list,setList] = useState([]);
  const url = 'https://tomato-server-055e.onrender.com';

  const fetchList = async () => {
    const res = await axios.get('https://tomato-server-055e.onrender.com/api/food/list');
    if(res.data.success){
      setList(res.data.data);
    }else{
        toast.error("Error in fetching ")
    }
  }
  const removeFood = async (foodId) => {
    const res = await axios.post('https://tomato-server-055e.onrender.com/api/food/remove',{ id:foodId });
    await fetchList();
    if (res.data.success) {
      toast.success(res.data.message)
    } else {
      console.log("error")
    }
  }

  useEffect(()=>{
    fetchList()
  },[])
  return (
    <div className='ml-25 w-full '>
    <div className='flex justify-around  border-2 border-gray-200 '>
      <b>Image</b>
      <b>Name</b>
      <b>category</b>
      <b>Price</b>
      <b>Action</b>
    </div>
    {
      list.map((item,index)=>{
        return (
          <div>
          <div key={index} className=' p-2 flex justify-around items-center border-2 border-gray-200 ' >
              <img className='w-20 h-20' src={"https://tomato-server-055e.onrender.com/image/"+item.image} alt="" />
              <p> {item.name}</p>
              <p>{ item.category } </p>
              <p> ${ item.price }</p>
              <p onClick={()=>removeFood(item._id) } className='cursor-pointer' >X</p> 
          </div>
          <hr className='border-gray-200 '/>
          </div>
        )
      })
    }
    </div>
  )
}

export default List

