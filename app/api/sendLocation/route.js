import { NextResponse } from "next/server";
import mongoose from "mongoose";
const vehicles = require("@/app/api/model/vehicles");

async function connectToDatabase() {
  await mongoose.connect("mongodb+srv://inventory_user1:CknB8IRcsIUptTZn@cluster0.s2kre.mongodb.net/inventory");
}

export async function POST(request) {
  const data = await request.json();
  console.log(data);
  if (request.method == "POST") {
    connectToDatabase().then(() => console.log("db connected"));
    try {
    //   const vehicleInfo = new mongoose.models.vehicles(data);
      const updatedVehicle = await mongoose.models.vehicles.findOneAndUpdate(
        { reg_number: data.reg_number }, // Find the vehicle by reg_number
        { lat: data.lat, long: data.long },   // Update the lat and long
        { new: true }               // Return the updated document
      );

    //   await vehicleInfo.save().then(() => console.log("vehicleInfo saved"), () => console.log("vehicleInfo save failed"));
      console.log(updatedVehicle);
      return NextResponse.json({ success: true, Response: 'location updated' });
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