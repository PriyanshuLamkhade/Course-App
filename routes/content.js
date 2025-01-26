const { Router } = require("express")
const { contentModel, courseModel } = require("../db")
const { adminMiddleware } = require("../middlewares/admin")
const { userMiddleware } = require("../middlewares/user")
const contentRouter = Router()


contentRouter.get("/view", userMiddleware, async function (req, res) {
    const userId = req.userId
    const { title, description, type, createdBy, visibleToUsers, courseId, url } = req.body
})
contentRouter.post("/add", adminMiddleware, async function (req, res) {
    const adminId = req.adminId
    const { title, description, type, createdBy, visibleToUsers, courseId, url } = req.body
    try {
        const checkCourse = await courseModel.findOne({
            courseId: courseId
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
        console.log(e)
    }

})

module.exports = {
    contentRouter
}