import React, {  useState } from "react";
import axios from "axios"
import "./add.css";
import { assets } from "../../assets/assets";
const add = () => {
  const url="http://localhost:4000";
  const [image, setimage] = useState(false);
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
    const formdata=new formdata();
    formdata.append("name",data.name)
    formdata.append("description",data.description)
    formdata.append("price",Number(data.price))
    formdata.append("category",data.category)
    formdata.append("image",image)
    const response=await axios.post(`${url}/api/food/add`)
  }
  
  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img upload flex-col">
          <p>Upload image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />

          <div className="add-prod flex-col">
            <p>Product name</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Type here" />
          </div>
        </div>
        <div className="add-prod-descr">
          <p>Product description</p>
          <textarea onChange={onChangeHandler} value={data.description}
            name="description"
            rows="6"
            placeholder="write content here"
            required
            id=""
          ></textarea>

          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onChangeHandler} value={data.category} name="category">
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="add-price flex-col">
              <p>Product price</p>
              <input onChange={onChangeHandler} value={data.price} type="Number" name="price" placeholder="$20" />
            </div>
          </div>
        </div>
        <button type="submit" className="add-btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default add;
