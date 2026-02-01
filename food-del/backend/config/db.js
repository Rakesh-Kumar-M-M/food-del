import mongoose from "mongoose"
// local -> mongodb://localhost:27017/
// global -> Use a production MongoDB URI via the MONGO_URL env var
export const connectDB=async()=>{
    const mongoUrl = process.env.MONGO_URL;
    if(!mongoUrl){
        console.error("MONGO_URL is not set. Set it in the environment (Render service env vars) or add a local .env for development.");
        process.exit(1);
    }
    try{
        await mongoose.connect(mongoUrl);
        console.log("DB connected");
    }catch(err){
        console.error("DB connection error:", err);
        process.exit(1);
    }
}