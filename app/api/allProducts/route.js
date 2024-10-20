// pages/api/products.js
import mongoose from "mongoose";
import { NextResponse } from "next/server";
const product = require("@/app/api/model/product")

async function connectToDatabase() {
    await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
}

export async function POST(request) {
    connectToDatabase().then(() => console.log("db connected"));

    if (request.method === 'POST') {
        try {
            const allProducts = await mongoose.models.products.find();
            console.log("from server side:", "product fetch success");
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
