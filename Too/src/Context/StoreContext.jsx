import React, { createContext, useState, useEffect } from 'react'
export const StoreContext = createContext(null);
import axios from 'axios';

const StoreContextProvider = (props) => {
  const isLocal =
    typeof window !== "undefined" &&
    (window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.endsWith(".local") ||
      window.location.hostname.startsWith("192.168."));

  const url = isLocal ? "http://localhost:4000" : "https://tomato-server-055e.onrender.com";
  const [cartItem, setCartItem] = useState({});
  const [token, setToken] = useState('');
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    // Check if the item is out of stock
    const itemInfo = food_list.find((item) => item._id === itemId);
    if (itemInfo && itemInfo.inStock === false) {
      alert(`"${itemInfo.name}" is currently out of stock and cannot be added to cart.`);
      return;
    }

    if (!cartItem[itemId]) {
      setCartItem((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }

    const currentToken = token || localStorage.getItem('token');
    if (currentToken) {
      try {
        await axios.post(url + '/api/cart/add', { itemId }, { headers: { token: currentToken } });
      } catch (err) {
        console.error("Failed to sync cart add with server:", err);
      }
    }
  }

  const removeFromCart = async (itemId) => {
    setCartItem((prev) => {
      const updated = { ...prev };
      if (updated[itemId] > 1) {
        updated[itemId] -= 1;
      } else {
        delete updated[itemId];
      }
      return updated;
    });

    const currentToken = token || localStorage.getItem('token');
    if (currentToken) {
      try {
        await axios.post(url + '/api/cart/remove', { itemId }, { headers: { token: currentToken } });
      } catch (err) {
        console.error("Failed to sync cart remove with server:", err);
      }
    }
  }

  const clearCart = () => {
    setCartItem({});
  };

  const getAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        if (itemInfo) {
          totalAmount += cartItem[item] * (Number(itemInfo.price) || 0);
        }
      }
    }
    return totalAmount;
  }

  const fetchfood = async () => {
    try {
      const res = await axios.get(url + '/api/food/list')
      if (res.data.success) {
        setFoodList(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch food list:", err);
    }
  }

  const loadCartData = async (userToken) => {
    try {
      const response = await axios.post(url + "/api/cart/get", {}, { headers: { token: userToken } });
      if (response.data.success && response.data.cartData) {
        setCartItem(response.data.cartData);
      }
    } catch (err) {
      console.error("Failed to load user cart:", err);
    }
  }

  useEffect(() => {
    async function loadData() {
      await fetchfood();
      const savedToken = localStorage.getItem("token");
      if (savedToken) {
        setToken(savedToken);
        await loadCartData(savedToken);
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItem,
    setCartItem,
    clearCart,
    addToCart,
    removeFromCart,
    getAmount,
    setToken,
    token,
    url,
    fetchfood,
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider

