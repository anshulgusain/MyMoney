const express=require("express")
const { UserModel } = require("../models/UserModel")
const { JWT_SECRET } = require("../config")
const jwt =require ("jsonwebtoken")
const zod=require("zod")
const { authMiddleware } = require("../middleware")
const { AccountModel } = require("../models/AccountModel")
const { default: mongoose } = require("mongoose")



const userRouter=express.Router()

const signupSchema=zod.object({
    email:zod.string().email(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

const signinSchema = zod.object({
    email: zod.string().email(),
	password: zod.string()
})




userRouter.post("/signup",async (req,res)=>{
 
    const body=req.body
    // console.log(req.body)
    const parsed=signupSchema.safeParse(req.body)
    if(!parsed.success){
        return res.json({
            message:"Email already taken/Incorrect inputs",
            errors: parsed.error.errors,
        })
    }

    
 


    const user= UserModel.findOne({
        email:body.email
    })
    // console.log(user)
    if(user._id){
        res.json({
            message:"Email already taken/Incorrect inputs"
            
        })
    }

   
    const dbUser=await UserModel.create(body)
    const userId=dbUser._id
    const email=dbUser.email


// Creating Dummy account balance for User------>>>>>>>>>

await AccountModel.create({
    email,
    userId,
    balance: 1 + Math.random() *10000
})


    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)

    res.json({
        message:"User created successfully",
        token:token
    })
})



// Signin Route---->>>>>>>>>

userRouter.post("/signin",async(req,res)=>{
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect email/input"
        })
    }

    const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password
    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);
  
        res.json({
            token: token
        })
        return;
    }

    
    res.status(411).json({
        message: "Error while logging in"
    })
})

// Update endpoint --->>>>>>>>
const updateSchema=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})



userRouter.put("/",authMiddleware,async(req,res)=>{
    const {success}=updateSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error while updating user"
        })
    }

    await UserModel.updateOne({_id:req.userId},req.body)

    res.json({
        message: "Updated successfully"
    })

})

// Search Endpoint --->

userRouter.get("/bulk",async (req, res) => {
    const filter = req.query.filter || "";

    const users = await UserModel.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports={
    userRouter
}