import React, {useContext, useState} from 'react'
import "./Navbar.css"
import { assets } from '../../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Navbar = ({setLogin}) => {
  const {getTotal,token,settoken}=useContext(StoreContext)
  const [menu,setmenu]=useState("menu");
  const navigate = useNavigate();
  const logout=()=>{
    localStorage.removeItem("token");
    settoken("")
    navigate("/")
  }
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
            {!token?<button onClick={()=>setLogin(true)} className='but'>sign in</button>:
              <div className="navbar-profile">
                <img src={assets.profile_icon} alt="" />
                <ul className="nav-profile-dropdown">
                  <li onClick={()=>navigate("/myorders")}>
                    <img src={assets.bag_icon} alt="" />
                    <p>Orders</p>
                  </li>
                  <hr />
                  <li onClick={logout}><img src={assets.logout_icon} alt="" />
                  <p>Logout</p></li>
                </ul>
              </div>}
            </div>

            
          </div>
        
  )
}

export default Navbar
