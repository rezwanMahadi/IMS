import { NextResponse } from "next/server";
import mongoose from "mongoose";
const product = require("@/app/api/model/product");
const searchTag = require("@/app/api/model/searchTag");

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
        return NextResponse.json({ "success": true, found_product });
      }
      else {
        const temptag = new searchTag({ type: 'tempTag', tag: receivedTag.tag });
        temptag.save().then(() => console.log("user saved"))
        return NextResponse.json({ "success": false, "isNewTag": true, "message": "Tag not found" });
      }
    }
    catch(error){
      console.log(error);
      return NextResponse.json({ message: 'Internal Server Error', error });
    }
  }
  else {
    return NextResponse.json({ "success": false, "error": "Request type error." });
  }
}