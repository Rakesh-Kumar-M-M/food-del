import React, { useContext, useEffect } from 'react'
import "./verify.css"
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from "axios"
import { StoreContext } from '../../Context/StoreContext';
const Verify = () => {
  const [searchpara, setsearchpara] = useSearchParams();
  const success = searchpara.get("success")
  const orderId = searchpara.get("orderId")
  console.log(success, orderId)
  const { url } = useContext(StoreContext)
  const navigate = useNavigate();
  const verifypayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { success, orderId })
      console.log(response)
      if (response.data.success) {
        navigate("/myorders")
      }
      else {
        navigate("/")
      }
    } catch (error) {
      console.error("Payment verification error", error);
      // Fallback to myorders or home if verification fails technicaly but maybe succeeded on stripe
      // Or better, go home or show error. User wants 'orders path', let's try that.
      navigate("/myorders");
    }
  }
  useEffect(() => {
    verifypayment();
  }, [])
  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
