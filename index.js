require('dotenv').config();
const app =require("./app");
const port =process.env.PORT || 8090
const mongoose =require("mongoose");



mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log(`mongodb connected`)
}).catch((err)=>{
    console.log(err)
})




app.listen(port,()=>{
   console.log(`server running at ${port}`) 
})