import express from "express"
import authmidware from "../middleware/auth.js"
import { placeorder, verifyorder } from "../controllers/ordercontroller.js"

const orderRouter=express.Router()

orderRouter.post("/place",authmidware,placeorder)
orderRouter.post("/place",authmidware,verifyorder)


export default orderRouter