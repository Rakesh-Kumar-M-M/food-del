import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets/frontend_assets/assets";
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  const addtocart = (itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removecart = (itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
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
  const contextValue = {
    food_list,
    cartItems,
    setcartItems,
    removecart,
    addtocart,
    getTotal
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
