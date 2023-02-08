const mongoose = require("mongoose");
const loginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Must include valid name"],
    },
    password: {
        type: String,
        required: [true, "Must included valid username and password"],
    },
});
const LoginModel = mongoose.model("LoginModel", loginSchema);
module.exports = LoginModel;