import { React } from "react";
import { assets } from "../../assets/assets/frontend_assets/assets";
import "./FoodItem.css";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext";
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
              // Absolute URL (http/https)
              if (image.startsWith('http://') || image.startsWith('https://')) {
                imgSrc = image
              }
              // Root-relative paths served by backend, e.g. '/images/filename'
              else if (image.startsWith('/')) {
                imgSrc = url.replace(/\/$/, '') + image
              }
              // Paths containing a slash but no protocol (e.g. 'uploads/filename' or 'images/filename')
              else if (image.includes('/')) {
                // If it already contains 'images/' assume it's a backend-relative path
                if (image.startsWith('images/')) imgSrc = url.replace(/\/$/, '') + '/' + image
                else imgSrc = url.replace(/\/$/, '') + '/images/' + image
              }
              // Bare filename -> served via backend /images/<filename>
              else {
                imgSrc = url.replace(/\/$/, '') + '/images/' + image
              }
            } else {
              imgSrc = url.replace(/\/$/, '') + '/images/' + image
            }
          }
          return <img className="Food-item-img" src={imgSrc} alt="" />
        })()}
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
          <div className="rating">
            <img src={assets.rating_starts} alt="" />
            <span className="rating-value">{rating || '4.5'}</span>
          </div>
        </div>
        <p className="food-desc">{description}</p>
        <p className="food-price">${price}</p>
      </div>
    </div>
  );
};

export default FoodItem;
