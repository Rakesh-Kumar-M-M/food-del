import React, {useContext, useState} from 'react'
import "./navbar.css"
import { assets } from '../../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
const navbar = ({setLogin}) => {
  const {getTotal}=useContext(StoreContext)
  const [menu,setmenu]=useState("menu");
  return (
    < div className='Navbar'>
        <Link to='/'><img src={assets.logo} alt="logo" className='logo'/></Link>
        <ul className='navbar-menu'>
          <Link to= '/' onClick={()=>setmenu("Home")}className={menu==="Home"?"active":""}>Home</Link>
          <a href='#Explore' onClick={()=>setmenu("menu")}className={menu==="menu"?"active":""}>menu</a>
          <a href='#Appdown' onClick={()=>setmenu("mobile app")}className={menu==="mobile app"?"active":""}>mobile app</a>
          <a href='#footer' onClick={()=>setmenu("contact us")}className={menu==="contact us"?"active":""}>contact us</a>
        </ul>
        <div className='navbar-right'>
           
            <img src={assets.search_icon} alt='search icon'></img>
           
          
          <div className='navbar-basketicon'>
          
            <Link to='/cart'><img src={assets.basket_icon} alt='basket-icon'></img></Link>
            <div className={getTotal()===0?"":"dot"}></div>
            </div>
            <button onClick={()=>setLogin(true)} className='but'>sign in</button></div>
            
          </div>
        
  )
}

export default navbar
