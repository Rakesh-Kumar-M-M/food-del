import foodmodel from "../models/foodmodel.js";
import fs from 'fs'
import path from 'path'

const addfood=async(req,res)=>{
    let image_filename=`${req.file.filename}`;
    const filepath = path.join(process.cwd(),'uploads',image_filename)
    // attempt to resize using sharp if available
    let sharp = null
    try{
        sharp = (await import('sharp')).default
    }catch(e){
        sharp = null
    }
    if(sharp){
        try{
            await sharp(filepath).resize(600,600,{fit:'cover'}).toFile(filepath+".tmp")
            fs.renameSync(filepath+".tmp",filepath)
        }catch(e){
            console.log('sharp resize failed',e)
        }
    }
    const food =new foodmodel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
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

const addfoodFromUrl=async(req,res)=>{
    // Expects JSON: { name, description, price, category, imageUrl }
    const {name,description,price,category,imageUrl} = req.body;
    try{
        if(!name || !imageUrl){
            return res.status(400).json({success:false,message:'name and imageUrl required'})
        }
        // avoid duplicates by name
        const exists = await foodmodel.findOne({name});
        if(exists){
            return res.json({success:false,message:'Item already exists'})
        }
        let filename = null
        try{
            const fetchRes = await fetch(imageUrl);
            if(!fetchRes.ok){
                throw new Error('fetch failed')
            }
            const arrayBuffer = await fetchRes.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            // derive filename
            filename = path.basename(new URL(imageUrl).pathname) || 'image.png'
            filename = `${Date.now()}-${filename}`
            const uploadPath = path.join(process.cwd(),'uploads',filename)
            fs.writeFileSync(uploadPath,buffer)
            // attempt to resize using sharp if available
            let sharp = null
            try{
                sharp = (await import('sharp')).default
            }catch(e){
                sharp = null
            }
            if(sharp){
                try{
                    await sharp(uploadPath).resize(600,600,{fit:'cover'}).toFile(uploadPath+".tmp")
                    fs.renameSync(uploadPath+".tmp",uploadPath)
                }catch(e){
                    console.log('sharp resize failed',e)
                }
            }
        }catch(err){
            // fallback to local frontend assets if available
            try{
                const fallbackName = path.basename(new URL(imageUrl).pathname)
                const localAssetPath = path.join(process.cwd(),'frontend','src','assets','assets','frontend_assets', fallbackName)
                if(fs.existsSync(localAssetPath)){
                    filename = `${Date.now()}-${fallbackName}`
                    const uploadPath2 = path.join(process.cwd(),'uploads',filename)
                    fs.copyFileSync(localAssetPath, uploadPath2)
                }else{
                    return res.status(400).json({success:false,message:'Unable to fetch image'})
                }
            }catch(e){
                console.log('fallback failed',e)
                return res.status(400).json({success:false,message:'Unable to fetch image'})
            }
        }
        const newFood = new foodmodel({
            name,
            description:description||'',
            price:price||0,
            category:category||'Misc',
            image:filename,
            isAsset:true
        })
        await newFood.save()
        res.json({success:true,message:'food added from url'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:'Error'})
    }
}

const listfood=async(req,res)=>{
    try{
        const foods=await foodmodel.find({})
        res.json({success:true,data:foods})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

const syncAssets=async(req,res)=>{
    // Expects req.body.items = [{name,description,price,category,imageUrl},...]
    const items = req.body.items || []
    if(!Array.isArray(items)) return res.status(400).json({success:false,message:'items array required'})
    try{
        const names = items.map(i=>i.name)
        // Remove existing foods that match these asset names
        await foodmodel.deleteMany({ name: { $in: names } })
        // Add each item
        const results = { added:0, failed:0 }
        for(const it of items){
            try{
                let filename = null
                try{
                  const fetchRes = await fetch(it.imageUrl);
                  if(fetchRes.ok){
                    const arrayBuffer = await fetchRes.arrayBuffer();
                    const buffer = Buffer.from(arrayBuffer);
                    filename = path.basename(new URL(it.imageUrl).pathname) || 'image.png'
                    filename = `${Date.now()}-${filename}`
                    const uploadPath = path.join(process.cwd(),'uploads',filename)
                    fs.writeFileSync(uploadPath,buffer)
                    // resize if sharp available
                    let sharp = null
                    try{ sharp = (await import('sharp')).default }catch(e){ sharp = null }
                    if(sharp){ try{ await sharp(uploadPath).resize(600,600,{fit:'cover'}).toFile(uploadPath+".tmp"); fs.renameSync(uploadPath+".tmp",uploadPath) }catch(e){console.log('sharp failed',e)} }
                  }else{
                    throw new Error('fetch failed')
                  }
                }catch(fetchErr){
                  // Fallback: if the image is available in the repo under frontend assets, copy it to uploads
                  try{
                    const fallbackName = path.basename(new URL(it.imageUrl).pathname)
                    const localAssetPath = path.join(process.cwd(),'frontend','src','assets','assets','frontend_assets', fallbackName)
                    if(fs.existsSync(localAssetPath)){
                      const filename2 = `${Date.now()}-${fallbackName}`
                      const uploadPath2 = path.join(process.cwd(),'uploads',filename2)
                      fs.copyFileSync(localAssetPath, uploadPath2)
                      filename = filename2
                    }else{
                      console.log('failed to fetch and no local fallback for', it.imageUrl)
                    }
                  }catch(e){
                    console.log('fallback failed for', it.imageUrl, e)
                  }
                }
                if(!filename){ results.failed++; continue }
                const newFood = new foodmodel({ name:it.name, description:it.description||'', price:it.price||0, category:it.category||'Misc', image:filename, isAsset:true })
                await newFood.save()
                results.added++
            }catch(e){ console.log('failed item',it.name,e); results.failed++ }
        }
        res.json({success:true, message:'sync complete', results})
    }
    catch(error){
        console.log(error)
        res.status(500).json({success:false,message:'Error'})
    }
}

const removefood=async(req,res)=>{
    try{
        const food=await foodmodel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{})
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"food removed"})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

export {addfood,addfoodFromUrl,syncAssets,listfood,removefood}
