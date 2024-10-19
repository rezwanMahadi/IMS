const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    name: String,
    email: String,
    finger_tag: Number,
    role: String,
    pass: String,
});

module.exports = mongoose.models.users || mongoose.model("users", usersSchema);