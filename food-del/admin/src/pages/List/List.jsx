import React,{useState,useEffect} from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify";
<<<<<<< HEAD
import { assets } from '../../assets/assets'
// default local foods (copied from frontend assets) to allow importing them into backend
import defaultFoods from '../../data/defaultFoods.json'

const List = ({url}) => {
  const [list,setlist]=useState([])
  const [importing,setImporting]=useState(false)
=======

const List = ({url}) => {
  const [list,setlist]=useState([])
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
  const fetchlist=async()=>{
  const response = await axios.get(`${url}/api/food/list`)
  if (response.data.success)
    {
      setlist(response.data.data)
  }
  else{
    toast.error("Error")
  }
}
const removefood=async(foodId)=>{
  console.log(foodId)
  const response= await axios.post(`${url}/api/food/remove`,{id:foodId})
  await fetchlist();
  if(response.data.success){
    toast.success(response.data.message)
  }
  else{
    toast.error("Error")
  }
}
<<<<<<< HEAD

const importDefaults=async()=>{
  if(!confirm('Sync frontend assets into backend? This will replace matching items by name. Continue?')) return;
  setImporting(true)
  try{
    const response = await axios.post(`${url}/api/food/sync-assets`,{ items: defaultFoods })
    if(response.data.success){
      toast.success(response.data.message || 'Sync complete')
      await fetchlist()
    }else{
      toast.error('Sync failed')
    }
  }catch(err){
    console.error(err)
    toast.error('Sync failed')
  }finally{setImporting(false)}
}
=======
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
useEffect(()=>{
  fetchlist()
},[])
  return (
    <div className='list add flex-col'>
<<<<<<< HEAD
      <div className='list-header'>
        <p>All food lists</p>
        <div>
          <button onClick={fetchlist} className='refresh-btn'>Refresh</button>
          <button onClick={importDefaults} disabled={importing} className='refresh-btn'>{importing? 'Syncing...':'Sync assets'}</button>
        </div>
      </div>
=======
      <p>All food lists</p>
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item,index)=>{
<<<<<<< HEAD
          // resolve image src: if item.image looks like a URL or path use it directly, otherwise prefix with backend images url
          const imgSrc = item.image && (item.image.startsWith('http') || item.image.startsWith('/') ) ? item.image : (item.image? `${url}/images/${item.image}` : null)
          return(
            <div key={index} className='list-table-format'>
              <img src={imgSrc || assets.upload_area} alt="" />
=======
          return(
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/`+item.image} alt="" />
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={()=>removefood(item._id)} className='cursor'>X</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default List
