import { NextResponse } from "next/server";
import connectDB from "../../../../lib/db";
import Lecture from "../../../../lib/models/Lecture";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const video = formData.get("video") as File;

    // For now, storing just a placeholder URL
    // In production, you'd upload to a cloud service
    const videoUrl = "/videos/" + video.name;

    const lecture = await Lecture.create({
      title,
      description,
      videoUrl,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return NextResponse.json({
      success: true,
      data: lecture,
    }, { status: 201 });

  } catch (error) {
    return NextResponse.json({
      success: false,
      error: "Failed to create lecture",
    }, { status: 500 });
  }
}