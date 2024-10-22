const mongoose = require("mongoose");

const outproductSchema = new mongoose.Schema({
    tag: String,
    productName: String,
    quantity: Number,
    category: String,
});

module.exports = mongoose.models.outproducts || mongoose.model("outproducts", outproductSchema);