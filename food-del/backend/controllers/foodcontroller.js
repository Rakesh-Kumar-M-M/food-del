import foodmodel from "../models/foodmodel.js";
import { defaultFoods } from "../config/defaultFoods.js";
import fs from 'fs'
import path from 'path'

const addfood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const filepath = path.resolve("..", "uploads", image_filename)
    // attempt to resize using sharp if available
    let sharp = null
    try {
        sharp = (await import('sharp')).default
    } catch (e) {
        sharp = null
    }
    if (sharp) {
        try {
            await sharp(filepath).resize(600, 600, { fit: 'cover' }).toFile(filepath + ".tmp")
            fs.renameSync(filepath + ".tmp", filepath)
        } catch (e) {
            console.log('sharp resize failed', e)
        }
    }
    const food = new foodmodel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await food.save();
        res.json({ success: true, message: "food added" })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const addfoodFromUrl = async (req, res) => {
    // Expects JSON: { name, description, price, category, imageUrl }
    const { name, description, price, category, imageUrl } = req.body;
    try {
        if (!name || !imageUrl) {
            return res.status(400).json({ success: false, message: 'name and imageUrl required' })
        }
        // avoid duplicates by name
        const exists = await foodmodel.findOne({ name });
        if (exists) {
            return res.json({ success: false, message: 'Item already exists' })
        }
        const fetchRes = await fetch(imageUrl);
        if (!fetchRes.ok) {
            return res.status(400).json({ success: false, message: 'Unable to fetch image' })
        }
        const arrayBuffer = await fetchRes.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        // derive filename
        let filename = path.basename(new URL(imageUrl).pathname) || 'image.png'
        filename = `${Date.now()}-${filename}`
        const uploadPath = path.resolve("..", "uploads", filename)
        fs.writeFileSync(uploadPath, buffer)
        // attempt to resize using sharp if available
        let sharp = null
        try {
            sharp = (await import('sharp')).default
        } catch (e) {
            sharp = null
        }
        if (sharp) {
            try {
                await sharp(uploadPath).resize(600, 600, { fit: 'cover' }).toFile(uploadPath + ".tmp")
                fs.renameSync(uploadPath + ".tmp", uploadPath)
            } catch (e) {
                console.log('sharp resize failed', e)
            }
        }
        const newFood = new foodmodel({
            name,
            description: description || '',
            price: price || 0,
            category: category || 'Misc',
            image: filename,
            isAsset: true
        })
        await newFood.save()
        res.json({ success: true, message: 'food added from url' })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error' })
    }
}

const listfood = async (req, res) => {
    try {
        const foods = await foodmodel.find({})
        res.json({ success: true, data: foods })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

const syncAssets = async (req, res) => {
    // Expects req.body.items = [{name,description,price,category,imageUrl},...]
    const items = req.body.items || []
    if (!Array.isArray(items)) return res.status(400).json({ success: false, message: 'items array required' })
    try {
        const names = items.map(i => i.name)
        // Remove existing foods that match these asset names
        await foodmodel.deleteMany({ name: { $in: names } })
        // Add each item
        const results = { added: 0, failed: 0 }
        for (const it of items) {
            try {
                let buffer;
                let filename;
                // Prefer 'image' property, fallback to 'imageUrl'
                const imageSource = it.image || it.imageUrl;

                if (imageSource && (imageSource.startsWith('http') || imageSource.startsWith('https'))) {
                    const fetchRes = await fetch(imageSource);
                    if (!fetchRes.ok) { results.failed++; continue }
                    const arrayBuffer = await fetchRes.arrayBuffer();
                    buffer = Buffer.from(arrayBuffer);
                    filename = path.basename(new URL(imageSource).pathname) || 'image.png'
                    filename = `${Date.now()}-${filename}`
                } else {
                    // content is likely a filename like "food_1.png"
                    // Path: ../frontend/src/assets/assets/frontend_assets/
                    const sourcePath = path.resolve("..", "frontend", "src", "assets", "assets", "frontend_assets", imageSource)
                    if (fs.existsSync(sourcePath)) {
                        buffer = fs.readFileSync(sourcePath)
                        // keep original filename if possible, otherwise prefix timestamp
                        filename = `${Date.now()}-${imageSource}`
                    } else {
                        // try generic assets folder
                        const sourcePath2 = path.resolve("..", "frontend", "src", "assets", imageSource)
                        if (fs.existsSync(sourcePath2)) {
                            buffer = fs.readFileSync(sourcePath2)
                            filename = `${Date.now()}-${imageSource}`
                        } else {
                            console.log('File not found:', sourcePath)
                            results.failed++; continue
                        }
                    }
                }

                const uploadPath = path.resolve("..", "uploads", filename)
                fs.writeFileSync(uploadPath, buffer)
                // resize if sharp available
                let sharp = null
                try { sharp = (await import('sharp')).default } catch (e) { sharp = null }
                if (sharp) { try { await sharp(uploadPath).resize(600, 600, { fit: 'cover' }).toFile(uploadPath + ".tmp"); fs.renameSync(uploadPath + ".tmp", uploadPath) } catch (e) { console.log('sharp failed', e) } }
                const newFood = new foodmodel({ name: it.name, description: it.description || '', price: it.price || 0, category: it.category || 'Misc', image: filename, isAsset: true })
                await newFood.save()
                results.added++
            } catch (e) { console.log('failed item', it.name, e); results.failed++ }
        }
        res.json({ success: true, message: 'sync complete', results })
    }
    catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: 'Error' })
    }
}

const removefood = async (req, res) => {
    try {
        const food = await foodmodel.findById(req.body.id);
        fs.unlink(path.resolve("..", "uploads", food.image), () => { })
        await foodmodel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "food removed" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "error" })
    }
}

const seedDatabase = async () => {
    try {
        console.log("Seeding database...");
        // Strictly clear database to ensure fresh state as requested
        await foodmodel.deleteMany({});
        console.log("Database cleared. Starting seed.");

        // Ensure uploads directory exists
        const uploadsDir = path.resolve("..", "uploads");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir);
        }

        for (const item of defaultFoods) {
            // Logic to find and copy image
            let filename = item.image;
            const sourcePath = path.resolve("..", "frontend", "src", "assets", "assets", "frontend_assets", filename);
            const targetPath = path.resolve("..", "uploads", filename);

            if (fs.existsSync(sourcePath)) {
                // Resize and copy
                let sharp = null;
                try { sharp = (await import('sharp')).default } catch (e) { sharp = null }

                if (sharp) {
                    try {
                        await sharp(sourcePath).resize(600, 600, { fit: 'cover' }).toFile(targetPath);
                    } catch (e) {
                        // console.log('Sharp resize failed, using direct copy', e);
                        fs.copyFileSync(sourcePath, targetPath);
                    }
                } else {
                    fs.copyFileSync(sourcePath, targetPath);
                }
            } else {
                console.log(`Source image not found for ${item.name}: ${sourcePath}`);
                // Proceed anyway, or maybe skip? Let's skip to avoid broken images.
                // continue; 
            }

            // Create DB Entry
            const newFood = new foodmodel({
                name: item.name,
                description: item.description,
                price: item.price,
                category: item.category,
                image: filename,
                isAsset: true
            });
            await newFood.save();
        }
        console.log("Database seeded successfully.");
    } catch (error) {
        console.error("Error seeding database:", error);
    }
};

export { addfood, addfoodFromUrl, syncAssets, listfood, removefood, seedDatabase }
