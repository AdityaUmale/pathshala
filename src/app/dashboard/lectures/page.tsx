"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Lecture {
  _id: string;
  title: string;
  description: string;
  videoUrl: string;
  createdAt: string;
}

export default function LecturesPage() {
  const [lectures, setLectures] = useState<Lecture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchLectures() {
      try {
        const response = await fetch("/api/lectures");
        if (!response.ok) {
          throw new Error("Failed to fetch lectures");
        }
        const data = await response.json();
        setLectures(data.lectures);
      } catch (err) {
        setError("Failed to load lectures");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchLectures();
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
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Available Lectures</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lectures.map((lecture) => (
            <Card key={lecture._id} className="overflow-hidden">
              <CardHeader>
                <CardTitle>{lecture.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <video 
                  controls 
                  className="w-full rounded-lg"
                >
                  <source 
                    src={lecture.videoUrl} 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
                
                <p className="text-muted-foreground">
                  {lecture.description}
                </p>
                
                <div className="text-sm text-muted-foreground">
                  Posted on {new Date(lecture.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {lectures.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            No lectures available yet.
          </div>
        )}
      </div>
    </div>
  );
}