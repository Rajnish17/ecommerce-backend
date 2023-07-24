const express =require("express");
const app =express();
const authroute =require("./route/auth")
const crudroute =require("./route/user")
const productroute =require("./route/product")
const orderroute =require("./route/order")
const cartroute =require("./route/cart")
app.use(express.json());


app.use("/user",authroute)
app.use("/user",crudroute)
app.use("/user",productroute)
app.use("/user",cartroute)
app.use("/user",orderroute)



module.exports =app;