const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// ✅ EXPORT MODEL (NOT SCHEMA)
module.exports = mongoose.model("User", UserSchema);