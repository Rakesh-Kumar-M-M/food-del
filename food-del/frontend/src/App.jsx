import React,{useState} from 'react'
import Navbar from './components/navbar/navbar'
import {Route,Routes} from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import Placeorder from './pages/Placeorder/Placeorder'
import Footer from './components/Footer/Footer'
import Popup from './components/popup/popup'
import Verify from './pages/verify/verify'
import Myorders from '../Myorders/Myorders'
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
        <Route path='/verify' element={<Verify></Verify>}></Route>
        <Route path='/myorders' element={<Myorders></Myorders>}></Route>


      </Routes> 
      </div>
    <Footer></Footer>
    </>
    
  )
}

export default App
