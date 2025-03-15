import foodmodel from "../models/foodmodel.js";
import fs from 'fs'

const addfood=async(req,res)=>{
    //cdlet image_filename=`${req.file.filename}`;
    const food =new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:req.body.image
    
    })
    try{
        await food.save();
        res.json({success:true,message:"food added"})

    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addfood}