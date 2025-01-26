const { Router } = require("express")
const { contentModel, courseModel, purchasesModel } = require("../db")
const { adminMiddleware } = require("../middlewares/admin")
const { userMiddleware } = require("../middlewares/user")
const contentRouter = Router()


contentRouter.post("/view", userMiddleware, async function (req, res) {
    const userId = req.userId
    const courseId = req.body.courseId
    try {
        const isPurchases = await purchasesModel.findOne({
            userId: userId,
            courseId: courseId
        })

        if (isPurchases) {
            const contents = await contentModel.find({
                courseId: courseId
            })
            res.json({
                contents: contents
            })
        } else {
            res.status(403).json({ message: "Course Not purchased" })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json({ message: "Internal Server Error" }) 
    }

})

contentRouter.post("/add", adminMiddleware, async function (req, res) {
    const adminId = req.adminId
    const { title, description, type, createdBy, visibleToUsers, courseId, url } = req.body

    if (!title || !courseId || !type) {
        return res.status(400).json({ message: "Missing required fields: title, type, or courseId." });
    }

    try {
        const checkCourse = await courseModel.findOne({
            _id: courseId
        })

        if (!checkCourse) {
            res.json({
                message: "Incorrect Course Id"
            })
            return
        }
        await contentModel.create({
            title: title,
            description: description,
            type: type,
            createdBy: adminId,
            visibleToUsers: visibleToUsers,
            url: url,
            courseId: courseId,
        })
        res.json({
            message: "Content is added "
        })
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: "An error occurred while adding the content." });
    }

})

module.exports = {
    contentRouter
}   