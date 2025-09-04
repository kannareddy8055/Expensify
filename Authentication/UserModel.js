const mongoose = require("mongoose");
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        maxLength:100,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 50,
        trim: true
    },
    confirmPassword: {
        type: String,
        required:true,
        validate: {
            validator: function() {
                return this.password === this.confirmPassword;
            },
            message: "Password and confirm password do not match"
        },
        trim: true
    }
})

const UserModel = mongoose.model("UserModel", UserSchema);

module.exports = UserModel;