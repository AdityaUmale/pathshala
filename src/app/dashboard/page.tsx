"use client";

import { useEffect, useState } from "react"; // Make sure useEffect is imported if you fetch status
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Users,
  FileText,
  Bell,
  Menu,
  Shield,
  X,
} from "lucide-react";

// Placeholder for your actual admin check function
// Actual implementation of admin check function
async function checkIfUserIsAdmin(): Promise<boolean> {
  try {
    // Make an API call to your backend to verify admin status
    const response = await fetch('/api/auth/me');
    
    if (!response.ok) {
      console.error('Failed to fetch user data');
      return false; // If API call fails, default to non-admin
    }
    
    const data = await response.json();
    
    // Check if user exists and has admin role
    return data.user && data.user.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false; // If any error occurs, default to non-admin
  }
}

export default function DashboardPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // Initial state

  useEffect(() => {
    // Fetch admin status when the component mounts
    const fetchAdminStatus = async () => {
      const adminStatus = await checkIfUserIsAdmin();
      setIsAdmin(adminStatus);
    };
    fetchAdminStatus();
  }, []); // Empty dependency array means this runs once on mount

  const allMenuItems = [
    {
      icon: <Shield className="w-5 h-5" />,
      label: "Admin Access",
      href: "/dashboard/admin",
      description: "Manage users and settings",
      isAdminOnly: true,
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Study Material",
      href: "/dashboard/materials",
      description: "Access study resources",
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      label: "Lectures",
      href: "/dashboard/lectures",
      description: "View recorded lectures",
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: "Attendance",
      href: "/dashboard/attendance",
      description: "Track attendance records",
    },
    {
      icon: <Bell className="w-5 h-5" />,
      label: "Announcements",
      href: "/dashboard/announcements",
      description: "View important updates",
    },
  ];

  const menuItems = allMenuItems.filter(item => !item.isAdminOnly || isAdmin);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <Menu className="h-6 w-6" />
        )}
      </Button>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full w-64 bg-card border-r border-border transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 z-40`}
      >
        <div className="p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-primary">Pathshala</h2>
          <p className="text-sm text-muted-foreground">Learning Management</p>
        </div>
        <nav className="p-4 space-y-2">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 text-primary">
                {item.icon}
              </div>
              <div>
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:ml-64" : "ml-0"
        }`}
      >
        <div className="p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">
              Dashboard Overview
            </h1>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="p-6 rounded-xl bg-card hover:bg-accent/10 border border-border transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{item.label}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}