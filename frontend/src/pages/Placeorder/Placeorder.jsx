import React, { useContext,useState } from 'react'
import "./Placeorder.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from "axios"
const Placeorder = () => {
  const {getTotal,token,food_list,cartItems,url}=useContext(StoreContext)
  const [data,setdata]=useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  
  const onChangeHandler=(event)=>{
    const name=event.target.name
    const value=event.target.value
    setdata(data=>({...data,[name]:value}))
  }
  const placeorder=async(event)=>{
    event.preventDefault();
    let orderItems=[];
    food_list.map((item)=>{
      if (cartItems[item._id]>0){
        let itemInfo=item;
        itemInfo["quantity"]=cartItems[item._id]
        orderItems.push(itemInfo)
      }
    })
    let orderdata={
      address:data,
      items:orderItems,
      amount:getTotal()+2
    }
    let response= await axios.post(url+"/api/order/place",orderdata,{headers:{token}})
    if (response.data.success){
      const {session_url}=response.data;
      window.location.replace(session_url)
    }
    else{
      alert("ERRor")
    }
  }
  
  return (
    <form onSubmit={placeorder} className='placeorder'>
      <div className='place-left'>
        <p className='title'>Delivery Info</p>
        <div className='multifield'>
          <input required  name='firstName' onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First-name' />
          <input required  name='lastName' onChange={onChangeHandler} value={data.lastName} type="text" placeholder='Last-name' />
        </div>
        <input required name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' />
        <input required  name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street' />
        <div className='multifield'>
          <input required  name='city' onChange={onChangeHandler} value={data.city}type="text" placeholder='City' />
          <input required  name='state' onChange={onChangeHandler} value={data.state}type="text" placeholder='State' />
        </div>
        <div className='multifield'>
          <input required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip-code' />
          <input required  name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' />
        </div>
        <input required  name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' />
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
            <button type='submit'>PROCEED TO PAYMENT</button>
          </div>
          
      </div>
      
    </form>
  )
}

export default Placeorder
