import { React } from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";
import "./FoodItem.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
const FoodItem = ({ id, name, price, description, image }) => {
   const{cartItems,addtocart,removecart,url}=useContext(StoreContext);
  return (
    <div className="Food-item">
      <div className="Food-item-cont">
        <img className="Food-item-img" src={url+"/images/"+image} alt="" />
        {!cartItems[id] ? (
          <img
            className="add"
            onClick={() => addtocart(id)}
            src={assets.add_icon_white}
            alt=""
          ></img>
        ) : (
          <div className="food-counter">
            <img
              onClick={() => removecart(id)}
              src={assets.remove_icon_red}
              alt=""
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addtocart(id)}
              src={assets.add_icon_green}
              alt=""
            />
          </div>
        )}
      </div>
      <div className="food-info">
        <div className="food-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className="food-desc">{description}</p>
        <p className="food-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
