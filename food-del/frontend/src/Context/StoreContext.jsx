import { createContext,  useEffect,  useState } from "react";
import { food_list as assets_food_list } from "../assets/assets/frontend_assets/assets.js";
import axios from "axios"
export const StoreContext = createContext(null);
const StoreContextProvider = (props) => {
  const [cartItems, setcartItems] = useState({});
  // Use Vite env var VITE_API_URL in development or fallback to localhost
  const url = import.meta.env.VITE_API_URL || "http://localhost:4000";
  const [token,settoken]=useState("")
  const [food_list,setfoodlist]=useState([])
  const addtocart = async(itemId) => {
    if (!cartItems[itemId]) {
      setcartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if (token){
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };
  const removecart = async(itemId) => {
    setcartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  if (token){
    await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}});
  }}
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
  const fetchfoodlist=async()=>{
    const response=await axios.get(url+"/api/food/list")
    const remote = response.data.data || []
    const mapped = remote.map(item=>{
      const m = {...item}
      // If backend didn't provide an image, try to find a matching local asset by name or category
      if(!m.image){
        const match = assets_food_list.find(a=>a.name.toLowerCase() === (m.name||'').toLowerCase())
        if(match) m.image = match.image
        else{
          const cat = assets_food_list.find(a=>a.category === m.category)
          if(cat) m.image = cat.image
        }
      }
      // Ensure a rating exists (frontend-only fallback)
      if(!m.rating){
        m.rating = (4 + Math.random()).toFixed(1)
      }
      return m
    })
    // Append any local asset foods not present in backend (so frontend shows all assets)
    assets_food_list.forEach(a=>{
      const exists = mapped.find(m=>m.name && a.name && m.name.toLowerCase()===a.name.toLowerCase())
      if(!exists){
        const copy = {...a}
        if(!copy.rating) copy.rating = (4 + Math.random()).toFixed(1)
        mapped.push(copy)
      }
    })
    setfoodlist(mapped)
  }
  const loadcartdata=async(token)=>{
    const response=await axios.post(url+"/api/cart/get",{},{headers:{token}})
    setcartItems(response.data.cartdata)
  }
  useEffect(()=>{
    
    async function loaddata(){
      await fetchfoodlist();
      if(localStorage.getItem("token")){
        settoken(localStorage.getItem("token"))
        await loadcartdata(localStorage.getItem("token"))
      }
    }
    loaddata()
  },[])
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
