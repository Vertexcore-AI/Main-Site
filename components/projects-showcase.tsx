"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence, useInView } from "framer-motion"
import { Code, Globe, Lock, Shield, Terminal, ExternalLink, X, ChevronRight, Tag, Play } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

type Project = {
  id: string
  title: string
  description: string
  longDescription: string
  image: string
  category: "web" | "mobile" | "product" | "ai" | "platform"
  technologies: string[]
  link?: string
  achievements: string[]
  featured?: boolean
}

export function ProjectsShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [filter, setFilter] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects: Project[] = [
    {
      id: "gaming-forum",
      title: "Gaming Forum",
      description: "A comprehensive gaming community platform with user discussions, game reviews, and social features",
      longDescription:
        "Gaming Forum is a feature-rich community platform designed for gamers to connect, share experiences, and discuss their favorite games. Built with Laravel and modern web technologies, it provides a seamless user experience with real-time discussions, user profiles, game databases, and community-driven content. The platform supports multiple gaming communities with customizable forums, rating systems, and social interaction features.",
      image: "/images/Gaming-forum/games.png",
      category: "web",
      technologies: ["Laravel", "Blade Files", "TailwindCSS", "SQLite Database"],
      achievements: [
        "Built comprehensive forum system with threaded discussions and real-time updates",
        "Implemented user authentication and profile management with social features",
        "Created responsive design with TailwindCSS for optimal mobile experience",
        "Developed game database with ratings and review system",
        "Achieved fast performance with optimized SQLite database queries",
      ],
    },
    {
      id: "spillvision",
      title: "SpillVision",
      description: "AI-powered oil spill detection system using computer vision for environmental monitoring",
      longDescription:
        "SpillVision is an advanced computer vision system designed to detect and monitor oil spills in real-time. Utilizing YOLO (You Only Look Once) object detection algorithms and trained on comprehensive datasets from Roboflow, this system provides accurate and rapid identification of oil spills in various environments. The solution helps environmental agencies and organizations respond quickly to potential ecological disasters, minimizing environmental damage through early detection.",
      image: "/images/SpillVision/test-oil_spill.jpg",
      category: "web",
      technologies: ["Python", "YOLO", "Computer Vision", "Roboflow (Dataset)"],
      achievements: [
        "Developed high-accuracy oil spill detection model using YOLO algorithms",
        "Trained on comprehensive Roboflow dataset for diverse spill scenarios",
        "Implemented real-time detection with fast processing speeds",
        "Created user-friendly interface for monitoring and alerts",
        "Achieved 90%+ accuracy in oil spill identification across various conditions",
      ],
    },
    {
      id: "plant-harvest",
      title: "Plant Harvest",
      description: "Smart agriculture system using AI to detect plant maturity and optimize harvest timing",
      longDescription:
        "Plant Harvest is an intelligent agricultural solution that leverages computer vision and AI to determine optimal harvest times for crops. Using YOLO-based object detection trained on agricultural datasets from Roboflow, the system analyzes plant images to assess maturity levels, detect diseases, and provide harvest recommendations. This technology helps farmers maximize crop yield, reduce waste, and improve overall agricultural efficiency through data-driven decision making.",
      image: "/images/Plant-harvest/harvest.jpg",
      category: "web",
      technologies: ["Python", "YOLO", "Computer Vision", "Roboflow (Dataset)"],
      achievements: [
        "Built AI model for accurate plant maturity detection and classification",
        "Trained on specialized agricultural dataset from Roboflow",
        "Implemented disease detection to prevent crop loss",
        "Created harvest optimization recommendations based on AI analysis",
        "Achieved 85%+ accuracy in maturity assessment across multiple crop types",
      ],
    },
    {
      id: "restaurant-system",
      title: "Restaurant System",
      description: "Complete restaurant management solution with ordering, inventory, analytics, and AI chatbot support",
      longDescription:
        "Restaurant System is a comprehensive management platform designed to streamline all aspects of restaurant operations. Built with Laravel and enhanced with Python analytics, this system handles order management, inventory tracking, staff scheduling, and customer relationship management. The integrated AI chatbot, trained using Chatbase.co, provides 24/7 customer support for reservations, menu inquiries, and order assistance. Advanced analytics help restaurant owners make data-driven decisions to optimize operations and increase profitability.",
      image: "/images/Restaurent/foodix.png",
      category: "web",
      technologies: ["Laravel", "Blade Files", "MySQL Database", "Python (Analytics)", "Chatbase.co (Chatbot Training)"],
      achievements: [
        "Developed complete restaurant management system with order and inventory tracking",
        "Implemented Python-based analytics for sales insights and trend analysis",
        "Integrated AI chatbot trained on Chatbase.co for customer service automation",
        "Built real-time order management with kitchen display system",
        "Created comprehensive reporting dashboard for business intelligence",
      ],
    },
    {
      id: "pos-supermarket",
      title: "POS Supermarket System",
      description: "Advanced point-of-sale system for supermarkets with real-time inventory and sales management",
      longDescription:
        "POS Supermarket System is a robust point-of-sale solution designed specifically for supermarket operations. Built with Laravel and Livewire for dynamic, real-time interactions, this system provides seamless checkout experiences, inventory management, supplier tracking, and sales analytics. The integration of Python enables advanced data analysis and reporting. Features include barcode scanning, multi-payment options, employee management, and real-time stock updates to ensure efficient supermarket operations.",
      image: "/images/POS-supermarket/pos.png",
      category: "web",
      technologies: ["Laravel", "Blade Files", "Livewire", "Python", "MySQL Database"],
      achievements: [
        "Built comprehensive POS system with real-time inventory synchronization",
        "Implemented Livewire for dynamic, reactive user interface without page reloads",
        "Developed Python analytics engine for sales forecasting and insights",
        "Created multi-user system with role-based access control",
        "Achieved fast transaction processing with optimized database queries",
      ],
    },
    {
      id: "villa-booking",
      title: "Villa Booking System",
      description: "Luxury villa reservation platform with booking management, analytics, and AI customer support",
      longDescription:
        "Villa Booking System is a sophisticated reservation platform designed for luxury villa rentals and property management. The system features comprehensive booking management, availability calendars, payment processing, and customer relationship tools. Python-powered analytics provide insights into booking patterns, revenue optimization, and customer preferences. An AI chatbot trained using Chatbase.co handles customer inquiries, booking assistance, and property information 24/7, enhancing customer experience and reducing manual support workload.",
      image: "/images/Villa-Booking/villa_booking.png",
      category: "web",
      technologies: ["Laravel", "Blade Files", "MySQL Database", "Python (Analytics)", "Chatbase.co (Chatbot Training)"],
      achievements: [
        "Developed complete booking management system with calendar integration",
        "Implemented secure payment processing and booking confirmation workflows",
        "Built Python analytics dashboard for revenue and occupancy insights",
        "Integrated AI chatbot for automated customer support and booking assistance",
        "Created property management tools for owners and administrators",
      ],
    },
  ]

  const filteredProjects = filter ? projects.filter((project) => project.category === filter) : projects

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Globe className="w-5 h-5" />
      case "mobile":
        return <Terminal className="w-5 h-5" />
      case "product":
        return <Code className="w-5 h-5" />
      case "ai":
        return <Shield className="w-5 h-5" />
      case "platform":
        return <Lock className="w-5 h-5" />
      default:
        return <Code className="w-5 h-5" />
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "web":
        return "Web Application"
      case "mobile":
        return "Mobile App"
      case "product":
        return "Physical Product"
      case "ai":
        return "AI Platform"
      case "platform":
        return "Digital Platform"
      default:
        return category
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "web":
        return "from-blue-500 to-cyan-500"
      case "mobile":
        return "from-purple-500 to-pink-500"
      case "product":
        return "from-orange-500 to-red-500"
      case "ai":
        return "from-green-500 to-emerald-500"
      case "platform":
        return "from-indigo-500 to-purple-500"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="space-y-12"
        >
          <motion.div variants={itemVariants} className="text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-bold text-primary">Featured Projects</h2>
            <div className="h-px w-24 bg-primary/50 mx-auto"></div>
            <p className="text-foreground leading-relaxed max-w-4xl mx-auto text-lg">
              Showcasing our most impactful projects across web development, mobile applications, AI platforms, and
              physical products. Each project represents innovation, technical excellence, and measurable business
              results.
            </p>
          </motion.div>

          {/* Filter tabs */}
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setFilter(null)}
              className={`px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-medium ${
                filter === null
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Lock className="w-4 h-4" />
              All Projects
            </button>
            <button
              onClick={() => setFilter("ai")}
              className={`px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-medium ${
                filter === "ai"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Shield className="w-4 h-4" />
              AI Platforms
            </button>
            <button
              onClick={() => setFilter("web")}
              className={`px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-medium ${
                filter === "web"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Globe className="w-4 h-4" />
              Web Apps
            </button>
            <button
              onClick={() => setFilter("mobile")}
              className={`px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-medium ${
                filter === "mobile"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Terminal className="w-4 h-4" />
              Mobile Apps
            </button>
            <button
              onClick={() => setFilter("product")}
              className={`px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-medium ${
                filter === "product"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Code className="w-4 h-4" />
              Products
            </button>
            <button
              onClick={() => setFilter("platform")}
              className={`px-6 py-3 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-medium ${
                filter === "platform"
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-muted/30 text-muted-foreground border border-border hover:bg-muted/50 hover:text-foreground"
              }`}
            >
              <Lock className="w-4 h-4" />
              Platforms
            </button>
          </motion.div>

          {/* Projects grid */}
          <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="group relative rounded-xl border border-border bg-background/50 overflow-hidden hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/20"
                >
                  {/* Featured badge */}
                  {project.featured && (
                    <div className="absolute top-4 left-4 z-20">
                      <Badge className="bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold">
                        Featured
                      </Badge>
                    </div>
                  )}

                  {/* Project image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(project.category)} opacity-20`}
                    ></div>

                    {/* Play button for video demos */}
                    {project.link && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-gray-900 ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold group-hover:text-primary transition-colors duration-300 text-primary">
                        {project.title}
                      </h3>
                      <Badge variant="outline" className="text-xs bg-background/50">
                        {getCategoryName(project.category)}
                      </Badge>
                    </div>

                    <p className="text-foreground text-sm leading-relaxed">{project.description}</p>

                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 3).map((tech, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground border border-border">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedProject(project)}
                      className="mt-4 w-full flex items-center justify-center px-4 py-3 rounded-lg border border-border bg-background/30 text-primary hover:bg-primary/10 transition-all duration-300 text-sm group font-medium"
                    >
                      <span>View Project Details</span>
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Project details modal */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="sm:max-w-4xl bg-background/95 border border-border text-foreground max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle className="text-3xl flex items-center gap-3 text-primary">
                {selectedProject?.title}
                <Badge variant="outline" className="text-sm">
                  {selectedProject && getCategoryName(selectedProject.category)}
                </Badge>
              </DialogTitle>
              <button
                onClick={() => setSelectedProject(null)}
                className="rounded-full p-2 hover:bg-muted/50 transition-colors"
              >
                <X className="w-6 h-6 text-muted-foreground" />
              </button>
            </div>
          </DialogHeader>

          {selectedProject && (
            <div className="space-y-8">
              {/* Project image */}
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img
                  src={selectedProject.image || "/placeholder.svg"}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${getCategoryColor(selectedProject.category)} opacity-20`}
                ></div>
              </div>

              {/* Description */}
              <DialogDescription className="text-foreground text-lg leading-relaxed">
                {selectedProject.longDescription}
              </DialogDescription>

              {/* Technologies */}
              <div>
                <h4 className="text-xl font-semibold mb-4 text-primary">Technologies Used</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-4 py-2 rounded-full text-sm bg-muted text-muted-foreground border border-border"
                    >
                      <Tag className="w-4 h-4 mr-2" />
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key achievements */}
              <div>
                <h4 className="text-xl font-semibold mb-4 text-primary">Key Achievements</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedProject.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-muted/20 border border-border">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                      <span className="text-foreground text-sm leading-relaxed">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-4 pt-4">
                {selectedProject.link && (
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    View Live Project
                  </a>
                )}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 border border-border rounded-lg hover:bg-muted/50 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
