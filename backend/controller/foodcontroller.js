import foodmodel from "../model/foodmodel.js";
import fs from 'fs';

const addfood=async(req,res)=>{
    let imagename=`${req.file.filename}`;
    const food = new foodmodel({
        name :req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:imagename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const listfood= async(req,res)=>{
    try{
        const foods=await foodmodel.find({});
        res.json({success:true,data:foods})
    }
    catch(error){
        res.json({success:fasle,message:"Error"})
    }
}
const removefood=async(req,res)=>{
    try{
        const food=await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"removed"})
    }
    catch(error){
        res.json({success:false,message:"Error"})
    }
}


export {addfood,listfood,removefood}