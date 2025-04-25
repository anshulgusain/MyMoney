const express=require("express")
const { authMiddleware } = require("../middleware")
const { AccountModel } = require("../models/AccountModel")
const { mongoose } = require("mongoose")

const accountRouter=express.Router()

accountRouter.get("/balance",authMiddleware,async(req,res)=>{

    // console.log(req.userId)
const account=await AccountModel.findOne({
    userId:req.userId
})

// console.log(account)

res.status(200).json({
    message:account.balance
})
})

accountRouter.post("/transfer",authMiddleware,async(req,res)=>{
const session=await mongoose.startSession()

session.startTransaction()

const {amount,to}=req.body

const account=await AccountModel.findOne({userId:req.userId}).session(session)

if(!account ||account.balance<amount){
    await session.abortTransaction()
    return  res.status(400).json({
        message:"Insufficient Balance"
    })   
}

const toAccount=await AccountModel.findOne({email:to}).session(session)
console.log(toAccount)

if(!toAccount){
    await session.abortTransaction()

    return res.status(400).json({
    message:"Invalid Receiver Account"
    })
}

await AccountModel.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
await AccountModel.updateOne({email:to},{$inc:{balance:amount}}).session(session)


await session.commitTransaction();
res.json({
    message: "Transfer successful"
});



})

module.exports={
    accountRouter
}
  
