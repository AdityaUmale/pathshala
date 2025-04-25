import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lecture from "@/lib/models/Lecture";

export async function GET(request: Request) {
  try {
    await connectDB();
    
    // Get semester from query params if it exists
    const { searchParams } = new URL(request.url);
    const semester = searchParams.get('semester');
    
    // Build query based on whether semester filter is applied
    const query = semester ? { semester: parseInt(semester) } : {};

    const lectures = await Lecture.find(query)
      .sort({ createdAt: -1 }) // Most recent first
      .select("title description videoUrl semester createdAt");

    return NextResponse.json({
      success: true,
      lectures,
    });

  } catch (error) {
    console.log(error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch lectures",
    }, { status: 500 });
  }
}