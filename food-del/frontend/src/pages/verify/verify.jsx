import React, { useContext,useEffect } from 'react'
import "./verify.css"
import { useSearchParams,useNavigate } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext';
const Verify = () => {
    const [searchpara,setsearchpara]=useSearchParams();
    const success= searchpara.get("success")
    const orderId=searchpara.get("orderId")
    console.log(success,orderId)
    const {url}=useContext(StoreContext)
    const navigate= useNavigate();
    const verifypayment=async()=>{
        const response=await axios.post(url+"/api/order/verify",{success,orderId}) 
    

        console.log(response)
        if (response.data.success){
          navigate("/myorders")
        }
        else{
          navigate("/menu")
        }
      }
    useEffect(()=>{
      verifypayment();
    },[])
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
