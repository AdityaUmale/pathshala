import { NextResponse } from "next/server";
import  connectDB  from "@/lib/db";
import Lecture from "@/lib/models/Lecture";

export async function GET() {
  try {
    await connectDB();

    const lectures = await Lecture.find()
      .sort({ createdAt: -1 }) // Most recent first
      .select("title description videoUrl createdAt");

    return NextResponse.json({
      success: true,
      lectures,
    });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to fetch lectures",
    }, { status: 500 });
    console.log(error);
  }
}