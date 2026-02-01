import express from "express"
<<<<<<< HEAD
import { addfood, addfoodFromUrl, syncAssets, listfood, removefood } from "../controllers/foodcontroller.js"
=======
import { addfood, listfood, removefood } from "../controllers/foodcontroller.js"
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
import multer from "multer"

const foodRouter=express.Router();
console.log('Food Router')

//foodRouter.post("/add",addfood)

const storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})
const upload=multer({storage:storage})
foodRouter.post("/add",upload.single("image"),addfood)
<<<<<<< HEAD
// Add from remote URL (admin import of asset images)
foodRouter.post("/add-from-url",express.json(),addfoodFromUrl)
foodRouter.post("/sync-assets",express.json(),syncAssets)
=======
>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527
foodRouter.get("/list",listfood)
foodRouter.post("/remove",removefood)
export default foodRouter