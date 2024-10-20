// pages/api/products.js
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const product = require("@/app/api/model/product")

async function connectToDatabase() {
    await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
}

export async function GET(request) {
    connectToDatabase().then(() => console.log("db connected"));

    if (request.method === 'GET') {
        try {
            const allProducts = await mongoose.models.products.find();
            console.log("from server side:", allProducts);
            // const data = JSON.stringify(allProducts);
            return NextResponse.json({ success: true, allProducts });
        }
        catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'Internal Server Error', error });
        }
    }
    else {
        return NextResponse.json({ error: 'unsupported method' });
    }
}
