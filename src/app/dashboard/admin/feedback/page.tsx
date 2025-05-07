"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, MessageCircle, Send } from "lucide-react";

type FeedbackItem = {
  _id: string;
  subject: string;
  message: string;
  type: "feedback" | "doubt";
  status: "pending" | "responded";
  createdAt: string;
  response?: string;
  respondedAt?: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
};

export default function AdminFeedbackPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [responseText, setResponseText] = useState("");
  const [respondingTo, setRespondingTo] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Check if user is admin
  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const data = await response.json();
          if (data.user && data.user.role === 'admin') {
            setIsAuthorized(true);
            fetchFeedback();
          } else {
            // Show toast for non-admin users
            toast.error("Access Denied", {
              description: "You don't have permission to access this page.",
            });
            // Redirect non-admin users
            router.replace('/dashboard');
          }
        } else {
          // Show toast for unauthenticated users
          toast.error("Authentication Required", {
            description: "Please sign in to continue.",
          });
          // Redirect unauthenticated users
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

  // Fetch all feedback
  const fetchFeedback = async () => {
    try {
      const response = await fetch('/api/admin/feedback');
      
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      
      const data = await response.json();
      if (data.success) {
        setFeedback(data.feedback);
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
      toast.error('Failed to load feedback');
    }
  };

  // Handle responding to feedback
  const handleRespond = async (feedbackId: string) => {
    if (!responseText.trim()) {
      toast.error("Response cannot be empty");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`/api/admin/feedback/${feedbackId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ response: responseText }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to respond');
      }
      
      const data = await response.json();
      
      // Update local state
      setFeedback(prev => prev.map(item => 
        item._id === feedbackId ? { ...item, status: 'responded', response: responseText, respondedAt: new Date().toISOString() } : item
      ));
      
      // Reset form
      setResponseText("");
      setRespondingTo(null);
      
      toast.success("Response sent successfully");
    } catch (error) {
      console.error("Error responding to feedback:", error);
      toast.error(error instanceof Error ? error.message : "Failed to send response. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter feedback based on active tab
  const filteredFeedback = feedback.filter(item => {
    if (activeTab === "all") return true;
    if (activeTab === "pending") return item.status === "pending";
    if (activeTab === "responded") return item.status === "responded";
    if (activeTab === "feedback") return item.type === "feedback";
    if (activeTab === "doubt") return item.type === "doubt";
    return true;
  });

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

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <MessageSquare className="mr-2 h-8 w-8 text-primary" />
          Manage Feedback & Doubts
        </h1>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid grid-cols-5 w-full max-w-2xl">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="responded">Responded</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="doubt">Questions</TabsTrigger>
          </TabsList>
        </Tabs>
        
        {filteredFeedback.length === 0 ? (
          <div className="text-center py-12 bg-muted/20 rounded-lg">
            <MessageCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No feedback found</h3>
            <p className="text-muted-foreground">There are no items matching your current filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {filteredFeedback.map((item) => (
              <Card key={item._id} className={item.status === "responded" ? "border-green-200" : ""}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{item.subject}</CardTitle>
                      <CardDescription>
                        From: {item.userId.name} ({item.userId.email}) • 
                        {new Date(item.createdAt).toLocaleDateString()} • 
                        <Badge variant={item.type === "feedback" ? "default" : "secondary"}>
                          {item.type === "feedback" ? "Feedback" : "Question"}
                        </Badge> • 
                        <Badge variant={item.status === "responded" ? "outline" : "destructive"}>
                          {item.status === "responded" ? "Responded" : "Pending"}
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/20 p-4 rounded-md mb-4">
                    <p className="whitespace-pre-wrap">{item.message}</p>
                  </div>
                  
                  {item.response && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="text-sm font-medium mb-2">Your Response:</h4>
                      <div className="bg-primary/5 p-4 rounded-md">
                        <p className="whitespace-pre-wrap">{item.response}</p>
                      </div>
                      {item.respondedAt && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Responded on {new Date(item.respondedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {item.status === "pending" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          onClick={() => setRespondingTo(item._id)}
                          className="w-full"
                        >
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Respond
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Respond to {item.type === "feedback" ? "Feedback" : "Question"}</DialogTitle>
                          <DialogDescription>
                            You are responding to: {item.subject}
                          </DialogDescription>
                        </DialogHeader>
                        <div className="bg-muted/20 p-4 rounded-md mb-4 max-h-40 overflow-y-auto">
                          <p className="text-sm">{item.message}</p>
                        </div>
                        <Textarea
                          value={responseText}
                          onChange={(e) => setResponseText(e.target.value)}
                          placeholder="Type your response here..."
                          rows={5}
                        />
                        <DialogFooter>
                          <Button 
                            onClick={() => handleRespond(item._id)}
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? (
                              <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent"></div>
                                Sending...
                              </>
                            ) : (
                              <>
                                <Send className="mr-2 h-4 w-4" />
                                Send Response
                              </>
                            )}
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button variant="outline" className="w-full" disabled>
                      Already Responded
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}