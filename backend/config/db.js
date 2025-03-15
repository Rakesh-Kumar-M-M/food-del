import mongoose from "mongoose"
export const connectDB=async()=>{
    (await mongoose.connect('mongodb+srv://Rakesh:rakesh2005m@cluster0.m8l63.mongodb.net/food-del').then(()=>console.log("DB connected")));
}