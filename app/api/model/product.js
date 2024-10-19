const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    tag: String,
    productName: String,
    quantity: Number,
    category: String,
});

module.exports = mongoose.models.products || mongoose.model("products", productSchema);