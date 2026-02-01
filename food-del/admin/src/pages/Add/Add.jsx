import React,{useState} from "react";
import { assets } from "../../assets/assets";
import "./Add.css";
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";


const Add = ({url}) => {
  const navigate = useNavigate();
  const [image,setimage]=useState(false);
  const [loading,setLoading]=useState(false);
=======


const Add = ({url}) => {
  const [image,setimage]=useState(false);
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
  const [data,setdata]=useState({
    name:"",
    description:"",
    price:"",
    category:"Salad"
  })
  
  const onChangeHandler=(event)=>{
    const name=event.target.name;
    const value=event.target.value;
    setdata(data=>({...data,[name]:value}))
  }
  const onSubmitHandler=async(event)=>{
    event.preventDefault();
<<<<<<< HEAD
    setLoading(true);
=======
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
    const formdata= new FormData();
    formdata.append("name",data.name)
    formdata.append("description",data.description)
    formdata.append("price",Number(data.price))
    formdata.append("category",data.category)
    formdata.append("image",image)
<<<<<<< HEAD
    try{
      const response=await axios.post(`${url}/api/food/add`,formdata)
      if (response.data.success){
        setdata({
          name:"",
          description:"",
          price:"",
          category:"Salad"
        })
        setimage(false)
        toast.success(response.data.message)
        // go to list so admin can immediately see the new item
        navigate('/list')
      }
      else{
        toast.error(response.data.message)
      }
    }catch(err){
      console.error(err)
      toast.error(err?.response?.data?.message || 'Error adding food')
    }finally{
      setLoading(false)
    }
}

=======
    const response=await axios.post(`${url}/api/food/add`,formdata)
    if (response.data.success){
      setdata({
        name:"",
        description:"",
        price:"",
        category:"Salad"
      })
      setimage(false)
      toast.success(response.data.message)
    }
    else{
      toast.error(response.data.message)
    }
}
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>upload image</p>
          <label htmlFor="image">
            <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setimage(e.target.files[0])} type="file" id="image" hidden required />
        </div>
        <div className="add-prod-name flex-col">
          <p>product name</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" required />
        </div>
        <div className="add-prod-desc flex-col">
          <p>product description</p>
          <textarea onChange={onChangeHandler} value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            id=""
            required
          ></textarea>
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>product category</p>
            <select onChange={onChangeHandler} value={data.category} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="cake">cake</option>
              <option value="Pure-veg">Pure-veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>product price</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="$20" />
          </div>
        </div>
        <button className="add-btn" type="submit">ADD</button>
      </form>
    </div>
  );
};

export default Add;
