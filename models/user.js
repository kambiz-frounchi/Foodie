const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    nickName: {
        type: String
    }
});

const User = model("User", userSchema);

module.exports = {userSchema, User};