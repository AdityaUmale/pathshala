"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Video, FileText, Bell, AlertTriangle, Calendar, CheckCircle, XCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { MessageSquare } from "lucide-react";
import Link from "next/link";

// Mock student data (replace with actual data from your database)
const MOCK_STUDENTS = Array.from({ length: 40 }, (_, i) => ({
  studentId: `student-${i + 1}`,
  studentName: `Student ${i + 1}`,
}));

export default function AdminPage() {
  const router = useRouter();
  
  // Move ALL state declarations to the top level
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [file, setFile] = useState(null);
  const [materialSemester, setMaterialSemester] = useState("1");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementDescription, setAnnouncementDescription] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState(
    MOCK_STUDENTS.map(student => ({ ...student, present: false }))
  );
  const [attendanceLoaded, setAttendanceLoaded] = useState(false);
  const [semester, setSemester] = useState("1");
  
  // Check if user is admin
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'admin') {
            setIsAuthorized(true);
          } else {
            toast.error("Access Denied", {
              description: "You don't have permission to access the admin page.",
            });
            router.replace('/dashboard');
          }
        } else {
          toast.error("Authentication Required", {
            description: "Please sign in to continue.",
          });
          router.replace('/signin');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        toast.error("Error", {
          description: "An error occurred while checking your permissions.",
        });
        router.replace('/signin');
      } finally {
        setIsLoading(false);
      }
    }
    
    checkAuth();
  }, [router]);
  
  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // If not authorized, don't render the page content
  if (!isAuthorized) {
    return null;
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("semester", semester);
    if (video) {
      formData.append("video", video);
    }

    try {
      const response = await fetch("/api/lectures/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload lecture");
      }

      setTitle("");
      setDescription("");
      setVideo(null);
      setSemester("1");
      
      toast.success("Lecture uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload lecture");
    }
  };

  const handleMaterialSubmit = async (e) => {
    e.preventDefault();
    
    const semesterNumber = parseInt(materialSemester);
    
    const formData = new FormData();
    formData.append("title", materialTitle);
    formData.append("description", materialDescription);
    formData.append("semester", semesterNumber.toString());
    if (file) {
      formData.append("file", file);
    }

    console.log("Submitting material with semester:", semesterNumber);

    try {
      const response = await fetch("/api/material", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        throw new Error(`Failed to upload material: ${errorData.message || 'Unknown error'}`);
      }

      setMaterialTitle("");
      setMaterialDescription("");
      setFile(null);
      setMaterialSemester("1");
      
      toast.success("Material uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to upload material");
    }
  };

  const handleAnnouncementSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/announcement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: announcementTitle,
          description: announcementDescription,
          important: isImportant,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create announcement");
      }

      setAnnouncementTitle("");
      setAnnouncementDescription("");
      setIsImportant(false);
      
    } catch (error) {
      console.error("Announcement error:", error);
    }
  };

  const fetchAttendanceForDate = async (date) => {
    if (!date) return;
    
    setIsSubmitting(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(`/api/attendance?date=${formattedDate}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch attendance");
      }
      
      const data = await response.json();
      
      if (data.attendance) {
        setAttendanceData(data.attendance.students);
      } else {
        setAttendanceData(MOCK_STUDENTS.map(student => ({ ...student, present: false })));
      }
      
      setAttendanceLoaded(true);
    } catch (error) {
      console.error("Error fetching attendance:", error);
      setAttendanceData(MOCK_STUDENTS.map(student => ({ ...student, present: false })));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      fetchAttendanceForDate(date);
    }
  };

  const toggleAttendance = (studentId) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.studentId === studentId 
          ? { ...student, present: !student.present } 
          : student
      )
    );
  };

  const markAllPresent = () => {
    setAttendanceData(prev => 
      prev.map(student => ({ ...student, present: true }))
    );
  };

  const markAllAbsent = () => {
    setAttendanceData(prev => 
      prev.map(student => ({ ...student, present: false }))
    );
  };

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
      
    } catch (error) {
      console.error("Error submitting attendance:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <div className="flex gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-primary text-primary-foreground">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Lecture
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload New Lecture</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Lecture Title</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter lecture title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter lecture description"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="semester">Semester</Label>
                    <select
                      id="semester"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="video">Video</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <Input
                        id="video"
                        type="file"
                        accept="video/*"
                        onChange={(e) => setVideo(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="video"
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <Video className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {video ? video.name : "Click to upload video"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Upload Lecture
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-cyan-600 hover:bg-cyan-700 text-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Upload Material
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Upload Study Material</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleMaterialSubmit} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="materialTitle">Material Title</Label>
                    <Input
                      id="materialTitle"
                      value={materialTitle}
                      onChange={(e) => setMaterialTitle(e.target.value)}
                      placeholder="Enter material title"
                      required
                    />
                  </div>
                  
                  {/* In your material upload dialog form */}
                  <div className="space-y-2">
                    <Label htmlFor="materialDescription">Description</Label>
                    <Textarea
                      id="materialDescription"
                      value={materialDescription}
                      onChange={(e) => setMaterialDescription(e.target.value)}
                      placeholder="Enter material description"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="materialSemester">Semester</Label>
                    <select
                      id="materialSemester"
                      value={materialSemester}
                      onChange={(e) => setMaterialSemester(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <option key={sem} value={sem}>
                          Semester {sem}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="file">Document</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-4 hover:border-primary/50 transition-colors">
                      <Input
                        id="file"
                        type="file"
                        accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                        className="hidden"
                      />
                      <label
                        htmlFor="file"
                        className="flex flex-col items-center gap-2 cursor-pointer"
                      >
                        <FileText className="w-8 h-8 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {file ? file.name : "Click to upload document"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                    Upload Material
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                  <Bell className="w-4 h-4 mr-2" />
                  Add Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Announcement</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleAnnouncementSubmit} className="space-y-6 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="announcementTitle">Announcement Title</Label>
                    <Input
                      id="announcementTitle"
                      value={announcementTitle}
                      onChange={(e) => setAnnouncementTitle(e.target.value)}
                      placeholder="Enter announcement title"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="announcementDescription">Announcement Content</Label>
                    <Textarea
                      id="announcementDescription"
                      value={announcementDescription}
                      onChange={(e) => setAnnouncementDescription(e.target.value)}
                      placeholder="Enter announcement content"
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="important" 
                      checked={isImportant}
                      onCheckedChange={(checked) => setIsImportant(checked === true)}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <Label 
                        htmlFor="important" 
                        className="flex items-center text-sm font-medium leading-none gap-1"
                      >
                        <AlertTriangle className="h-4 w-4 text-red-500" />
                        Mark as important
                      </Label>
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700">
                    Publish Announcement
                  </Button>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Calendar className="w-4 h-4 mr-2" />
                  Mark Attendance
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>Mark Student Attendance</DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div>
                    <Label>Select Date</Label>
                    <CalendarComponent
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
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
                    <Label className="mb-2 block">Students</Label>
                    {isSubmitting ? (
                      <div className="flex justify-center py-8">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : 'Save Attendance'}
                </Button>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link href="/dashboard/admin/feedback" className="p-6 rounded-xl bg-card hover:bg-accent/10 border border-border transition-colors">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-primary/10 text-primary">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Manage Feedback</h3>
              <p className="text-sm text-muted-foreground">
                View and respond to user feedback and questions
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}