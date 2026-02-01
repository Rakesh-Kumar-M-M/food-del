import React,{ useState } from 'react'
import './popup.css'
import { assets } from '../../assets/assets/frontend_assets/assets'
import { StoreContext } from '../../Context/StoreContext'
import { useContext } from 'react'
import axios from "axios"
const Popup = ({setLogin}) => {
    const {url,settoken}=useContext(StoreContext)

    const [currstate,setcurrstate]=useState("Login")
    const [data,setdata]=useState({
        name:"",
        email:"",
        password:""
    })
    const [agree,setAgree]=useState(false)
    const onChangeHandler=(event)=>{
        const name=event.target.name;
        const value=event.target.value;
        setdata(data=>({...data,[name]:value}))
    }
    const onLogin=async(event)=>{
        event.preventDefault();
        if (!agree){
            alert('Please accept terms to continue.')
            return;
        }
        let newUrl=url;
        if(currstate==="Login"){
            newUrl+="/api/user/login"
        }
        else{
            newUrl+="/api/user/register"
        }
        try{
            const response=await axios.post(newUrl,data)
            if (response.data.success){
                settoken(response.data.token);
                localStorage.setItem("token",response.data.token);
                setLogin(false);
            }
            else{
                alert(response.data.message || 'Failed')
            }
        }catch(error){
            console.error(error)
            const msg = error?.response?.data?.message || error.message || 'Network error'
            alert(msg)
        }
        
    }
  return (
    <div className='popup'>
        <form onSubmit={onLogin} className='popup-cont'>
            <div className='popup-title'>
                <h2>{currstate}</h2>
                <img onClick={()=>setLogin(false)} src={assets.cross_icon} alt="" />
            </div>
            <div className='login-input'>
                {currstate==="Login"?<></>:<input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Your name' required></input>}
                <input name='email' onChange={onChangeHandler} value={data.email} type="email" placeholder='Your email' required></input>
                <input name='password' onChange={onChangeHandler} value={data.password} type="password" placeholder='Your password' required></input>            
                </div>
            <button type="submit" disabled={!agree}>{currstate==="sign up"?"Create Account":"Login"}</button>
            <div className='login-popup'>
                <input type="checkbox" checked={agree} onChange={(e)=>setAgree(e.target.checked)} />
                <p>BY continuing I agree to the terms of use & privacy policy</p>
            </div>
            {currstate==="Login"?
            <p>Create New Account?<span onClick={()=>setcurrstate("sign up")}>Click here</span></p>:
            <p>Already have an account? <span onClick={()=>setcurrstate("Login")}>Login here</span></p>}
            
        </form>
    </div>
  )
}

export default Popup