import mongoose from "mongoose";

const foodschema=new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    price:{type:Number,required:true},
    image:{type:String},
<<<<<<< HEAD
    category:{type:String,required:true},
    isAsset:{type:Boolean,default:false}
=======
    category:{type:String,required:true}

>>>>>>> 1b69a9ca1a54446af8b8c4f195adddaa24068527

})

const foodmodel=mongoose.models.food || mongoose.model("food",foodschema);

export default foodmodel;