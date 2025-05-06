import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Feedback from "@/lib/models/Feedback";
import { getCurrentUser } from "@/lib/auth";

// Get all feedback for admin
export async function GET() {
  try {
    await connectDB();
    
    // Get the current user ID and verify admin status
    const userId = await getCurrentUser();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Authentication required"
      }, { status: 401 });
    }
    
    // Verify admin status (you should implement this check)
    const isAdmin = await checkIfUserIsAdmin();
    if (!isAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin access required"
      }, { status: 403 });
    }
    
    // Get all feedback
    const feedback = await Feedback.find({})
      .sort({ createdAt: -1 }) // Most recent first
      .populate('userId', 'name email') // Get user details
      .select("subject message type status response createdAt userId respondedAt");
    
    return NextResponse.json({
      success: true,
      feedback
    });
    
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to fetch feedback"
    }, { status: 500 });
  }
}

// Helper function to check if user is admin
async function checkIfUserIsAdmin(): Promise<boolean> {
  try {
    // Make an API call to your backend to verify admin status
    const response = await fetch('/api/auth/me');
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    
    // Check if user exists and has admin role
    return data.user && data.user.role === 'admin';
  } catch (error) {
    return false;
  }
}