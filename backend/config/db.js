import mongoose from "mongoose";
export const connectDB =async ()=>{
    await mongoose.connect('mongodb+srv://Rakeshkumar:rakesh2005m@cluster0.klhm6.mongodb.net/food-del').then(()=> console.log("DB connected"));
}