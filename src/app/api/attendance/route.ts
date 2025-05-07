import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Attendance from "@/lib/models/Attendance";
import User from "@/lib/models/User";
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
    
    if (!date) {
      return NextResponse.json({
        success: false,
        message: "Date is required"
      }, { status: 400 });
    }
    
    // Format the date to remove time component
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);
    
    // If students are provided, use them directly
    if (students && Array.isArray(students)) {
      // Use upsert to update if exists or create if not
      const result = await Attendance.findOneAndUpdate(
        { date: attendanceDate },
        {
          date: attendanceDate,
          students: students,
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
    }
    
    // If no students provided, fetch all users with role 'user'
    const users = await User.find({ role: 'user' }).select('_id name');
    
    // Check if attendance record already exists for this date
    const existingAttendance = await Attendance.findOne({ date: attendanceDate });
    
    // Create student records from users, preserving existing attendance status
    const studentRecords = users.map(user => {
      const userId = user._id.toString();
      // If student exists in current attendance, preserve their status
      const existingStudent = existingAttendance?.students.find(
        student => student.studentId === userId
      );
      
      return {
        studentId: userId,
        studentName: user.name,
        present: existingStudent ? existingStudent.present : false
      };
    });
    
    if (existingAttendance) {
      // Update existing record
      const result = await Attendance.findOneAndUpdate(
        { date: attendanceDate },
        {
          students: studentRecords
        },
        { new: true }
      );
      
      return NextResponse.json({
        success: true,
        attendance: result
      }, { status: 200 });
    } else {
      // Create new attendance record
      const newAttendance = new Attendance({
        date: attendanceDate,
        students: studentRecords
      });
      
      const result = await newAttendance.save();
      
      return NextResponse.json({
        success: true,
        attendance: result
      }, { status: 201 });
    }
    
  } catch (error) {
    console.error("Error marking attendance:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to mark attendance"
    }, { status: 500 });
  }
}