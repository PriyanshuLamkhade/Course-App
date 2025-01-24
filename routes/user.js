const { Router } = require("express")
const { userModel, purchasesModel, courseModel } = require("../db")
const jwt = require("jsonwebtoken")
const {requiredBody} = require("../zodBody")
const bcrypt = require("bcrypt")
const {userMiddleware} = require("../middlewares/user")

const userRouter = Router();


const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD

userRouter.post("/signup", async function(req, res) {
    const { firstName, lastName, email, password } = req.body;

    const parsedData = requiredBody.safeParse(req.body)

    if (!parsedData.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedData.error
        })
        return
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 5)
        await userModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "Account Created"
        })
    } catch (e) {
        res.json({
            message: "Already Exists"
        })

    }
})
userRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body

    const user = await userModel.findOne({
        email: email,

    })
    if (!user) {
        res.json({
            message: "User doesnot exists"
        })
        return
    }
    const comparedPassword = await bcrypt.compare(password, user.password)
    if (comparedPassword) {
        const token = jwt.sign({
            id: user._id
        }, JWT_USER_PASSWORD);

        //cookie logic
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

})

userRouter.get("/purchases", userMiddleware, async function(req, res){
    const userId = req.userId

    const purchases = await purchasesModel.find({
        userId
    }).populate({
        path:"courseId",
        populate:{
            path: "creatorId",
            select : "firstname lastname"
        }
    })
    res.json({
        purchases : purchases
    })

    
})

module.exports = {
    userRouter: userRouter
}