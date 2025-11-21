import React, { useState } from 'react'
import Header from '../component/Header'
import ExploreMenu from '../component/ExploreMenu'
import FoodDisplay from '../component/FoodDisplay'
import Appdownload from '../component/Appdownload'


const Home = () => {
   const [category,setCategory] = useState("All")
  return (
    <div className='item-center'>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} setCategory={setCategory} />
      <Appdownload/>
    </div>
  )
}

export default Home
