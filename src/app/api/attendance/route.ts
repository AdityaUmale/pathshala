import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Attendance from "@/lib/models/Attendance";
import mongoose from "mongoose";

// Get attendance for a specific date
export async function GET(req: Request) {
  try {
    await connectDB();
    
    const url = new URL(req.url);
    const date = url.searchParams.get("date");
    
    if (!date) {
      return NextResponse.json({
        success: false,
        message: "Date parameter is required"
      }, { status: 400 });
    }
    
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);
    
    const attendance = await Attendance.findOne({
      date: {
        $gte: startDate,
        $lte: endDate
      }
    });
    
    return NextResponse.json({
      success: true,
      attendance: attendance || null
    });
    
  } catch (error) {
    console.error("Error fetching attendance:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch attendance"
    }, { status: 500 });
  }
}

// Mark attendance for a specific date
export async function POST(req: Request) {
  try {
    await connectDB();
    
    const body = await req.json();
    const { date, students } = body;
    
    if (!date || !students || !Array.isArray(students)) {
      return NextResponse.json({
        success: false,
        message: "Date and students array are required"
      }, { status: 400 });
    }
    
    // Create a temporary admin ID (replace with actual auth in production)
    const adminId = new mongoose.Types.ObjectId();
    
    // Format the date to remove time component
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);
    
    // Use upsert to update if exists or create if not
    const result = await Attendance.findOneAndUpdate(
      { date: attendanceDate },
      {
        date: attendanceDate,
        students: students, // This is causing the error
      },
      { 
        new: true, 
        upsert: true 
      }
    );
    
    return NextResponse.json({
      success: true,
      attendance: result
    }, { status: 201 });
    
  } catch (error) {
    console.error("Error marking attendance:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to mark attendance"
    }, { status: 500 });
  }
}