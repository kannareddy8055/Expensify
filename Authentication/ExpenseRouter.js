const express = require("express");
const router = express.Router();
const ExpenseModel = require("./ExpenseModel.js");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;;

console.log(JWT_SECRET)
// Middleware: Verify JWT Token
const authenticate = (req, res, next) => {
    // Check Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ status: "fail", message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // extract token

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("JWT verify error:", err);
            return res.status(401).json({ status: "fail", message: "Unauthorized: Invalid token" });
        }
        req.userId = decoded.id;
        next();
    });
};


// GET /expenses – list all expenses for logged-in user
router.get("/", authenticate, async (req, res) => {
    try {
        const expenses = await ExpenseModel.find({ userId: req.userId });
        res.json(expenses);
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
});

// POST /expenses – add new expense
router.post("/", authenticate, async (req, res) => {
    try {
        const { amount, category, date, description } = req.body;
        const newExpense = await ExpenseModel.create({
            amount,
            category,
            date,
            description,
            userId: req.userId
        });
        res.status(201).json(newExpense);
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
});

// PUT /expenses/:id – update expense
router.put("/:id", authenticate, async (req, res) => {
    try {
        const updatedExpense = await ExpenseModel.findOneAndUpdate(
            { _id: req.params.id, userId: req.userId },
            req.body,
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ status: "fail", message: "Expense not found" });
        }
        res.json(updatedExpense);
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
});

// DELETE /expenses/:id – remove expense
router.delete("/:id", authenticate, async (req, res) => {
    try {
        const deleted = await ExpenseModel.findOneAndDelete({
            _id: req.params.id,
            userId: req.userId
        });
        if (!deleted) {
            return res.status(404).json({ status: "fail", message: "Expense not found" });
        }
        res.json({ status: "success", message: "Expense deleted" });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
});

module.exports = router;
