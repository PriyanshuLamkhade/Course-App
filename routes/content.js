const {Router} = require("express")

const contentRouter = Router()


contentRouter.post("/content",adminMiddleware, async function(req,res){


})