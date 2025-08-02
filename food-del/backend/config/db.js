import mongoose from "mongoose"
// local -> mongodb://localhost:27017/
// global -> mongodb+srv://Rakesh:rakesh2005m@cluster0.m8l63.mongodb.net/food-del
export const connectDB=async()=>{
    (await mongoose.connect('mongodb+srv://Rakesh:rakesh2005m@cluster0.m8l63.mongodb.net/food-del').then(()=>console.log("DB connected")));
}