const { Router } = require("express")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const { requiredBody } = require("../zodBody")
const { adminModel, courseModel } = require("../db")
const { adminMiddleware } = require("../middlewares/admin")

const adminRouter = Router();
const z = require("zod")
const admin = require("../middlewares/admin")





const JWT_ADMIN_PASSWORD = process.env.JWT_ADMIN_PASSWORD

adminRouter.post("/signup", async function (req, res) {
    const { firstName, lastName, email, password } = req.body;

    const parsedData = requiredBody.safeParse(req.body)

    if (!parsedData.success) {
        res.json({
            message: "Incorrect Format",
            error: parsedData.error
        })
        return
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 5)
        await adminModel.create({
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName
        })
        res.json({
            message: "Account Created"
        })
    } catch (e) {
        res.json({
            message: "Already Exists"
        })

    }
})
adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body

    const admin = await adminModel.findOne({
        email: email,

    })
    if (!admin) {
        res.json({
            message: "User doesnot exists"
        })
        return
    }
    const comparedPassword = await bcrypt.compare(password, admin.password)
    if (comparedPassword) {
        const token = jwt.sign({
            id: admin._id
        }, JWT_ADMIN_PASSWORD);

        //cookie logic
        res.json({
            token: token
        })
    } else {
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }

})
adminRouter.post("/course", adminMiddleware, async function (req, res) {
    const adminId = res.adminId
    const { title, description, price, imageUrl } = req.body;

    const course = await courseModel.create({
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })
    res.json({
        message: "Course Created",
        CourseId: course._id
    })
})
adminRouter.put("/course", adminMiddleware, async function (req, res) {
    const adminId = res.adminId
    const { title, description, price, imageUrl, CourseId } = req.body;

    /* const course =*/ await courseModel.updateOne({
        _id: CourseId,
        creatorId: adminId
    }, {
        title: title,
        description: description,
        price: price,
        imageUrl: imageUrl,
        creatorId: adminId
    })
    res.json({
        "message":"Course Updated"
    })
})
adminRouter.get("/course/bulk", adminMiddleware, async function (req, res) {
    const adminId = res.adminId


    const courses = await courseModel.find({
        creatorId: adminId
    })
    res.json({
        message: "All the courses",
        CourseID: courses
    })
})

module.exports = {
    adminRouter: adminRouter
}
