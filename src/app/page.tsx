import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  Calendar,
  FileText,
  Bell,
  Users,
  Video,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  ChevronRight,
  Star,
  Sparkles,
  Zap,
  Lightbulb,
  BookMarked,
  BarChart3,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-[40%] -right-[60%] h-[1000px] w-[1000px] rounded-full bg-gradient-to-b from-purple-500/20 to-pink-500/5 blur-3xl" />
        <div className="absolute -bottom-[40%] -left-[60%] h-[1000px] w-[1000px] rounded-full bg-gradient-to-t from-cyan-500/20 to-blue-500/5 blur-3xl" />
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
              Pathshala
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-purple-500">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-purple-500">
              How It Works
            </Link>
            <Link href="#get-started" className="text-sm font-medium transition-colors hover:text-purple-500">
              Get Started
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link href="/signin">Log In</Link>
            </Button>
            <Button
              size="sm"
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 border-0"
              asChild
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300">
                  <Sparkles className="mr-1 h-3 w-3" />
                  <span>Free Learning Platform</span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    Transform Education with Pathshala
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The complete online learning platform where staff can manage content and students can access quality
                    education anytime, anywhere. Completely free for everyone.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/20 border-0"
                    asChild
                  >
                    <Link href="/signup">
                      Get Started
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-purple-200 dark:border-purple-800"
                    asChild
                  >
                    <Link href="#features">Learn More</Link>
                  </Button>
                </div>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden">
                        <div className="h-full w-full bg-gradient-to-br from-purple-500/30 to-pink-500/30" />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                    <span className="ml-2">Trusted by 10,000+ educators</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl -z-10 transform rotate-3" />
                <Image
                  src="/placeholder.svg?height=550&width=800"
                  width={800}
                  height={550}
                  alt="Pathshala Platform Screenshot"
                  className="mx-auto aspect-video overflow-hidden rounded-3xl object-cover object-center sm:w-full lg:order-last shadow-2xl shadow-purple-500/10 border border-purple-500/10"
                />
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-0 h-40 w-40 -translate-y-1/2 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-60 w-60 translate-y-1/2 translate-x-1/2 rounded-full bg-purple-500/10 blur-3xl" />
        </section>

        <section className="container px-4 py-12 md:px-6 relative">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["Trusted by", "Harvard University", "Stanford", "MIT", "Oxford", "Cambridge"].map((item, i) => (
              <div
                key={i}
                className={`${i === 0 ? "text-muted-foreground text-sm" : "text-foreground/70 font-semibold"} flex items-center`}
              >
                {item}
              </div>
            ))}
          </div>
        </section>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted/30 -z-10" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300">
                <Zap className="mr-1 h-3 w-3" />
                <span>Features</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                  Everything You Need for Online Learning
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pathshala provides powerful tools for both educators and students to create an effective learning
                  environment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-10">
              <div className="group flex flex-col gap-4 items-start rounded-xl border p-6 transition-all hover:bg-gradient-to-br hover:from-purple-500/5 hover:to-pink-500/5 hover:border-purple-500/20">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                  <Video className="h-6 w-6 text-purple-700 dark:text-purple-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Video Lectures</h3>
                  <p className="text-muted-foreground">
                    Upload, organize, and stream high-quality video lectures with interactive features.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 items-start rounded-xl border p-6 transition-all hover:bg-gradient-to-br hover:from-cyan-500/5 hover:to-blue-500/5 hover:border-cyan-500/20">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                  <Calendar className="h-6 w-6 text-cyan-700 dark:text-cyan-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Attendance Tracking</h3>
                  <p className="text-muted-foreground">
                    Easily track and manage student attendance with automated reports and insights.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 items-start rounded-xl border p-6 transition-all hover:bg-gradient-to-br hover:from-amber-500/5 hover:to-orange-500/5 hover:border-amber-500/20">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 group-hover:from-amber-500/30 group-hover:to-orange-500/30 transition-colors">
                  <FileText className="h-6 w-6 text-amber-700 dark:text-amber-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Study Materials</h3>
                  <p className="text-muted-foreground">
                    Share notes, documents, and resources in various formats for comprehensive learning.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 items-start rounded-xl border p-6 transition-all hover:bg-gradient-to-br hover:from-green-500/5 hover:to-emerald-500/5 hover:border-green-500/20">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-green-500/20 to-emerald-500/20 group-hover:from-green-500/30 group-hover:to-emerald-500/30 transition-colors">
                  <Bell className="h-6 w-6 text-green-700 dark:text-green-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Announcements</h3>
                  <p className="text-muted-foreground">
                    Keep everyone informed with targeted announcements and notifications.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 items-start rounded-xl border p-6 transition-all hover:bg-gradient-to-br hover:from-blue-500/5 hover:to-indigo-500/5 hover:border-blue-500/20">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 group-hover:from-blue-500/30 group-hover:to-indigo-500/30 transition-colors">
                  <Users className="h-6 w-6 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Student Management</h3>
                  <p className="text-muted-foreground">
                    Organize students by classes, track progress, and manage permissions efficiently.
                  </p>
                </div>
              </div>
              <div className="group flex flex-col gap-4 items-start rounded-xl border p-6 transition-all hover:bg-gradient-to-br hover:from-pink-500/5 hover:to-rose-500/5 hover:border-pink-500/20">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-pink-500/20 to-rose-500/20 group-hover:from-pink-500/30 group-hover:to-rose-500/30 transition-colors">
                  <BookOpen className="h-6 w-6 text-pink-700 dark:text-pink-300" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">Interactive Learning</h3>
                  <p className="text-muted-foreground">
                    Engage students with quizzes, assignments, and interactive content.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/3 right-0 h-80 w-80 translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl" />
          <div className="absolute bottom-1/3 left-0 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl" />
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300">
                <Lightbulb className="mr-1 h-3 w-3" />
                <span>How It Works</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  Simple for Staff, Seamless for Students
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pathshala is designed to make online education accessible and effective for everyone.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <div className="flex flex-col space-y-4 rounded-3xl border bg-card/50 backdrop-blur-sm p-8 shadow-xl shadow-purple-500/5 relative overflow-hidden group hover:shadow-purple-500/10 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-colors">
                    <Users className="h-7 w-7 text-purple-700 dark:text-purple-300" />
                  </div>
                  <h3 className="text-2xl font-bold">For Staff</h3>
                </div>
                <ul className="grid gap-3 relative z-10">
                  {[
                    "Upload and organize lecture videos with ease",
                    "Track attendance and student engagement",
                    "Share study materials and resources",
                    "Make announcements and send notifications",
                    "Generate reports and analytics",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-purple-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/10 relative z-10 border-0"
                  asChild
                >
                  <Link href="/staff-signup">
                    Join as Staff <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col space-y-4 rounded-3xl border bg-card/50 backdrop-blur-sm p-8 shadow-xl shadow-cyan-500/5 relative overflow-hidden group hover:shadow-cyan-500/10 transition-all">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center space-x-4 relative z-10">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors">
                    <GraduationCap className="h-7 w-7 text-cyan-700 dark:text-cyan-300" />
                  </div>
                  <h3 className="text-2xl font-bold">For Students</h3>
                </div>
                <ul className="grid gap-3 relative z-10">
                  {[
                    "Access lectures anytime, anywhere",
                    "Download study materials and resources",
                    "Receive important announcements",
                    "Track your own progress and attendance",
                    "Participate in interactive learning activities",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-cyan-500 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/10 relative z-10 border-0"
                  asChild
                >
                  <Link href="/student-signup">
                    Join as Student <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/5 to-cyan-500/5 blur-3xl -z-10" />
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted/30 -z-10" />
          <div className="container px-4 md:px-6 relative z-10">
            <div className="mx-auto max-w-3xl rounded-3xl border bg-card/50 backdrop-blur-sm p-8 md:p-12 shadow-xl shadow-purple-500/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-cyan-500/5 to-transparent" />
              <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-3xl" />
              <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl" />
              <div className="flex flex-col items-center justify-center space-y-4 text-center relative z-10">
                <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-700 dark:text-purple-300">
                  <BookMarked className="mr-1 h-3 w-3" />
                  <span>Free Forever</span>
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                    Ready to Transform Your Educational Experience?
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join thousands of educators and students already using Pathshala. Its completely free!
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    size="lg"
                    className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg shadow-purple-500/10 border-0"
                    asChild
                  >
                    <Link href="/signup">
                      Get Started Today
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full border-purple-200 dark:border-purple-800"
                    asChild
                  >
                    <Link href="/demo">Request a Demo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/3 right-0 h-80 w-80 translate-x-1/2 rounded-full bg-gradient-to-br from-purple-500/5 to-pink-500/5 blur-3xl" />
          <div className="absolute bottom-1/3 left-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/5 to-blue-500/5 blur-3xl" />
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300">
                <BarChart3 className="mr-1 h-3 w-3" />
                <span>Platform Stats</span>
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                  Growing Community of Learners
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our thriving educational ecosystem and be part of the learning revolution.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "10,000+",
                  label: "Active Students",
                  color: "from-purple-500/20 to-pink-500/20",
                  textColor: "text-purple-700 dark:text-purple-300",
                },
                {
                  number: "500+",
                  label: "Educational Institutions",
                  color: "from-cyan-500/20 to-blue-500/20",
                  textColor: "text-cyan-700 dark:text-cyan-300",
                },
                {
                  number: "5,000+",
                  label: "Video Lectures",
                  color: "from-amber-500/20 to-orange-500/20",
                  textColor: "text-amber-700 dark:text-amber-300",
                },
                {
                  number: "100%",
                  label: "Free Access",
                  color: "from-green-500/20 to-emerald-500/20",
                  textColor: "text-green-700 dark:text-green-300",
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center space-y-2 rounded-xl border p-8 bg-gradient-to-br hover:shadow-lg transition-all"
                >
                  <div
                    className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color.replace("/20", "")}`}
                  >
                    {stat.number}
                  </div>
                  <div className={`text-sm ${stat.textColor}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          {/* Decorative elements */}
          <div className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-purple-500/5 to-cyan-500/5 blur-3xl -z-10" />
        </section>
      </main>
      <footer className="w-full border-t bg-background/50 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-4 lg:w-1/3">
            <div className="flex items-center gap-2">
              <div className="rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-1">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">
                Pathshala
              </span>
            </div>
            <p className="text-muted-foreground">
              Transforming education through technology. Making learning accessible, engaging, and effective for
              everyone.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="#"
                className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Get Started
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Help Center
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Community</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Forums
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Discord
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-sm font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 lg:flex-row">
            <p className="text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Pathshala. All rights reserved.
            </p>
            <p className="text-center text-sm text-muted-foreground">
              Made with <span className="text-red-500">❤</span> in India
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
