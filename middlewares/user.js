const jwt = require("jsonwebtoken")
require('dotenv').config()
const JWT_USER_PASSWORD = process.env.JWT_USER_PASSWORD


function userMiddleware(req,res,next) {
    const token = req.headers.token;
    const decodedData = jwt.verify(token,JWT_USER_PASSWORD)
    if(decodedData){
        res.userId = decodedData.id
        next()
    }else{
        res.status(403).json({
            message : "You are not signed in"
        })
    }

}

module.exports = {
    userMiddleware: userMiddleware
}           