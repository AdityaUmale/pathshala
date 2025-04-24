"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar } from "lucide-react";

interface Announcement {
  _id: string;
  title: string;
  description: string;
  important: boolean;
  createdAt: string;
}

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnnouncements() {
      try {
        const response = await fetch("/api/announcement");
        if (!response.ok) {
          throw new Error("Failed to fetch announcements");
        }
        const data = await response.json();
        setAnnouncements(data.announcements);
      } catch (err) {
        setError("Failed to load announcements");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Bell className="h-6 w-6 text-primary" />
          <h1 className="text-3xl font-bold">Announcements</h1>
        </div>
        
        <div className="space-y-6">
          {announcements.map((announcement) => (
            <Card 
              key={announcement._id} 
              className={`overflow-hidden transition-all ${
                announcement.important 
                  ? "border-red-200 shadow-md shadow-red-100 dark:border-red-900 dark:shadow-red-900/20" 
                  : ""
              }`}
            >
              <CardHeader className={`${
                announcement.important 
                  ? "bg-red-50 dark:bg-red-950/20" 
                  : "bg-muted/50"
              }`}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{announcement.title}</CardTitle>
                  {announcement.important && (
                    <Badge variant="destructive">Important</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4 whitespace-pre-line">
                  {announcement.description}
                </p>
                
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(announcement.createdAt).toLocaleDateString()} at {' '}
                    {new Date(announcement.createdAt).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {announcements.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No announcements available.
          </div>
        )}
      </div>
    </div>
  );
}