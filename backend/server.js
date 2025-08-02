import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodroute.js"

const app=express()
const port=4000


app.use(express.json())
app.use(cors())

connectDB();

app.use("/api/food",foodRouter)
app.get("/",(req,res)=>{
    res.send("API WORKING")
})

app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})



//mongodb+srv://Rakesh:<db_password>@cluster0.m8l63.mongodb.net/?