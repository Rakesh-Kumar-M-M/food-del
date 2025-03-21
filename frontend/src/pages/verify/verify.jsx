import React, { useContext } from 'react'
import "./verify.css"
import { useSearchParams } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext';
const verify = () => {
    const [searchpara,setsearchpara]=useSearchParams();
    const success= searchpara.get("success")
    const orderId=searchpara.get("orderId")
    const {url}=useContext(StoreContext)
    const verfiypayment=async()=>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId})
    }
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default verify
