// pages/api/fetchData.js
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
const users = require("@/app/api/model/users")

async function connectToDatabase() {
    await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
}

export async function POST(request) {
    const data = await request.json();
    console.log(data);
    if (request.method == "POST") {
        try {
            connectToDatabase().then(() => console.log("db connected"));

            const found_user = await mongoose.models.users.findOne({ email: data.email });
            console.log('Query result:', found_user);

            if (found_user) {
                return NextResponse.json({ success: true, found_user });
            } else {
                return NextResponse.json({ success: false, msg: "user not found" });
            }
        } catch (error) {
            console.log(error);
            return NextResponse.json({ message: 'Internal Server Error', error });
        }
    }
    else{
        return NextResponse.json({ success: false, error: "Request type error." });
    }
}
