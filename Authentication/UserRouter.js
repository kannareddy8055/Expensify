const UserModel = require("./UserModel");
const jwt = require("jsonwebtoken");
const promisify = require("util").promisify;
const promisifiedJwtSign = promisify(jwt.sign);
const promisifiedJwtVerify = promisify(jwt.verify);
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;
console.log(JWT_SECRET)
// Middleware to validate signup inputs
const verifyingSignUpInputs = (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;
    console.log("Verifying signup inputs...", req.body);

    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({
            status: "fail",
            message: "All fields are required"
        });
    }

    if (password !== confirmPassword) {
        return res.status(400).json({
            status: "fail",
            message: "Passwords do not match"
        });
    }

    next();
};

// Handler to create a user
const createUserHandler = async (req, res) => {
    console.log("Creating user...");
    try {
        const { name, email, password, confirmPassword } = req.body;
        console.log("User details:", { name, email, password, confirmPassword });
        const user = await UserModel.create({ name, email, password, confirmPassword });
        console.log("User created:", user);
        res.status(201).json({
            status: "success",
            message: "User created successfully",
            user
        });
    } catch (error) {
        console.error("Error creating user:", error);
        let message = "Internal server error";
        if (error.code === 11000) {
            message = `Duplicate value for field: ${Object.keys(error.keyPattern).join(", ")}`;
        }
        res.status(500).json({
            status: "error",
            message,
            error: error.message
        });
    }
};

const verifyingLoginInputs = (req, res, next) => {
    const { email, password } = req.body;
    console.log("Verifying login inputs...", req.body);

    if ( !email || !password ) {
        return res.status(400).json({
            status: "fail",
            message: "All fields are required"
        });
    } 

    next();
};

const verifyLoginDetails = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login details:", { email, password });
        const User = await UserModel.findOne({ email, password });
        if(!User){
            res.status(404).json({
                status: "login failed",
                message: "Invalid email or password"
            })
        } else {
            const jwtToken = jwt.sign({ id: User.id }, JWT_SECRET, { expiresIn: "4h" });
            res.cookie("jwt", jwtToken, {
            httpOnly: true,
            secure: false, // set to true in production (HTTPS)
            sameSite: "lax"
        });
            res.status(200).json({
                status: "success",
                message: "Login successful",
                User,
                jwtToken,
            })
        }
    } catch (err) {
        console.log("Error during login:", err);
        res.status(404).json({
            status: "Error",
            message: err.message
        })
        
    }
}

module.exports = { verifyingSignUpInputs, createUserHandler, verifyLoginDetails, verifyingLoginInputs };