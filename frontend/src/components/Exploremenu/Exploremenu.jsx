import React from 'react'
import './Exploremenu.css'
import { menu_list } from '../../assets/assets/frontend_assets/assets'
const Exploremenu = ({category,setCategory}) => {
  return (
    <div className='Explore' id='Explore'>
    <h1>EXPLORE OUR MENU</h1>
      <p className='Explore-text'>choose from a diverse menu featuring array of dishes. Our mission is to serve healthy food</p>
       <div className='Explore-list'>
        {menu_list.map((item,index)=>{
        return(
          <div onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)} key={index}className='Explore-item'>
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
            </div>
        )
            
        })}
       </div><hr></hr>
      
    </div>
  )
}

export default Exploremenu
