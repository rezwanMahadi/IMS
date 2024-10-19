// pages/api/fetchData.js
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
const searchTag = require("@/app/api/model/searchTag")

async function connectToDatabase() {
    await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
  }

export async function POST(request) {
    try {
        connectToDatabase().then(() => console.log("db connected"));

        const found_tag = await mongoose.models.temp_tags.findOne({ type: "tempTag" });
        console.log('Query result:', found_tag);

        if (found_tag) {
            return NextResponse.json({ success:true,tag: found_tag.tag });
        } else {
            return NextResponse.json({ success:false,msg: "tag not found" });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal Server Error', error });
    }
}
