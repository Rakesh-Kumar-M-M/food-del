import { assets } from '../src/assets/assets/frontend_assets/assets'
import { StoreContext } from '../src/Context/StoreContext'
import './Myorders.css'
import axios from 'axios'
import React, {useState,useContext,useEffect} from 'react'

const Myorders = () => {
    const [data,setdata]=useState([])
    const {url,token}=useContext(StoreContext)
    const fetchorder=async()=>{
        const response=await axios.post(url+"/api/order/userorder",{},{headers:{token}})
        setdata(response.data.data)
        console.log(response.data.data)
    }

    useEffect(()=>{
        if(token){
            fetchorder()
        }
    },[token])
  
    return (
    <div className='my-order'>
        <h2>My orders</h2>
        <div className="container">
            {data.map((order,index)=>{
                return(
                    <div key={index} className="my-orders-order">
                        <img src={assets.parcel_icon} alt="" />
                        <p>{order.items.map((item,index)=>{
                            if(index===order.items.length-1){
                                return item.name+" X "+item.quantity
                            }
                            else{
                                return item.name+" X "+item.quantity+" , "
                            }
                        })}</p>
                        <p>$ {order.amount}</p>
                        <p>Items:{order.items.length}</p>
                        <p><span>&#x25cf;</span><b>{order.status}</b></p>
                        <button onClick={fetchorder}>Track Order</button>
                    </div>
                )
            })}
        </div>
      
    </div>
  )
}


export default Myorders
