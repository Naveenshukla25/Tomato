import React, { useContext, useState ,useEffect} from 'react'
import FoodItem from './FoodItem'
import { StoreContext } from '../context/StoreContext';
import axios from 'axios';

const FoodDisplay = ({ category, setCategory }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='' >
      <h2 className='font-semibold text-3xl text-gray-600 mt-5 text-center '> Top Dishes  near you </h2>
      <div className='ml-25 mr-25 grid grid-cols-4 gap-4 mt-5'>
         {food_list?.map((item, index) =>{
            if(category === 'All' || item.category === category){
            return  <FoodItem key={ index }  id = {item._id} name = {item.name} description = {item.description} price = {item.price} image = {item.image} />
            }
         })}
          
      </div>
    </div>
  )
}

export default FoodDisplay
