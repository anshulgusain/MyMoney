const express = require("express");
const cors=require("cors")


const {  userRouter } = require("./routes/user");
const { accountRouter}=require("./routes/account");
const { connection } = require("./connection/connect");




const app=express()
app.use(cors())
app.use(express.json())


app.use("/api/v1/user",userRouter)
app.use("/api/v1/account",accountRouter)

app.listen(8080,async()=>{
    try{
   await connection
  console.log("Connected to 8080")
    }catch(err){
        console.log(err)
    }
})