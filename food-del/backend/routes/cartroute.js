import express from "express"
import { addtocart,removecart,getcart } from "../controllers/cartcontrollers.js"
import authmidware from "../middleware/auth.js"

const cartrouter=express.Router()

cartrouter.post("/add",authmidware,addtocart)
cartrouter.post("/remove",authmidware,removecart)
cartrouter.post("/get",authmidware,getcart)


export default cartrouter