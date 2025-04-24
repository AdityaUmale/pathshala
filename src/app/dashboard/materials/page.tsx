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
  createdAt: string;
}

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const response = await fetch("/api/material");
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }
        const data = await response.json();
        setMaterials(data.materials);
      } catch (err) {
        setError("Failed to load materials");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMaterials();
  }, []);

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
        <h1 className="text-3xl font-bold mb-8">Study Materials</h1>
        
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
                
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>
                    {new Date(material.createdAt).toLocaleDateString()}
                  </span>
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
            No study materials available yet.
          </div>
        )}
      </div>
    </div>
  );
}