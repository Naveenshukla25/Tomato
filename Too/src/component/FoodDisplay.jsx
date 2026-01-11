import React, { useContext, useState ,useEffect} from 'react'
import FoodItem from './FoodItem'
import { StoreContext } from '../Context/StoreContext';
import axios from 'axios';

const FoodDisplay = ({ category, setCategory }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
      <h2 className='font-bold text-2xl sm:text-3xl md:text-4xl text-gray-800 mt-5 mb-8 text-center'>Top Dishes Near You</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'>
         {food_list?.map((item, index) =>{
            if(category === 'All' || item.category === category){
              console.log(item.image)
            return  <FoodItem key={ index }  id = {item._id} name = {item.name} description = {item.description} price = {item.price} image = {item.image} />
            }
         })}
          
      </div>
    </div>
  )
}

export default FoodDisplay

