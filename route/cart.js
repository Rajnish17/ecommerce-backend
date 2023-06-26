const router =require("express").Router();
const Cart =require("../models/cart");
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} =require("./verifyToken");

//Create cart
router.post("/cart",verifyTokenAndAuthorization,async(req,res)=>{
    const cartItem =new Cart(req.body);
try{
    const savedCartItem = await cartItem.save();
    res.status(200).json(savedCartItem);

}catch(err){
    res.status(500).json(err)
}

});

//Delete cart
router.delete("/cart/delete",verifyTokenAndAuthorization,async(req,res)=>{
try{
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("cart Item has been deleted")

}catch(err){
    res.status(500).json(err)
}

});

//Get User Cart Item
router.get("/cart/:id",verifyTokenAndAuthorization,async(req,res)=>{
    try{
       const cartItem =await Cart.findOne({id:req.params.id});
        res.status(200).json(cartItem)
    
    }catch(err){
        res.status(500).json(err)
    }
    
    });

    //get all cart item admin

    router.get("/",verifyTokenAndAdmin,async(req,res)=>{
        try {
            const allcart =await Cart.find();
            res.status(200).json(allcart);
        } catch (error) {
            res.status(500).json(error);
        }
    });





module.exports= router;
