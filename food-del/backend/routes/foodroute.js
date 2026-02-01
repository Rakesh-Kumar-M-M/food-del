import express from "express"
import path from "path"
import { addfood, addfoodFromUrl, syncAssets, listfood, removefood } from "../controllers/foodcontroller.js"
import multer from "multer"

const foodRouter = express.Router();
console.log('Food Router')

//foodRouter.post("/add",addfood)

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Resolve path relative to backend folder (process.cwd() is usually backend folder when running server)
        // If we want root 'uploads', we need to go up one level if cwd is backend, or just use absolute path.
        // Best to use path.resolve.
        cb(null, path.resolve("..", "uploads"))
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`)
    }
})
const upload = multer({ storage: storage })
foodRouter.post("/add", upload.single("image"), addfood)
// Add from remote URL (admin import of asset images)
foodRouter.post("/add-from-url", express.json(), addfoodFromUrl)
foodRouter.post("/sync-assets", express.json(), syncAssets)
foodRouter.get("/list", listfood)
foodRouter.post("/remove", removefood)
export default foodRouter