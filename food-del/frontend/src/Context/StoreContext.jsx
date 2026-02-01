import { createContext, useEffect, useState } from "react";
import { food_list as assets_food_list } from "../assets/assets/frontend_assets/assets.js";
import axios from "axios"
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  // Hardcoded for local development reliability as per user request
  const url = "http://localhost:4000";
  const [token, settoken] = useState("")
  const [food_list, setfoodlist] = useState([])
  const addtocart = async (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token) {
      await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
    }
  };
  const removecart = async (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  }
  const getTotal = () => {
    let totalamount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalamount += itemInfo.price * cartItems[item];
      }
    }
    return totalamount;
  };
  const fetchfoodlist = async () => {
    try {
      const response = await axios.get(url + "/api/food/list")
      if (response.data.success) {
        setfoodlist(response.data.data)
      }
    } catch (error) {
      console.error("Error fetching food list", error)
    }
  }
  const loadcartdata = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
    setcartItems(response.data.cartdata)
  }
  useEffect(() => {

    async function loaddata() {
      await fetchfoodlist();
      if (localStorage.getItem("token")) {
        settoken(localStorage.getItem("token"))
        await loadcartdata(localStorage.getItem("token"))
      }
    }
    loaddata()
  }, [])
  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    removecart,
    addtocart,
    getTotal,
    url,
    token,
    settoken
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
