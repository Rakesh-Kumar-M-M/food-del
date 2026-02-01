import userModel from "../models/usermodel.js";

const addtocart=async(req,res,next)=>{
    try{
        let userdata=await userModel.findOne({_id:req.body.userId})
        let cartData=await userdata.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId]=1
        }
        else{
            cartData[req.body.itemId]+=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData})
        res.json({success:true,message:"Added to cart"})


    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

const removecart=async(req,res)=>{
    try{
        let userdata=await userModel.findById({_id:req.body.userId});
        let cartData=await userdata.cartData
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});

        res.json({success:true,message:"Food removed successfully"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }

}

const getcart=async(req,res)=>{
    try{
        let userdata=await userModel.findById(req.body.userId);
        let cartdata=await userdata.cartData;
        res.json({success:true,cartdata})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addtocart,removecart,getcart}