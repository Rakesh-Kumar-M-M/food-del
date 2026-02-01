import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import foodmodel from "./models/foodmodel.js";

(async () => {
    await connectDB();
    const foods = await foodmodel.find({});
    console.log("Found", foods.length, "items");
    foods.forEach(f => {
        console.log(`- ${f.name}: [${f.image}]`);
    });
    process.exit(0);
})();
