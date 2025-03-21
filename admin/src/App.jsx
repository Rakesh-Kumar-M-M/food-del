import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import { Routes,Route } from 'react-router-dom'
import Add from './pages/add/add'
import List from './pages/list/list'
import Order from './pages/Orders/Order'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './app.css'
const App = () => {
    const url="http://localhost:4000";
  
  return (
    <div>
      <ToastContainer></ToastContainer>
      <Navbar></Navbar>
      <hr/>
      <div className='app-cont'>
        <Sidebar></Sidebar>
        <Routes>
          <Route path="/add" element ={<Add url={url}/>}/>
          <Route path="/list" element ={<List url={url}/>}/>
          <Route path="/orders" element ={<Order url={url}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
