import { React } from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";
import "./FoodItem.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
<<<<<<< HEAD
const FoodItem = ({ id, name, price, description, image, rating }) => {
   const{cartItems,addtocart,removecart,url}=useContext(StoreContext);
  return (
    <div className="Food-item">
      {/* Resolve image source: uploaded filename -> use backend /images/, otherwise use provided asset path/module */}
      <div className="Food-item-cont">
        {(() => {
          let imgSrc = ''
          if (image) {
            if (typeof image === 'string') {
              if (image.startsWith('http') || image.startsWith('/') || image.includes('/')) imgSrc = image
              else imgSrc = url+"/images/"+image
            } else {
              imgSrc = url+"/images/"+image
            }
          }
          return <img className="Food-item-img" src={imgSrc} alt="" />
        })()}
=======
const FoodItem = ({ id, name, price, description, image }) => {
   const{cartItems,addtocart,removecart,url}=useContext(StoreContext);
  return (
    <div className="Food-item">
      <div className="Food-item-cont">
        <img className="Food-item-img" src={url+"/images/"+image} alt="" />
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
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
<<<<<<< HEAD
          <div className="rating">
            <img src={assets.rating_starts} alt="" />
            <span className="rating-value">{rating || '4.5'}</span>
          </div>
=======
          <img src={assets.rating_starts} alt="" />
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
        </div>
        <p className="food-desc">{description}</p>
        <p className="food-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
