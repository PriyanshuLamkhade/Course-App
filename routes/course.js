const { Router } = require("express")
const { userMiddleware } = require("../middlewares/user")
const { purchasesModel, courseModel } = require("../db")
const courseRouter = Router()

courseRouter.post("/purchases",userMiddleware, async function (req, res){
    const userId = req.userId
    const courseId = req.body.courseId
    const courseTaken = await purchasesModel.create({
        courseId : courseId,
        userId : userId
    })
    res.json({
        message:"Purchased a course"
    })
    
   
})

courseRouter.get("/preview", async function (req, res) {
    const courses= await courseModel.find({}).populate('creatorId',"-password -email")

    res.json({
        courses : courses
    })
})






module.exports = {
    courseRouter: courseRouter
}