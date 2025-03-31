import express from "express"
import authmidware from "../middleware/auth.js"
import { listorders, placeorder, updatestatus, userorders, verifyorder } from "../controllers/ordercontroller.js"

const orderRouter=express.Router()

orderRouter.post("/place",authmidware,placeorder)
orderRouter.post("/verify",verifyorder)
orderRouter.post("/userorder",authmidware,userorders)
orderRouter.get("/list",listorders)
orderRouter.post("/status",updatestatus)

export default orderRouter