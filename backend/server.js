import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js";
import  foodRouter  from "./routes/foodroute.js";



const app=express()
const port=4000;



app.use(express.json())
app.use(cors())

connectDB();

app.use("/images",express.static("uploads"))

app.use("/api/food",foodRouter)
app.get("/",(req,res)=>{
    res.send("Api working")
})
app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})

// mongodb+srv://Rakeshkumar:<db_password>@cluster0.klhm6.mongodb.net/?