require("dotenv").config();
const router =require("express").Router();
const User =require("../models/user");
const CryptoJS =require("crypto-js");
const jwt =require("jsonwebtoken")

//register
router.post("/register",async(req,res)=>{
    const newUser =new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password,process.env.SECRET).toString()
        
    });

    try{
    const savedUser =await newUser.save();
    // console.log(savedUser);
    res.status(201).json(savedUser);
    }catch(err){
        //   console.log(err)
        res.status(500).json(err)
    }
});

//LOGIN

router.post("/login",async(req,res)=>{
     try {
         const user = await User.findOne({username:req.body.username})
         //CHECK USER HERE 
       if(!user){
         res.status(401).json("Wrong credentials");
       }else{
        const hashedPassword =CryptoJS.AES.decrypt(user.password,process.env.SECRET);
       
        const originalpassword =hashedPassword.toString(CryptoJS.enc.Utf8);
        
        originalpassword !== req.body.password && res.status(401).json("Wrong credentials");
        

        const accessToken =jwt.sign({
            id:user._id,
            isAdmin:user.isAdmin
        },process.env.JWT_SECRET,
        {expiresIn:"4d"}
        );

        const {password,...others} =user._doc;

        res.status(200).json({...others,accessToken});
       }
       
     } catch (error) {
        res.status(500).send(error)
     }
});



module.exports= router;