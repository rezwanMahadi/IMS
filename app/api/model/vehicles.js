const mongoose = require("mongoose");

const vehiclesSchema = new mongoose.Schema({
    reg_number: String,
    chassis_number: String,
    lat: String,
    long: String,
});

module.exports = mongoose.models.vehicles || mongoose.model("vehicles", vehiclesSchema);