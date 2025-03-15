import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../Context/StoreContext";
import { useNavigate } from "react-router-dom";
const Cart = ({ props }) => {
  const { cartItems, food_list, removecart,getTotal } = useContext(StoreContext);
  const navigate=useNavigate();
  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item, index) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className="cart-items-title cart-items-item">
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.price}</p>
                  <p>${cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removecart(item._id)} className="cross">
                    X
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
        <div className="cart-bot">
          <div className="cart-tot">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-tot-det">
                <p>Subtotal</p>
                <p>${getTotal()}</p>
              </div>
              <hr />
              <div className="cart-tot-det">
                <p>Delivery Fee</p>
                <p>${getTotal()===0?0:2}</p>
              </div>
              <hr />
              <div className="cart-tot-det">
                <b>Total</b>
                <b>${getTotal()===0?0:getTotal()+2}</b>
              </div>
            </div>
            <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
          </div>
          <div className="cart-promo">
            <p>IF YOU HAVE PROMOCODE ENTER HERE</p>
            <div className="cart-promo-input">
              <input type="text" placeholder="promo code" />
              <button>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
