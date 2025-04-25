"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";

interface Material {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  fileType: string;
  semester: number;
  createdAt: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);

  // In the useEffect function where you fetch materials
  useEffect(() => {
    async function fetchMaterials() {
      try {
        const url = selectedSemester 
          ? `/api/material?semester=${selectedSemester}` 
          : "/api/material";
          
        console.log("Fetching materials from:", url); // Add this for debugging
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await response.json();
        console.log("Fetched materials:", data.materials); // Add this for debugging
        setMaterials(data.materials);
      } catch (err) {
        setError("Failed to load materials");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMaterials();
  }, [selectedSemester]);

  // In the handleSemesterChange function
  const handleSemesterChange = (semester: string | null) => {
    console.log("Changing semester filter to:", semester); // Add this for debugging
    setSelectedSemester(semester);
    setLoading(true);
  };

  const getFileIcon = (fileType: string) => {
    return <FileText className="h-8 w-8 text-blue-500" />;
  };

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
        <h1 className="text-3xl font-bold mb-4">Study Materials</h1>
        
        {/* Semester filter buttons */}
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            variant={selectedSemester === null ? "default" : "outline"}
            onClick={() => handleSemesterChange(null)}
          >
            All Semesters
          </Button>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
            <Button
              key={sem}
              variant={selectedSemester === sem.toString() ? "default" : "outline"}
              onClick={() => handleSemesterChange(sem.toString())}
            >
              Semester {sem}
            </Button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {materials.map((material) => (
            <Card key={material._id} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="bg-muted/50">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                  <div className="p-2 bg-white rounded-full shadow-sm">
                    {getFileIcon(material.fileType)}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <p className="text-muted-foreground mb-4">
                  {material.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>
                      {new Date(material.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div>
                    {material.semester ? (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                        Semester {material.semester}
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        No Semester
                      </span>
                    )}
                  </div>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full" 
                  asChild
                >
                  <a href={material.fileUrl} target="_blank" rel="noopener noreferrer" download>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {materials.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            {selectedSemester 
              ? `No study materials available for Semester ${selectedSemester}.` 
              : "No study materials available yet."}
          </div>
        )}
      </div>
    </div>
  );
}