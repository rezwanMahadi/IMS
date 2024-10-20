import { NextResponse } from "next/server";
import mongoose from "mongoose";
const users = require("@/app/api/model/users");

async function connectToDatabase() {
  await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
}

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  if (request.method == "POST") {
    connectToDatabase().then(() => console.log("db connected"));
    try {
      const userInfo = new mongoose.models.users(data);

      await userInfo.save().then(() => console.log("user saved"), () => console.log("user save failed"));

      return NextResponse.json({ success: true, Response: 'user added' });
    }
    catch (error) {
      console.log(error);
      return NextResponse.json({ message: 'Internal Server Error', error });
    }
  }
  else {
    return NextResponse.json({ success: false, error: "Request type error." });
  }
}