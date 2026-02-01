<<<<<<< HEAD
import React,{useContext} from 'react'
import "./Fooddisp.css"
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
const Fooddisp = ({category}) => {
    const {food_list}=useContext(StoreContext)
  return (
    <div className='food-display' id="food-display">

      <h2>Top dishes near you</h2>
      <div className='food-disp-list'>
        {food_list.map((item,index)=>{{
        //  console.log(category,item.category)
        }
        if (category==='All' || category===item.category){
         return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} rating={item.rating}></FoodItem>
}})}
      </div>
    </div>
  )
}

export default Fooddisp
=======
import React, { useContext } from "react";
import "./Fooddisp.css";
import { StoreContext } from "../../Context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";

const Fooddisp = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>

      <div className="food-disp-list">
        {food_list
          .filter(
            (item) => category === "All" || category === item.category
          )
          .map((item) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default Fooddisp;
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
