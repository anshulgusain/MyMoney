const express=require("express")
const { UserModel } = require("../models/UserModel")
const { JWT_SECRET } = require("../config")
const jwt =require ("jsonwebtoken")
const zod=require("zod")
const { authMiddleware } = require("../middleware")


const router=express.Router()

const signupSchema=zod.object({
    username:zod.string().email,
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
})

const signinSchema = zod.object({
    username: zod.string().email(),
	password: zod.string()
})




router.post("/signup",async (req,res)=>{
    const body=req.body
    const {success}=signupSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message:"Email already taken/Incorrect inputs"
        })
    }
    const user= UserModel.findOne({
        username:body.username
    })
    if(user._id){
        res.json({
            message:"Email already taken/Incorrect inputs"
            
        })
    }

    const dbUser=await UserModel.create(body)
    const token=jwt.sign({
        userId:dbUser._id
    },JWT_SECRET)

    res.json({
        message:"User created successfully",
        token:token
    })
})



// Signin Route---->>>>>>>>>

router.post("signin",async(req,res)=>{
    const { success } = signinSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Incorrect email/input"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
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



router.put("/",authMiddleware,async(req,res)=>{
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

router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
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
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

module.exports={
    router
}