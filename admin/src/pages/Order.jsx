import React ,{ useEffect, useState} from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import assests from "../assets/assets.js"

const Order = () => {
  const[orders,setOrder] = useState([]);

  const fetchAllOrder = async () => {
    const res = await axios.get('https://tomato-server-055e.onrender.com/api/order/userorder');
    if(res.data.success){
      setOrder(res.data.data);
      console.log(res.data.data);
    }else{
      toast.error("Error in fetching order")
    }
  }
  useEffect(()=>{
    fetchAllOrder()
  },[])
  return (
    <div className='ml-25 mr-25 flex-col'>
      <p className='text-2xl ml-40 '> Order Page </p>
      <div>
        {orders.map((order, index)=>{
            return (<div  className='p-4 min-w-auto flex justify-between gap-4 border-2  border-gray-200 '  key={index}> 
              <img className='w-20 h-20' src={assests.parcel_icon} alt="" />
              <div className='flex justify-between items-center gap-8 w-full'>
                <p>
                  {order.items?.map((item, itemIndex)=>{
                      return(
                        <div className='font-semibold' key={itemIndex} >
                          {item.name + " x "+ item.quantity}
                        </ div>
                      )
                  })}
                </p>             
                <div className='flex flex-col space-y-1 ml-3'>
                  <p>{order.address.firstName+" "+order.address.lastName }</p>
                  <p className='font-bold'>{ "Amount = $" +order.amount}</p>
                  <p className='flex '>
                    { "Address = " +order.address.street+" , "+ order.address.city + " , "+ order.address.state + " , "+ order.address.zip}</p>
                </div>
                <p> Item : { order.items.length }</p>
                <select >
                  <option value="Food Processing">Processing</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>
            </div>
        )})}
      </div>
    </div>
  )
}

export default Order
