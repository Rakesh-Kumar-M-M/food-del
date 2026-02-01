import 'dotenv/config'
import express from "express"
import path from "path"
import cors from "cors"
import mongoose from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodroute.js"
import { seedDatabase } from "./controllers/foodcontroller.js"
import userRouter from "./routes/userroute.js"
import cartrouter from "./routes/cartroute.js"
import orderRouter from "./routes/orderroute.js"


const app = express()
const port = process.env.PORT || 4000

app.use(express.json())
app.use(cors())

// Start DB connection but do not crash the process immediately; connectDB returns boolean success
let dbConnected = false
  ; (async () => {
    dbConnected = await connectDB({ retries: 5, delay: 2000 })
    if (dbConnected) await seedDatabase()
  })()

app.use("/api/order", orderRouter)
app.use("/api/cart", cartrouter)
app.use("/api/food", foodRouter)
app.use("/images", express.static(path.resolve("..", "uploads")))
app.use("/api/user", userRouter)

app.get("/", (req, res) => {
  res.send("API WORKING")
})

// Health endpoint to help Render/you check app and DB status
app.get('/health', (req, res) => {
  const mongooseState = mongoose.connection && mongoose.connection.readyState
  // readyState: 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  res.json({ ok: true, dbConnected: mongooseState === 1, mongooseState })
})

app.listen(port, () => {
  console.log(`server started on http://localhost:${port}`)
})



//mongodb+srv://Rakesh:<db_password>@cluster0.m8l63.mongodb.net/?
// local -> mongodb://localhost:27017/