const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {type: String, unique: true},
    password: String,
},{collection: 'UserInfo'
});
mongoose.model("UserInfo",UserSchema)