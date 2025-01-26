const mongoose = require("mongoose")
const Schema = mongoose.Schema
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
})

const adminSchema = new Schema({
    email: { type: String, unique: true },
    password: String,
    firstName: String,
    lastName: String
})

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: { type: ObjectId, ref: 'admins',required: true }

})
const purchasesSchema = new Schema({
    courseId: { type: ObjectId, ref: 'courses',required: true },
    userId: { type: ObjectId, ref: 'users',required: true }
})

const contentSchema = new Schema({
    title : {type:String, required: true},
    description : {type:String},
    type: {type:String,required: true},  //video, pdf, link etc
    createdBy : {type:String, ref:"admins",required: true},
    visibleToUsers: { type: Boolean, default: true },
    url :{type:String},
    courseId : {type:String,ref:"courses",required: true},

})


const userModel = mongoose.model("users", userSchema)
const adminModel = mongoose.model("admins", adminSchema)
const courseModel = mongoose.model("courses", courseSchema)
const purchasesModel = mongoose.model("purchases", purchasesSchema)
const contentModel = mongoose.model("contents", contentSchema)

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchasesModel,
    contentModel
} 