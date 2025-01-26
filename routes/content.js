const {Router} = require("express")
const {contentModel} = require ("../db")
const { adminMiddleware } = require("../middlewares/admin")
const { userMiddleware } = require("../middlewares/user")
const contentRouter = Router()


contentRouter.get("/view",userMiddleware, async function(req,res){
    const userId = req.userId
    const {title,description,type,createdBy,visibleToUsers,courseId,url} = req.body
}) 
contentRouter.post("/add",adminMiddleware,async function(req,res){
    const adminId = req.adminId
    const {title,description,type,createdBy,visibleToUsers,courseId,url} = req.body
    
})

module.exports={
    contentRouter
}