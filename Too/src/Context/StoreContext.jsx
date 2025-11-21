import React,{createContext, useState, useEffect} from 'react'
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = (props) => {
  const [cartItem,setCartItem] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);

  
   const addToCart = async(itemId)=>{
      if(!cartItem[itemId]){
          setCartItem((prev)=>({...prev, [itemId]:1 }))
      }else{
        setCartItem((prev)=> ({...prev, [itemId]: prev[itemId]+1 }))
      }
      setToken(localStorage.getItem('token'));
      if (token) {
        await axios.post('http://localhost:4000/api/cart/add', {itemId}, { headers: {token} });
      }
  }
  const removeFromCart = async(itemId)=>{
      setCartItem((prev)=> ({...prev, [itemId]:prev[itemId]-1 }))

      if(token){
          await axios.post('http://localhost:4000/api/cart/remove', {itemId}, { headers: {token} });
      }
  }
  
  const getAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if(cartItem[item] > 0){
        let itemInfo = food_list.find((product)=> product._id === item);
        totalAmount += cartItem[item] * itemInfo.price;
      }
    }
    return totalAmount;
  }

  const fetchfood = async () => {
    const res = await axios.get('http://localhost:4000/api/food/list')
    setFoodList(res.data.data);
  }
  
  
  useEffect(() => {
    fetchfood();
  },[] ); 

  const contextValue = {
      food_list,
      cartItem,
      setCartItem,
      addToCart,
      removeFromCart,
      getAmount,
      setToken,
      token
  } 
  

  return (
    <StoreContext.Provider value={contextValue}>
        {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider