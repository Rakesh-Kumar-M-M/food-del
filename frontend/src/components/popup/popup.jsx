import React,{ useState } from 'react'
import './popup.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
const popup = ({setLogin}) => {
    const [currstate,setcurrstate]=useState("Login")
  return (
    <div className='popup'>
        <form className='popup-cont'>
            <div className='popup-title'>
                <h2>{currstate}</h2>
                <img onClick={()=>setLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className='login-input'>
                {currstate==="Login"?<></>:
                <input type="text" placeholder='Your Name' required />}
                <input type="email" placeholder='Email' required />
                <input type="password" placeholder='Password' required/>
            </div>
            <button>{currstate==="sign up"?"Create Account":"Login"}</button>
            <div className='login-popup'>
                <input type="checkbox" required />
                <p>BY continuing I agree to the terms of use & privacy policy</p>
            </div>
            {currstate==="Login"?
            <p>Create New Account?<span onClick={()=>setcurrstate("sign up")}>Click here</span></p>:
            <p>Already have an account? <span onClick={()=>setcurrstate("Login")}>Login here</span></p>}
            
        </form>
    </div>
  )
}

export default popup