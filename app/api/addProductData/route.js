import { NextResponse } from "next/server";
import mongoose from "mongoose";
const product = require("@/app/api/model/product");
const temp_tags = require("@/app/api/model/searchTag");

async function connectToDatabase() {
  await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
}

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  if (request.method == "POST") {
    connectToDatabase().then(() => console.log("db connected"));
    try {
      const productInfo = mongoose.models.products(data);

      await productInfo.save().then(() => console.log("product saved"), () => console.log("product save failed"))

      const dlt = await mongoose.models.temp_tags.deleteOne({ type: "tempTag" }).then(() => console.log("temp_tag deleted"));

      return NextResponse.json({ success: true });
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