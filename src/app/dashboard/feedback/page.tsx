"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Send, ThumbsUp } from "lucide-react";
import { toast } from "sonner";

type FeedbackItem = {
  _id: string;
  type: string;
  subject: string;
  message: string;
  createdAt: string;
  status: string;
  response?: string;
  respondedAt?: string;
};

export default function FeedbackPage() {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("feedback"); // "feedback" or "doubt"
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [previousFeedback, setPreviousFeedback] = useState<FeedbackItem[]>([]);

  // Fetch previous feedback from API
  useEffect(() => {
    async function fetchFeedback() {
      try {
        const response = await fetch('/api/feedback');
        
        if (!response.ok) {
          throw new Error('Failed to fetch feedback');
        }
        
        const data = await response.json();
        if (data.success) {
          setPreviousFeedback(data.feedback);
        }
      } catch (error) {
        console.error('Error fetching feedback:', error);
        toast.error('Failed to load your previous submissions');
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchFeedback();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message, type }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit');
      }
      
      const data = await response.json();
      
      // Add to local state
      setPreviousFeedback(prev => [data.feedback, ...prev]);
      
      // Reset form
      setSubject("");
      setMessage("");
      setType("feedback");
      
      toast.success(type === "feedback" ? "Feedback submitted successfully" : "Question submitted successfully");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error(error instanceof Error ? error.message : "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <MessageSquare className="mr-2 h-8 w-8 text-primary" />
          Feedback & Doubts
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Submission Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Thoughts</CardTitle>
              <CardDescription>
                Share your feedback or ask questions about your courses.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select 
                    value={type} 
                    onValueChange={setType}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="feedback">Feedback</SelectItem>
                      <SelectItem value="doubt">Question/Doubt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder={type === "feedback" ? "What's your feedback about?" : "What's your question about?"}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={type === "feedback" ? "Share your detailed feedback..." : "Describe your question in detail..."}
                    rows={5}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit {type === "feedback" ? "Feedback" : "Question"}
                    </>
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
          
          {/* Previous Submissions */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Your Previous Submissions</h2>
            
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : previousFeedback.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                You haven't submitted any feedback or questions yet.
              </div>
            ) : (
              previousFeedback.map((item) => (
                <Card key={item._id} className={item.status === "responded" ? "border-green-200" : ""}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-base">{item.subject}</CardTitle>
                        <CardDescription className="text-xs">
                          {new Date(item.createdAt).toLocaleDateString()} • 
                          {item.type === "feedback" ? "Feedback" : "Question"}
                        </CardDescription>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${item.status === "responded" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"}`}>
                        {item.status === "responded" ? "Responded" : "Pending"}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{item.message}</p>
                    
                    {item.response && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <p className="text-xs font-medium text-muted-foreground mb-1">Response:</p>
                        <p className="text-sm">{item.response}</p>
                        {item.respondedAt && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Responded on {new Date(item.respondedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}