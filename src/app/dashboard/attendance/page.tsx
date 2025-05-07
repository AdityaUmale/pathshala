"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon, UserCheck, UserX, RefreshCw, CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [attendanceData, setAttendanceData] = useState<Student[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate attendance statistics
  const presentCount = attendance?.students.filter(s => s.present).length || 0;
  const absentCount = attendance?.students.length ? attendance.students.length - presentCount : 0;
  const attendancePercentage = attendance?.students.length 
    ? Math.round((presentCount / attendance.students.length) * 100) 
    : 0;

  // Check if user is admin
  useEffect(() => {
    async function checkAdmin() {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'admin') {
            setIsAdmin(true);
          }
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    }
    
    checkAdmin();
  }, []);

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
      
      // Set attendance data for marking form
      if (data.attendance) {
        setAttendanceData(data.attendance.students);
      } else {
        setAttendanceData([]);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load attendance data");
    } finally {
      setLoading(false);
    }
  };
  
  // Function to refresh student list from database
  const refreshStudentList = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    try {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(`/api/attendance`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: formattedDate,
          // Not sending students will trigger fetching from database
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to refresh student list");
      }
      
      const data = await response.json();
      setAttendance(data.attendance);
      setAttendanceData(data.attendance.students);
      toast.success("Student list refreshed from database");
    } catch (err) {
      console.error(err);
      setError("Failed to refresh student list");
      toast.error("Failed to refresh student list");
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle attendance for a student
  const toggleAttendance = (studentId: string) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.studentId === studentId 
          ? { ...student, present: !student.present } 
          : student
      )
    );
  };

  // Mark all students present
  const markAllPresent = () => {
    setAttendanceData(prev => 
      prev.map(student => ({ ...student, present: true }))
    );
  };

  // Mark all students absent
  const markAllAbsent = () => {
    setAttendanceData(prev => 
      prev.map(student => ({ ...student, present: false }))
    );
  };

  // Submit attendance
  const submitAttendance = async () => {
    if (!selectedDate) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: selectedDate,
          students: attendanceData,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to submit attendance");
      }
      
      const data = await response.json();
      setAttendance(data.attendance);
      toast.success("Attendance saved successfully");
    } catch (error) {
      console.error("Error submitting attendance:", error);
      toast.error("Failed to save attendance");
    } finally {
      setIsSubmitting(false);
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
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Select Date</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={refreshStudentList}
                    disabled={loading}
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh Students
                  </Button>
                  
                  {isAdmin && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          size="sm" 
                          className="bg-green-600 hover:bg-green-700 text-white"
                          disabled={loading}
                        >
                          <UserCheck className="h-4 w-4 mr-2" />
                          Mark Attendance
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[700px]">
                        <DialogHeader>
                          <DialogTitle>Mark Student Attendance</DialogTitle>
                        </DialogHeader>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                          <div>
                            <Calendar
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              className="border rounded-md"
                            />
                            <div className="mt-4 space-y-2">
                              <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full" 
                                onClick={markAllPresent}
                              >
                                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                Mark All Present
                              </Button>
                              <Button 
                                type="button" 
                                variant="outline" 
                                className="w-full" 
                                onClick={markAllAbsent}
                              >
                                <XCircle className="w-4 h-4 mr-2 text-red-500" />
                                Mark All Absent
                              </Button>
                            </div>
                          </div>
                          <div className="max-h-[400px] overflow-y-auto pr-2">
                            <div className="mb-2 flex justify-between items-center">
                              <span className="font-medium">Students</span>
                              <span className="text-xs text-muted-foreground">
                                {attendanceData.filter(s => s.present).length} / {attendanceData.length} Present
                              </span>
                            </div>
                            {isSubmitting ? (
                              <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                              </div>
                            ) : attendanceData.length === 0 ? (
                              <div className="text-center py-8 text-muted-foreground">
                                No students found. Click "Refresh Students" to load from database.
                              </div>
                            ) : (
                              <div className="space-y-2">
                                {attendanceData.map((student) => (
                                  <div 
                                    key={student.studentId} 
                                    className="flex items-center justify-between p-2 border rounded-md"
                                  >
                                    <span>{student.studentName}</span>
                                    <div className="flex items-center">
                                      <span className={`mr-2 text-sm ${student.present ? 'text-green-500' : 'text-red-500'}`}>
                                        {student.present ? 'Present' : 'Absent'}
                                      </span>
                                      <Checkbox 
                                        checked={student.present}
                                        onCheckedChange={() => toggleAttendance(student.studentId)}
                                      />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button 
                          className="w-full mt-6 bg-green-600 hover:bg-green-700"
                          onClick={submitAttendance}
                          disabled={isSubmitting || attendanceData.length === 0}
                        >
                          {isSubmitting ? 'Saving...' : 'Save Attendance'}
                        </Button>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
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