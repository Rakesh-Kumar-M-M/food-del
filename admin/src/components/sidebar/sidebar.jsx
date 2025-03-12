import React from 'react'
import './sidebar.css'
import { assets } from '../../assets/assets'
import {NavLink} from 'react-router-dom'
const sidebar = () => {
  return (
    <div className='sidebar'>
        <div className='side'>
        <NavLink to='/add' className='sideoption'>
            <img src={assets.add_icon} alt="" />
            <p>Add items</p>
        </NavLink>
        <NavLink to='/list' className='sideoption'>
            <img src={assets.order_icon} alt="" />
            <p>List items</p>
        </NavLink>
        <NavLink to="/order" className='sideoption'>
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </NavLink>
        </div>
    </div>
  )
}

export default sidebar