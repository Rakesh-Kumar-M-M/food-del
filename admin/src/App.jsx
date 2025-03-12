import React from 'react'
import Navbar from './components/navbar/navbar'
import Sidebar from './components/sidebar/sidebar'
import {Routes,Route} from 'react-router-dom'
import Add from './pages/add/add'
import List from './pages/list/list'
import Order from './pages/orders/order'
const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <hr />
      <div className='app-content'>
      <Sidebar></Sidebar>
      <Routes>
        <Route path="/add" element={<Add/>}/>
        <Route path="/list" element={<List/>}/>
        <Route path="/order" element={<Order/>}/>


        
      </Routes>
      </div>
    </div>
  )
}

export default App