const express=require("express")
const { authMiddleware } = require("../middleware")
const { AccountModel } = require("../models/AccountModel")
const { mongoose } = require("mongoose")
const { UserModel } = require("../models/UserModel")
const { TransactionModel } = require("../models/TransactionModel")

const accountRouter=express.Router()


// Balance

accountRouter.get("/balance",authMiddleware,async(req,res)=>{
const account=await AccountModel.findOne({
    userId:req.userId
})
res.status(200).json({
    message:account.balance
})
})


// Account Details



accountRouter.get("/accountDetails",authMiddleware,async(req,res)=>{
const account=await AccountModel.findOne({
    userId:req.userId
})
const user=await UserModel.findOne({
    _id:req.userId
})
res.status(200).json({
    account,
    user
})
})


// Transaction History

accountRouter.get("/transactions",authMiddleware,async(req,res)=>{
    try{
    const transactions=await TransactionModel.find({
        userId:req.userId
    }).sort({date:-1}).limit(10)

    res.status(200).json({
        transactions
    })
}catch(err){
    console.log(err)
    res.status(500).json({
        message:"Internal Server Error"
    })  
}
}
)   





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
if(!toAccount){
    await session.abortTransaction()

    return res.status(400).json({
    message:"Invalid Receiver Account"
    })
}
await AccountModel.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
await AccountModel.updateOne({email:to},{$inc:{balance:amount}}).session(session)
await TransactionModel.create([{
    userId:req.userId,
    amount:amount,
    toAccount:to
}],{session}
)
await session.commitTransaction();
res.json({
    message: "Transfer successful"
});
})



// Api to get all users end here
module.exports={
    accountRouter
}
  
