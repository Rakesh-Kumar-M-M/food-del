import React ,{useState} from 'react'
import "./Home.css"
import Exploremenu from '../../components/Exploremenu/Exploremenu'
import Header from '../../components/Header/Header'
import Fooddisp from '../../components/Fooddisp/Fooddisp'
import Appdown from '../../components/Appdown/Appdown'
const Home = () => {
  const [category,setCategory]=useState("All");
  return (
    <div>
      <Header></Header>
      <Exploremenu category={category}  setCategory={setCategory}></Exploremenu>
       <Fooddisp category={category}></Fooddisp>
       <Appdown></Appdown>
      </div>
  )
}

export default Home
