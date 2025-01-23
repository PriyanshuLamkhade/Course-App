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
    creatorId: { type: ObjectId, ref: 'admins' }

})
const purchasesSchema = new Schema({
    courseId: { type: ObjectId, ref: 'courses' },
    userId: { type: ObjectId, ref: 'users' }
})

const userModel = mongoose.model("users", userSchema)
const adminModel = mongoose.model("admins", adminSchema)
const courseModel = mongoose.model("courses", courseSchema)
const purchasesModel = mongoose.model("purchases", purchasesSchema)


module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchasesModel
}