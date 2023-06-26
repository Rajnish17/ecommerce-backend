require('dotenv').config();
const express =require("express");
const app =express();
const port =process.env.PORT || 8090
const mongoose =require("mongoose");
const authroute =require("./route/auth")
const crudroute =require("./route/user")
const productroute =require("./route/product")
const orderroute =require("./route/order")
const cartroute =require("./route/cart")


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`mongodb connected`)
}).catch((err)=>{
    console.log(err)
})
app.use(express.json());

app.use("/user",authroute)
app.use("/user",crudroute)
app.use("/user",productroute)
app.use("/user",cartroute)
app.use("/user",orderroute)

app.listen(port,()=>{
   console.log(`server running at ${port}`) 
})