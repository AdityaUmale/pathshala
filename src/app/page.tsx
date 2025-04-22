"use client"

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
import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemFadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
}

const float = {
  initial: { y: 0 },
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "loop",
      ease: "easeInOut",
    },
  },
}

function AnimateWhenVisible({ children, variants = fadeIn, className = "" }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px 0px" })

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-background ml-20">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-[40%] -right-[60%] h-[1000px] w-[1000px] rounded-full bg-gradient-to-b from-blue-500/20 to-cyan-500/5 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute -bottom-[40%] -left-[60%] h-[1000px] w-[1000px] rounded-full bg-gradient-to-t from-indigo-500/20 to-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.5, 0.6, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 2,
          }}
        />
      </div>

      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="h-6 w-6 text-white" />
            </motion.div>
            <motion.span
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              Pathshala
            </motion.span>
          </div>
          <nav className="hidden md:flex gap-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Link href="#features" className="text-sm font-medium transition-colors hover:text-blue-500">
                Features
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
              <Link href="#how-it-works" className="text-sm font-medium transition-colors hover:text-blue-500">
                How It Works
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }}>
              <Link href="#get-started" className="text-sm font-medium transition-colors hover:text-blue-500">
                Get Started
              </Link>
            </motion.div>
          </nav>
          <div className="flex items-center gap-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
              <Button variant="ghost" size="sm" className="rounded-full" asChild>
                <Link href="/login">Log In</Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 border-0"
                asChild
              >
                <Link href="/signup">Sign Up</Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden relative">
          <div className="container px-4 md:px-6 relative z-10">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <motion.div
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  <Sparkles className="mr-1 h-3 w-3" />
                  <span>Free Learning Platform</span>
                </motion.div>
                <div className="space-y-2">
                  <motion.h1
                    className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                  >
                    Transform Education with Pathshala
                  </motion.h1>
                  <motion.p
                    className="max-w-[600px] text-muted-foreground md:text-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.7 }}
                  >
                    The complete online learning platform where staff can manage content and students can access quality
                    education anytime, anywhere. Completely free for everyone.
                  </motion.p>
                </div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/20 border-0"
                      asChild
                    >
                      <Link href="/signup">
                        Get Started
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-blue-200 dark:border-blue-800"
                      asChild
                    >
                      <Link href="#features">Learn More</Link>
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex items-center space-x-4 text-sm text-muted-foreground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.7 }}
                >
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 + i * 0.1, duration: 0.5 }}
                      >
                        <div className="h-full w-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 1.2 + i * 0.1, duration: 0.3 }}
                      >
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      </motion.div>
                    ))}
                    <motion.span
                      className="ml-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.7, duration: 0.5 }}
                    >
                      Trusted by 10,000+ educators
                    </motion.span>
                  </div>
                </motion.div>
              </motion.div>
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-3xl blur-3xl -z-10 transform rotate-3"
                  animate={{
                    rotate: [3, 2, 3],
                    scale: [1, 1.02, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
               <Image
                    src="/images/hi.webp"
                    width={800}
                    height={550}
                    alt="Pathshala Platform Screenshot"
                    className="mx-auto w-full h-auto rounded-3xl object-contain sm:w-full lg:order-last shadow-2xl shadow-blue-500/10 border border-blue-500/10"
                    priority
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/2 left-0 h-40 w-40 -translate-y-1/2 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl"
            variants={float}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="absolute bottom-0 right-0 h-60 w-60 translate-y-1/2 translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
            variants={float}
            initial="initial"
            animate="animate"
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </section>

        <AnimateWhenVisible>
          <section className="container px-4 py-12 md:px-6 relative">
            <motion.div className="flex flex-wrap justify-center gap-4 md:gap-8" variants={staggerContainer}>
              {["Trusted by", "Harvard University", "Stanford", "MIT", "Oxford", "Cambridge"].map((item, i) => (
                <motion.div
                  key={i}
                  variants={itemFadeIn}
                  className={`${i === 0 ? "text-muted-foreground text-sm" : "text-foreground/70 font-semibold"} flex items-center`}
                >
                  {item}
                </motion.div>
              ))}
            </motion.div>
          </section>
        </AnimateWhenVisible>

        <section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted/30 -z-10" />
          <div className="container px-4 md:px-6 relative z-10">
            <AnimateWhenVisible>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Zap className="mr-1 h-3 w-3" />
                  <span>Features</span>
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                    Everything You Need for Online Learning
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Pathshala provides powerful tools for both educators and students to create an effective learning
                    environment.
                  </p>
                </div>
              </div>
            </AnimateWhenVisible>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-10">
              {[
                {
                  icon: Video,
                  title: "Video Lectures",
                  desc: "Upload, organize, and stream high-quality video lectures with interactive features.",
                  color: "from-blue-500/20 to-cyan-500/20",
                  hoverColor: "hover:from-blue-500/5 hover:to-cyan-500/5",
                  iconColor: "text-blue-700 dark:text-blue-300",
                  borderColor: "hover:border-blue-500/20",
                },
                {
                  icon: Calendar,
                  title: "Attendance Tracking",
                  desc: "Easily track and manage student attendance with automated reports and insights.",
                  color: "from-cyan-500/20 to-blue-500/20",
                  hoverColor: "hover:from-cyan-500/5 hover:to-blue-500/5",
                  iconColor: "text-cyan-700 dark:text-cyan-300",
                  borderColor: "hover:border-cyan-500/20",
                },
                {
                  icon: FileText,
                  title: "Study Materials",
                  desc: "Share notes, documents, and resources in various formats for comprehensive learning.",
                  color: "from-indigo-500/20 to-blue-500/20",
                  hoverColor: "hover:from-indigo-500/5 hover:to-blue-500/5",
                  iconColor: "text-indigo-700 dark:text-indigo-300",
                  borderColor: "hover:border-indigo-500/20",
                },
                {
                  icon: Bell,
                  title: "Announcements",
                  desc: "Keep everyone informed with targeted announcements and notifications.",
                  color: "from-blue-500/20 to-indigo-500/20",
                  hoverColor: "hover:from-blue-500/5 hover:to-indigo-500/5",
                  iconColor: "text-blue-700 dark:text-blue-300",
                  borderColor: "hover:border-blue-500/20",
                },
                {
                  icon: Users,
                  title: "Student Management",
                  desc: "Organize students by classes, track progress, and manage permissions efficiently.",
                  color: "from-cyan-500/20 to-blue-500/20",
                  hoverColor: "hover:from-cyan-500/5 hover:to-blue-500/5",
                  iconColor: "text-cyan-700 dark:text-cyan-300",
                  borderColor: "hover:border-cyan-500/20",
                },
                {
                  icon: BookOpen,
                  title: "Interactive Learning",
                  desc: "Engage students with quizzes, assignments, and interactive content.",
                  color: "from-indigo-500/20 to-blue-500/20",
                  hoverColor: "hover:from-indigo-500/5 hover:to-blue-500/5",
                  iconColor: "text-indigo-700 dark:text-indigo-300",
                  borderColor: "hover:border-indigo-500/20",
                },
              ].map((feature, i) => (
                <AnimateWhenVisible key={i} variants={itemFadeIn}>
                  <motion.div
                    className={`group flex flex-col gap-4 items-start rounded-xl border p-6 transition-all hover:bg-gradient-to-br ${feature.hoverColor} ${feature.borderColor}`}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <motion.div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} group-hover:${feature.color.replace("/20", "/30")} transition-colors`}
                      whileHover={{ rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
                    </motion.div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.desc}</p>
                    </div>
                  </motion.div>
                </AnimateWhenVisible>
              ))}
            </div>
          </div>
          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/3 right-0 h-80 w-80 translate-x-1/2 rounded-full bg-cyan-500/5 blur-3xl"
            variants={float}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="absolute bottom-1/3 left-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/5 blur-3xl"
            variants={float}
            initial="initial"
            animate="animate"
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <AnimateWhenVisible>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <Lightbulb className="mr-1 h-3 w-3" />
                  <span>How It Works</span>
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                    Simple for Staff, Seamless for Students
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Pathshala is designed to make online education accessible and effective for everyone.
                  </p>
                </div>
              </div>
            </AnimateWhenVisible>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <AnimateWhenVisible>
                <motion.div
                  className="flex flex-col space-y-4 rounded-3xl border bg-card/50 backdrop-blur-sm p-8 shadow-xl shadow-blue-500/5 relative overflow-hidden group hover:shadow-blue-500/10 transition-all"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-colors"
                      whileHover={{ rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Users className="h-7 w-7 text-blue-700 dark:text-blue-300" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">For Staff</h3>
                  </div>
                  <motion.ul
                    className="grid gap-3 relative z-10"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {[
                      "Upload and organize lecture videos with ease",
                      "Track attendance and student engagement",
                      "Share study materials and resources",
                      "Make announcements and send notifications",
                      "Generate reports and analytics",
                    ].map((item, i) => (
                      <motion.li key={i} className="flex items-start gap-2" variants={itemFadeIn}>
                        <CheckCircle2 className="h-5 w-5 text-blue-500 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                    <Button
                      className="mt-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/10 relative z-10 border-0"
                      asChild
                    >
                      <Link href="/staff-signup">
                        Join as Staff <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimateWhenVisible>

              <AnimateWhenVisible>
                <motion.div
                  className="flex flex-col space-y-4 rounded-3xl border bg-card/50 backdrop-blur-sm p-8 shadow-xl shadow-cyan-500/5 relative overflow-hidden group hover:shadow-cyan-500/10 transition-all"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                  />
                  <div className="flex items-center space-x-4 relative z-10">
                    <motion.div
                      className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 transition-colors"
                      whileHover={{ rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <GraduationCap className="h-7 w-7 text-cyan-700 dark:text-cyan-300" />
                    </motion.div>
                    <h3 className="text-2xl font-bold">For Students</h3>
                  </div>
                  <motion.ul
                    className="grid gap-3 relative z-10"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                  >
                    {[
                      "Access lectures anytime, anywhere",
                      "Download study materials and resources",
                      "Receive important announcements",
                      "Track your own progress and attendance",
                      "Participate in interactive learning activities",
                    ].map((item, i) => (
                      <motion.li key={i} className="flex items-start gap-2" variants={itemFadeIn}>
                        <CheckCircle2 className="h-5 w-5 text-cyan-500 mt-0.5" />
                        <span>{item}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative z-10">
                    <Button
                      className="mt-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 shadow-lg shadow-cyan-500/10 relative z-10 border-0"
                      asChild
                    >
                      <Link href="/student-signup">
                        Join as Student <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </AnimateWhenVisible>
            </div>
          </div>
          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-3xl -z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </section>

        <section id="get-started" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-muted/50 to-muted/30 -z-10" />
          <div className="container px-4 md:px-6 relative z-10">
            <AnimateWhenVisible>
              <motion.div
                className="mx-auto max-w-3xl rounded-3xl border bg-card/50 backdrop-blur-sm p-8 md:p-12 shadow-xl shadow-blue-500/10 relative overflow-hidden"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-500/5 to-transparent"
                  animate={{
                    background: [
                      "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.05), transparent)",
                      "linear-gradient(to bottom right, rgba(6, 182, 212, 0.1), rgba(59, 130, 246, 0.05), transparent)",
                      "linear-gradient(to bottom right, rgba(59, 130, 246, 0.1), rgba(6, 182, 212, 0.05), transparent)",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />
                <motion.div
                  className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-blue-500/10 to-cyan-500/10 blur-3xl"
                  variants={float}
                  initial="initial"
                  animate="animate"
                />
                <motion.div
                  className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-3xl"
                  variants={float}
                  initial="initial"
                  animate="animate"
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                    delay: 2,
                  }}
                />
                <div className="flex flex-col items-center justify-center space-y-4 text-center relative z-10">
                  <motion.div
                    className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-700 dark:text-blue-300"
                    whileHover={{ scale: 1.05 }}
                  >
                    <BookMarked className="mr-1 h-3 w-3" />
                    <span>Free Forever</span>
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                      Ready to Transform Your Educational Experience?
                    </h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                      Join thousands of educators and students already using Pathshala. It's completely free!
                    </p>
                  </div>
                  <motion.div
                    className="flex flex-col gap-2 min-[400px]:flex-row"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    <motion.div variants={itemFadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 shadow-lg shadow-blue-500/10 border-0"
                        asChild
                      >
                        <Link href="/signup">
                          Get Started Today
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </motion.div>
                    <motion.div variants={itemFadeIn} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full border-blue-200 dark:border-blue-800"
                        asChild
                      >
                        <Link href="/demo">Request a Demo</Link>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimateWhenVisible>
          </div>
          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/3 right-0 h-80 w-80 translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-3xl"
            variants={float}
            initial="initial"
            animate="animate"
          />
          <motion.div
            className="absolute bottom-1/3 left-0 h-80 w-80 -translate-x-1/2 rounded-full bg-gradient-to-br from-cyan-500/5 to-blue-500/5 blur-3xl"
            variants={float}
            initial="initial"
            animate="animate"
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="container px-4 md:px-6 relative z-10">
            <AnimateWhenVisible>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <motion.div
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-700 dark:text-cyan-300"
                  whileHover={{ scale: 1.05 }}
                >
                  <BarChart3 className="mr-1 h-3 w-3" />
                  <span>Platform Stats</span>
                </motion.div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
                    Growing Community of Learners
                  </h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Join our thriving educational ecosystem and be part of the learning revolution.
                  </p>
                </div>
              </div>
            </AnimateWhenVisible>

            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  number: "10,000+",
                  label: "Active Students",
                  color: "from-blue-500/20 to-cyan-500/20",
                  textColor: "text-blue-700 dark:text-blue-300",
                  fullColor: "from-blue-500 to-cyan-500",
                },
                {
                  number: "500+",
                  label: "Educational Institutions",
                  color: "from-cyan-500/20 to-blue-500/20",
                  textColor: "text-cyan-700 dark:text-cyan-300",
                  fullColor: "from-cyan-500 to-blue-500",
                },
                {
                  number: "5,000+",
                  label: "Video Lectures",
                  color: "from-indigo-500/20 to-blue-500/20",
                  textColor: "text-indigo-700 dark:text-indigo-300",
                  fullColor: "from-indigo-500 to-blue-500",
                },
                {
                  number: "100%",
                  label: "Free Access",
                  color: "from-blue-500/20 to-indigo-500/20",
                  textColor: "text-blue-700 dark:text-blue-300",
                  fullColor: "from-blue-500 to-indigo-500",
                },
              ].map((stat, i) => (
                <AnimateWhenVisible key={i}>
                  <motion.div
                    className="flex flex-col items-center justify-center space-y-2 rounded-xl border p-8 bg-gradient-to-br hover:shadow-lg transition-all"
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.1), 0 8px 10px -6px rgba(59, 130, 246, 0.1)",
                    }}
                  >
                    <motion.div
                      className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.fullColor}`}
                      initial={{ scale: 0.5, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 100 }}
                    >
                      {stat.number}
                    </motion.div>
                    <motion.div
                      className={`text-sm ${stat.textColor}`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                    >
                      {stat.label}
                    </motion.div>
                  </motion.div>
                </AnimateWhenVisible>
              ))}
            </div>
          </div>
          {/* Decorative elements */}
          <motion.div
            className="absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-blue-500/5 to-cyan-500/5 blur-3xl -z-10"
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.3, 0.4, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </section>
      </main>
      <footer className="w-full border-t bg-background/50 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:flex-row lg:gap-12">
          <div className="flex flex-col gap-4 lg:w-1/3">
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 p-1">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
                Pathshala
              </span>
            </motion.div>
            <motion.p
              className="text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Transforming education through technology. Making learning accessible, engaging, and effective for
              everyone.
            </motion.p>
            <motion.div
              className="flex gap-4"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {["facebook", "twitter", "instagram"].map((social, i) => (
                <motion.div key={i} variants={itemFadeIn} whileHover={{ y: -3, scale: 1.1 }}>
                  <Link
                    href="#"
                    className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                  >
                    {social === "facebook" && (
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
                    )}
                    {social === "twitter" && (
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
                    )}
                    {social === "instagram" && (
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
                    )}
                    <span className="sr-only">{social}</span>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              {
                title: "Platform",
                links: ["Features", "How It Works", "Get Started"],
              },
              {
                title: "Resources",
                links: ["Blog", "Documentation", "Help Center"],
              },
              {
                title: "Community",
                links: ["Forums", "Events", "Discord"],
              },
              {
                title: "Legal",
                links: ["Terms", "Privacy", "Cookies"],
              },
            ].map((section, i) => (
              <AnimateWhenVisible key={i}>
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">{section.title}</h4>
                  <motion.ul
                    className="space-y-2"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                  >
                    {section.links.map((link, j) => (
                      <motion.li key={j} variants={itemFadeIn}>
                        <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                          {link}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </AnimateWhenVisible>
            ))}
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:px-6 lg:flex-row">
            <motion.p
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              © {new Date().getFullYear()} Pathshala. All rights reserved.
            </motion.p>
            <motion.p
              className="text-center text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Made with <span className="text-red-500">❤</span> in India
            </motion.p>
          </div>
        </div>
      </footer>
    </div>
  )
}
