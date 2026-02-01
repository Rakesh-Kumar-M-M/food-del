import mongoose from "mongoose"
// local -> mongodb://localhost:27017/
// global -> mongodb+srv://Rakesh:rakesh2005m@cluster0.m8l63.mongodb.net/food-del
export const connectDB=async()=>{
<<<<<<< HEAD
    const mongoUrl = process.env.MONGO_URL || 'mongodb+srv://Rakesh:rakesh2005m@cluster0.m8l63.mongodb.net/food-del';
    (await mongoose.connect(mongoUrl).then(()=>console.log("DB connected")));
=======
    (await mongoose.connect('mongodb+srv://Rakesh:rakesh2005m@cluster0.m8l63.mongodb.net/food-del').then(()=>console.log("DB connected")));
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
}