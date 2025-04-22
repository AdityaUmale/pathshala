import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Lecture from "@/lib/models/Lecture";
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const video = formData.get("video") as File;

    // Create unique filename
    const bytes = new Uint8Array(8);
    crypto.getRandomValues(bytes);
    const uniqueSuffix = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
    const fileName = `${uniqueSuffix}-${video.name}`;

    // Save video to public directory
    const videoBuf = await video.arrayBuffer();
    const videoPath = path.join(process.cwd(), 'public', 'uploads', 'videos', fileName);
    await writeFile(videoPath, Buffer.from(videoBuf));

    // Save video URL in database
    const videoUrl = `/uploads/videos/${fileName}`;

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
    console.error('Upload error:', error);
    return NextResponse.json({
      success: false,
      error: "Failed to create lecture",
    }, { status: 500 });
  }
}