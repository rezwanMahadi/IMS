const mongoose = require("mongoose");

const temp_tagsSchema = new mongoose.Schema({
    type: String,
    tag: String
});

module.exports = mongoose.models.temp_tags || mongoose.model("temp_tags", temp_tagsSchema);