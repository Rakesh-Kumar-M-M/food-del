import React,{useState} from 'react'
import Navbar from './components/navbar/navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import Popup from './components/popup/popup'
const App = () => {
  const [Login,setLogin]=useState(false)
  return (
    <>
    {Login? <Popup setLogin={setLogin}/>:<></>}
    <div className='app'>
        
      <Navbar setLogin={setLogin}/>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/cart' element={<Cart></Cart>}></Route>
        <Route path='/order' element={<Placeorder></Placeorder>}></Route>
      </Routes> 
      </div>
    <Footer></Footer>
    </>
    
  )
}

export default App
