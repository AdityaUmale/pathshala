import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Announcement from "@/lib/models/Announcements";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { title, description, important } = body;
    
    if (!title || !description) {
      return NextResponse.json({
        success: false,
        message: "Title and description are required"
      }, { status: 400 });
    }
    
    // Create a temporary ObjectId for createdBy
    // In a real app, you would get this from authentication
    const tempUserId = new mongoose.Types.ObjectId();
    
    const announcement = await Announcement.create({
      title,
      description,
      important: important || false,
      createdBy: tempUserId, // Use ObjectId instead of string
    });
    
    return NextResponse.json({
      success: true,
      announcement
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to create announcement"
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    
    const announcements = await Announcement.find()
      .sort({ createdAt: -1 }) // Most recent first
      .select("title description important createdAt");
    
    return NextResponse.json({
      success: true,
      announcements
    });
    
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch announcements"
    }, { status: 500 });
  }
}