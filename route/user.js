const router =require("express").Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} =require("./verifyToken");
const User =require("../models/user");
//UPDATE
router.put("/:id",verifyTokenAndAuthorization,async(req,res)=>{
            if(req.body.password){
               req.body.password =CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString();
            }

            try {
                const updatedUser =await User.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{new:true})
                res.status(200).json(updatedUser);
            } catch (error) {
                res.status(500).json(error)
            }
});

//Delete 

router.delete("/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
           await User.findByIdAndDelete(req.params.id)
           res.status(200).json("user has been deleted")
    }catch(err){
        res.status(500).json(err)
    }
});

//GET USER  ONLY ADMIN 

router.get("/find/:id",verifyTokenAndAdmin,async(req,res)=>{
    try{
         const user =  await User.findById(req.params.id)
           res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
});

// GET ALL USER
router.get("/find",verifyTokenAndAdmin,async(req,res)=>{
    try{
         const user =  await User.find()
           res.status(200).json(user);
    }catch(err){
        res.status(500).json(err)
    }
});




module.exports= router;