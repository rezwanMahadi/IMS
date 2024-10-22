import { NextResponse } from "next/server";
import mongoose from "mongoose";
const product = require("@/app/api/model/product");
const outproducts = require("@/app/api/model/outproducts");

async function connectToDatabase() {
    await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
}

export async function POST(request) {
    const receivedTag = await request.json();
    console.log(receivedTag);
    console.log(receivedTag.tag);
    if (request.method == "POST") {
        try {
            connectToDatabase().then(() => console.log("db connected"));
            const found_product = await mongoose.models.products.findOne({ "tag": receivedTag.tag });
            console.log(found_product);

            if (found_product != null && receivedTag.tag == found_product.tag) {
                const dlt = await mongoose.models.products.deleteOne({ tag: receivedTag.tag }).then(() => console.log("product deleted"));
                const outproduct = new outproducts(
                    {
                        tag: found_product.tag,
                        productName: found_product.productName,
                        quantity: found_product.quantity,
                        category: found_product.category
                    });
                outproduct.save().then(() => console.log("out product saved"))
                return NextResponse.json({ "success": true});
            }
            else {
                return NextResponse.json({ "success": false, "message": "delete failed" });
            }
        }
        catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'Internal Server Error', error });
        }
    }
    else {
        return NextResponse.json({ "success": false, "error": "Request type error." });
    }
}