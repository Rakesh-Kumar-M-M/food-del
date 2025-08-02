import React, { useContext } from 'react'
import "./Placeorder.css"
import { StoreContext } from '../../Context/StoreContext'
const Placeorder = () => {
  const {getTotal}=useContext(StoreContext)
  return (
    <form className='placeorder'>
      <div className='place-left'>
        <p className='title'>Delivery Info</p>
        <div className='multifield'>
          <input type="text" placeholder='First-name' />
          <input type="text" placeholder='Last-name' />
        </div>
        <input type="email" placeholder='Email Address' />
        <input type="text" placeholder='Street' />
        <div className='multifield'>
          <input type="text" placeholder='City' />
          <input type="text" placeholder='State' />
        </div>
        <div className='multifield'>
          <input type="text" placeholder='Zip-code' />
          <input type="text" placeholder='Country' />
        </div>
        <input type="text" placeholder='Phone' />
      </div>
      <div className='placeright'>
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
            <button>PROCEED TO PAYMENT</button>
          </div>
          
      </div>
      
    </form>
  )
}

export default Placeorder
