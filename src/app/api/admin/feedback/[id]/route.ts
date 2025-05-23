import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Feedback from "@/lib/models/Feedback";
import { getCurrentUser } from "@/lib/auth";
import User from "@/lib/models/User";

// Respond to feedback
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Get the current user ID
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
    
    const { id } = params;
    const { response } = await req.json();
    
    if (!response) {
      return NextResponse.json({
        success: false,
        message: "Response is required"
      }, { status: 400 });
    }
    
    // Update the feedback with response
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      {
        response,
        status: 'responded',
        respondedBy: userId,
        respondedAt: new Date()
      },
      { new: true }
    );
    
    if (!updatedFeedback) {
      return NextResponse.json({
        success: false,
        message: "Feedback not found"
      }, { status: 404 });
    }
    
    return NextResponse.json({
      success: true,
      feedback: updatedFeedback
    });
    
  } catch (error) {
    console.error("Error responding to feedback:", error);
    return NextResponse.json({
      success: false,
      message: "Failed to respond to feedback"
    }, { status: 500 });
  }
}

// Helper function to check if user is admin
async function checkIfUserIsAdmin(): Promise<boolean> {
  try {
    // Get the current user ID from the session/token
    const userId = await getCurrentUser();
    if (!userId) return false;
    
    // Fetch the user from the database to check their role
    
    const user = await User.findById(userId);
    
    // Check if user exists and has admin role
    return user && user.role === 'admin';
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
}