const Product =require("../models/product");
const router =require("express").Router();
const {verifyTokenAndAdmin} =require("./verifyToken");

//Create Product
router.post("/product",verifyTokenAndAdmin,async(req,res)=>{
    const newproduct = new Product(req.body);
    try{
        const savedProduct =await newproduct.save();
        res.status(201).json(savedProduct);
        }catch(err){
            res.status(500).json(err)
        }
});

//UPDATE product
router.put("/product/:id",verifyTokenAndAdmin,async(req,res)=>{
    
    try {
        const updatedProduct =await Product.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },{new:true})
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Delete  Product

router.delete("/product/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
           await Product.findByIdAndDelete(req.params.id)
           res.status(200).json("Product has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});


// GET ALL Product
router.get("/product/find",async(req,res)=>{
    try{
         const product =  await Product.find()
           res.status(200).json(product);
    }catch(err){
        res.status(500).json(err)
    }
});







module.exports= router;