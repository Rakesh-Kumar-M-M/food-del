import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodroute.js"
import userRouter from "./routes/userroute.js"
import 'dotenv/config'
import cartrouter from "./routes/cartroute.js"
import orderRouter from "./routes/orderroute.js"


const app=express()
const port=process.env.PORT || 4000


app.use(express.json())
app.use(cors())

connectDB();
app.use("/api/order",orderRouter)
app.use("/api/cart",cartrouter)
app.use("/api/food",foodRouter)
app.use("/images",express.static(`uploads`))
app.use("/api/user",userRouter)

app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})



//mongodb+srv://Rakesh:<db_password>@cluster0.m8l63.mongodb.net/?
// local -> mongodb://localhost:27017/