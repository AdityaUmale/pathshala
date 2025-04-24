import mongoose, { Schema } from 'mongoose';

// Define the student attendance schema
const StudentAttendanceSchema = new Schema({
  studentId: {
    type: String, // Change from Schema.Types.ObjectId to String
    required: true,
  },
  studentName: {
    type: String,
    required: true,
  },
  present: {
    type: Boolean,
    default: false,
  },
});

// Define the attendance schema
const AttendanceSchema = new Schema({
  date: {
    type: Date,
    required: true,
    unique: true,
  },
  students: [StudentAttendanceSchema],
}, { timestamps: true });

// Create and export the model
const Attendance = mongoose.models.Attendance || mongoose.model('Attendance', AttendanceSchema);

export default Attendance;