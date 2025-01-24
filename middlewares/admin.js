const jwt = require("jsonwebtoken")
require('dotenv').config()
const JWT_admin_PASSWORD = process.env.JWT_admin_PASSWORD


function adminMiddleware(req,res,next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_admin_PASSWORD)
    if(decodedData){
        req.adminId = decodedData.id
        next()
    }else{
        res.status(403).json({
            message : "You are not signed in"
        })
    }

}

module.exports = {
    adminMiddleware: adminMiddleware
}           