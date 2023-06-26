const router =require("express").Router();
const Order =require("../models/order");
const {verifyTokenAndAuthorization,verifyTokenAndAdmin} =require("./verifyToken");

//Create Order
router.post("/order",verifyTokenAndAuthorization,async(req,res)=>{
    const newOrder =new Order(req.body);
try{
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);

}catch(err){
    res.status(500).json(err)
}

});

//Delete Order
router.delete("/order/delete/:id",verifyTokenAndAdmin,async(req,res)=>{
try{
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Item has been deleted")

}catch(err){
    res.status(500).json(err)
}

});

//Get all Order
router.get("/order/all",verifyTokenAndAdmin,async(req,res)=>{
    try{
       const OrderItem =await Order.find();
        res.status(200).json(OrderItem)
    
    }catch(err){
        res.status(500).json(err)
    }
    
    });

   



module.exports= router;
