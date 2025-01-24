const express = require("express");
const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
require('dotenv').config()
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");
const app = express();
const port = 3000;

app.use(express.json())
app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)
                        
async function main() {
    try {
        
        
        await mongoose.connect(process.env.MONGO_DB_URL)
        app.listen(port, () => {
            console.log(`Listening on port ${port}`)
        });
    } catch (e) {
        console.error("Error connectiong MongoDB", e)
    }
}

main();