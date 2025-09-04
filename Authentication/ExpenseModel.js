// models/ExpenseModel.js
const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true } // link expense to user
}, { timestamps: true });

const ExpenseModel = mongoose.model("ExpenseModel", ExpenseSchema);

module.exports = ExpenseModel;
