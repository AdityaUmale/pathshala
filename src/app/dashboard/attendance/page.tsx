"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar as CalendarIcon, UserCheck, UserX } from "lucide-react";

interface Student {
  studentId: string;
  studentName: string;
  present: boolean;
}

interface AttendanceRecord {
  _id: string;
  date: string;
  students: Student[];
  createdAt: string;
  updatedAt: string;
}

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [attendance, setAttendance] = useState<AttendanceRecord | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Calculate attendance statistics
  const presentCount = attendance?.students.filter(s => s.present).length || 0;
  const absentCount = attendance?.students.length ? attendance.students.length - presentCount : 0;
  const attendancePercentage = attendance?.students.length 
    ? Math.round((presentCount / attendance.students.length) * 100) 
    : 0;

  useEffect(() => {
    if (selectedDate) {
      fetchAttendance(selectedDate);
    }
  }, [selectedDate]);

  const fetchAttendance = async (date: Date) => {
    setLoading(true);
    setError("");
    
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(`/api/attendance?date=${formattedDate}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }
      
      const data = await response.json();
      setAttendance(data.attendance);
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <CalendarIcon className="mr-2 h-8 w-8 text-primary" />
          Attendance Records
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Select Date</CardTitle>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="border rounded-md"
                />
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>
                  {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : "Select a date"}
                </CardTitle>
                {attendance && (
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {attendancePercentage}% Present
                    </Badge>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : error ? (
                  <div className="text-center text-red-500 py-8">{error}</div>
                ) : !attendance ? (
                  <div className="text-center text-muted-foreground py-8">
                    No attendance record found for this date
                  </div>
                ) : (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-green-500" />
                        <span>{presentCount} Present</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <UserX className="h-5 w-5 text-red-500" />
                        <span>{absentCount} Absent</span>
                      </div>
                    </div>
                    
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-muted/50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Student
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {attendance.students.map((student) => (
                            <tr key={student.studentId}>
                              <td className="px-6 py-4 whitespace-nowrap">
                                {student.studentName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right">
                                {student.present ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    Present
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                                    Absent
                                  </Badge>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}