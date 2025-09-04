const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser())
const { DB_USER, DB_PASSWORD } = process.env;
const {verifyingSignUpInputs, createUserHandler, verifyingLoginInputs, verifyLoginDetails} = require("./UserRouter")
const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.gkooz8p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const cors = require("cors");
app.use(cors({ origin: "http://localhost:5173" ,credentials: true }));

mongoose.connect(dbUrl).then(() => {
    console.log("Database connected successfully")
}).catch((error) => {
    console.error("Database connection failed:", error)
})

app.post("/signup", verifyingSignUpInputs, createUserHandler);
app.post("/login", verifyingLoginInputs, verifyLoginDetails);

const ExpenseRouter = require("./ExpenseRouter");
app.use("/expense", ExpenseRouter);

app.use(function(req, res) {
    res.status(404).json({
        status: "fail",
        message: "404 page not found"
    })
})
const PORT = process.env.PORT || 5000

app.listen(PORT, function () {
    console.log(`Server is running on ${PORT} port`)
})