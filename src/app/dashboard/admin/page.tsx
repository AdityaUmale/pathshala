"use client";

import { useState } from "react";
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
import { Upload, Video, FileText } from "lucide-react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [materialTitle, setMaterialTitle] = useState("");
  const [materialDescription, setMaterialDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
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

      // Reset form
      setTitle("");
      setDescription("");
      setVideo(null);
      
      // You can add a success notification here
    } catch (error) {
      console.error("Upload error:", error);
      // You can add an error notification here
    }
  };

  const handleMaterialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", materialTitle);
    formData.append("description", materialDescription);
    if (file) {
      formData.append("file", file);
    }

    try {
      const response = await fetch("/api/material", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload material");
      }

      // Reset form
      setMaterialTitle("");
      setMaterialDescription("");
      setFile(null);
      
      // You can add a success notification here
    } catch (error) {
      console.error("Upload error:", error);
      // You can add an error notification here
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
          </div>
        </div>
      </div>
    </div>
  );
}
