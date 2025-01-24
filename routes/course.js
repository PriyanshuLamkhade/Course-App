const { Router } = require("express")
const { userMiddleware } = require("../middlewares/user")
const { purchasesModel, courseModel } = require("../db")
const courseRouter = Router()

courseRouter.post("/purchases",userMiddleware, async function (req, res){
    const userId = req.userId
    const courseId = req.body.courseId
    const courseTaken = purchasesModel.findOne({
        courseId,
        userId
    })
    if(!courseTaken){
    await purchasesModel.create({
        courseId : courseId,
        userId : userId
    })
    res.json({
        message:"Purchased a course"
    })
    }else{
        res.json({
            message : "Course is already bought"
        })
    }
   
})

courseRouter.get("/preview", async function (req, res) {
    const courses= await courseModel.find({}).populate('creatorId')

    res.json({
        courses : courses
    })
})

module.exports = {
    courseRouter: courseRouter
}