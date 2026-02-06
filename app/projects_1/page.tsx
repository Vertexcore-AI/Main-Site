"use client";

import { useState, useEffect, useRef } from "react";
import { NavBar } from "@/components/nav-bar";
import { Footer } from "@/components/footer";
import {
  Search,
  ExternalLink,
  Star,
  Globe,
  Smartphone,
  Package,
  Palette,
  Monitor,
  Maximize2,
  Minimize2,
  CheckCircle,
  Shield,
  Heart,
  ThumbsDown,
  FolderOpen,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Database,
  Code2,
  Eye,
  Sparkles,
  Server,
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [projectLikes, setProjectLikes] = useState<{
    [key: string]: { liked: boolean; disliked: boolean };
  }>({});
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);

  const filters = [
    { id: "all", label: "All Projects", count: 4 },
    { id: "web", label: "Web Development", count: 4 },
  ];

  const projects = [
    {
      id: "perk",
      name: "PERK",
      client: "Perk Enterprises (Pvt) Ltd.",
      category: "web",
      status: "completed",
      budget: "$85K",
      timeline: "4 months",
      completion: 100,
      rating: 5,
      description:
        "Modern POS & Inventory Management System purpose-built for auto parts manufacturers and distributors with AI-powered invoice processing",
      image: "/images/Perk/logo.jpg",
      logo: "/images/Perk/logo.jpg",
      tags: [
        "POS System",
        "Inventory Management",
        "AI/OCR",
        "Auto Parts",
        "Laravel",
      ],
      metrics: {
        timeSaved: "2-3 hrs/day",
        errorReduction: "95%",
      },
      featured: true,
      previewUrl: "",
      hasLivePreview: true,
      isImage: true,
      screenshots: [
        "/images/Perk/SS_1.PNG",
        "/images/Perk/SS_2.PNG",
        "/images/Perk/SS_3.PNG",
      ],
      details: {
        overview:
          "PERK is a modern Point of Sale and Inventory Management System specifically designed for the auto parts industry. Built on cutting-edge technology, it combines powerful inventory control, intelligent sales processing, and AI-powered document processing to streamline operations and maximize profitability.",
        features: [
          "Advanced POS with lightning-fast item search across thousands of SKUs",
          "Intelligent FIFO batch allocation ",
          "AI-Powered PDF Invoice Processing For GRN Invoces",

          "Excel/CSV import with intelligent column mapping For GRN Invoces",

          "Batch & serial number tracking with full traceability",

          "Dashboard analytics with real-time sales & profit summary",
        ],
        technologies: ["Laravel", "MySQL", "Python", "OpenCv", "Gemini 3.0"],
      },
    },
    {
      id: "pos-supermarket",
      name: "POS Supermarket",
      client: "H-Mart Supermarkets",
      category: "web",
      status: "in-progress",
      budget: "$120K",
      timeline: "Ongoing",
      completion: 85,
      rating: 5,
      description:
        "Enterprise-grade POS & Management System featuring advanced AI-powered OCR for automated invoice processing and full double-entry accounting.",
      image: "/images/POS-supermarket/h_mart.png",
      logo: "/images/POS-supermarket/h_mart.png",
      tags: ["POS System", "AI/OCR", "Accounting", "Payroll", "Laravel"],
      metrics: {
        timeSaved: "4-5 hrs/day",
        errorReduction: "98%",
      },
      featured: true,
      previewUrl: "",
      hasLivePreview: true,
      isImage: true,
      screenshots: [
        "/images/POS-supermarket/SS_1.PNG",
        "/images/POS-supermarket/SS_2.PNG",
        "/images/POS-supermarket/SS_3.PNG",
      ],
      details: {
        overview:
          "A comprehensive Supermarket POS and ERP solution that revolutionizes retail operations. It integrates Point of Sale, Inventory, Accounting, and Payroll into a single unified platform. The standout feature is the AI-driven Optical Character Recognition (OCR) engine that automatically digitizes and processes supplier invoices (GRNs), eliminating manual data entry errors.",
        features: [
          "AI-Powered OCR for GRN Invoices",
          "FIFO Inventory Management with Batch Tracking",
          "Cashier Fraud Detection & Demand Forecasting Using Advanced Machine Learning",
          "Smart Loyalty Program with Dynamic Tiers",
          "Complete Double-Entry Accounting System",
          "Integrated Payroll Processing with EPF/ETF Compliance",
          "Real-time Analytics Dashboard & Financial Reporting",
        ],
        technologies: ["Laravel", "MySQL", "Python", "OpenCv", "Gemini 3.0"],
      },
    },
    {
      id: "oceans-unmined",
      name: "Oceans Unmined",
      client: "oceansunmined.org",
      category: "web",
      status: "completed",
      budget: "$75K",
      timeline: "3 months",
      completion: 100,
      rating: 5,
      description:
        "Mission-driven digital initiative focused on raising awareness about deep-sea ecosystems, ocean conservation, and environmental risks of deep-sea mining.",
      image: "/images/Oceans-Unmined/ocean unmined-logo.jpeg",
      logo: "/images/Oceans-Unmined/ocean unmined-logo.jpeg",
      tags: [
        "Ocean Conservation",
        "Education",
        "Storytelling",
        "Laravel",
        "Next.js",
      ],
      metrics: {
        timeSaved: "100%",
        errorReduction: "20+",
      },
      metricLabels: {
        timeSaved: "Dynamic Content Updates",
        errorReduction: "Interactive Storytelling",
      },
      featured: true,
      previewUrl: "",
      hasLivePreview: true,
      isImage: true,
      screenshots: [
        "/images/Oceans-Unmined/image1.png",
        "/images/Oceans-Unmined/image2.png",
        "/images/Oceans-Unmined/image3.png",
        "/images/Oceans-Unmined/image4.png",
        "/images/Oceans-Unmined/image5.png",
      ],
      details: {
        overview:
          "Oceans Unmined is a mission-driven digital initiative focused on raising awareness about deep-sea ecosystems, ocean conservation, and the environmental risks associated with deep-sea mining. The platform brings together science, art, and storytelling to educate global audiences and empower communities with knowledge about the largely unexplored deep ocean. The website is designed with a strong emphasis on clarity, accessibility, and visual storytelling. A modern, responsive interface ensures that educational content, research narratives, and advocacy efforts are presented in an engaging and easy-to-navigate experience across all devices.",
        features: [
          "Smooth Animations & Micro-Interactions for enhanced storytelling",
          "Modern, Responsive Design optimized for all devices",
          "Storytelling-First UX for complex environmental topics",
          "Performance-Optimized Frontend with fast load times",
          "Dynamic Content Management for real-time updates",
          "Accessibility-Focused UI with inclusive design",
          "Scalable Architecture for future expansion",
        ],
        technologies: ["Laravel", "Next.js", "MySQL"],
      },
    },
    {
      id: "agrisense",
      name: "AgriSense",
      client: "Ceylon Breeze International",
      category: "web",
      status: "in-progress",
      budget: "$95K",
      timeline: "Ongoing",
      completion: 65,
      rating: 5,
      description:
        "IoT-based agriculture management system featuring real-time sensor monitoring, automated actuator control, and advanced climate management.",
      image: "/images/IOT-images/iot_home.png",
      logo: "/images/IOT-images/iot_logo.png",
      tags: ["IoT", "Agriculture", "MQTT", "Laravel", "Automation"],
      metrics: {
        timeSaved: "3-4 hrs/day",
        errorReduction: "92%",
      },
      featured: true,
      previewUrl: "",
      hasLivePreview: true,
      isImage: true,
      screenshots: [
        "/images/IOT-images/iot_home.png",
        "/images/IOT-images/iot_dashboard.png",
        "/images/IOT-images/iot_sensors.png",
        "/images/IOT-images/iot_actuators.png",
        "/images/IOT-images/iot_actuators.png",
      ],
      details: {
        overview:
          "AgriSense is a cutting-edge IoT-based agriculture management system designed to optimize farming operations. It provides real-time monitoring of environmental conditions and automated control over agricultural equipment to ensure optimal crop growth and resource efficiency through the MQTT protocol.",
        features: [
          "Real-time Sensor Monitoring (Temperature, Humidity, Soil Moisture)",
          "Automated Actuator Control for Irrigation and Ventilation",
          "Intelligent Temperature & Climate Control Systems",
          "Advanced MQTT Protocol for Low-Latency Communication",
          "Analytics Dashboard for Sensor History and Trends",
          "Remote Access and Manual Override Controls",
          "Configurable Alerts and Automated Schedules",
        ],
        technologies: ["Laravel", "MySQL", "MQTT Protocol"],
      },
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === "all" || project.category === selectedFilter;

    return matchesSearch && matchesFilter;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "web":
        return <Globe className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "product":
        return <Package className="w-4 h-4" />;
      case "branding":
        return <Palette className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-400 bg-green-400/10 border-green-400/20";
      case "in-progress":
        return "text-blue-400 bg-blue-400/10 border-blue-400/20";
      case "planning":
        return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
      default:
        return "text-gray-400 bg-gray-400/10 border-gray-400/20";
    }
  };

  const getTechnologyIcon = (tech: string) => {
    const techLower = tech.toLowerCase();

    if (techLower.includes("laravel")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg";
    }
    if (techLower.includes("php")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg";
    }
    if (techLower.includes("mysql")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg";
    }
    if (techLower.includes("python")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg";
    }
    if (techLower.includes("opencv")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg";
    }
    if (techLower.includes("gemini") || techLower.includes("ai")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/google/google-original.svg";
    }
    if (techLower.includes("ocr")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/opencv/opencv-original.svg";
    }
    if (techLower.includes("react")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg";
    }
    if (techLower.includes("node")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg";
    }
    if (techLower.includes("javascript") || techLower.includes("js")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg";
    }
    if (techLower.includes("typescript") || techLower.includes("ts")) {
      return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg";
    }

    // Default fallback
    return "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/devicon/devicon-original.svg";
  };

  const handleLike = (projectId: string) => {
    setProjectLikes((prev) => ({
      ...prev,
      [projectId]: {
        liked: !prev[projectId]?.liked,
        disliked: false,
      },
    }));
    console.log(`Liked project: ${projectId}`);
  };

  const handleDislike = (projectId: string) => {
    setProjectLikes((prev) => ({
      ...prev,
      [projectId]: {
        liked: false,
        disliked: !prev[projectId]?.disliked,
      },
    }));
    console.log(`Disliked project: ${projectId}`);
  };

  // Mobile view detection - use state to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);

  // Typing animation state
  const [displayText, setDisplayText] = useState("");
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const typingPhrases = [
    { text: "innovative solutions", color: "text-blue-400" },
    { text: "digital excellence", color: "text-cyan-400" },
    { text: "business growth", color: "text-sky-400" },
  ];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Typing animation effect
  useEffect(() => {
    const currentPhrase = typingPhrases[currentPhraseIndex].text;
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const pauseTime = 2000;

    if (!isDeleting && currentCharIndex < currentPhrase.length) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, currentCharIndex + 1));
        setCurrentCharIndex(currentCharIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timeout);
    } else if (!isDeleting && currentCharIndex === currentPhrase.length) {
      const timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseTime);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentCharIndex > 0) {
      const timeout = setTimeout(() => {
        setDisplayText(currentPhrase.substring(0, currentCharIndex - 1));
        setCurrentCharIndex(currentCharIndex - 1);
      }, deletingSpeed);
      return () => clearTimeout(timeout);
    } else if (isDeleting && currentCharIndex === 0) {
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % typingPhrases.length);
    }
  }, [currentCharIndex, isDeleting, currentPhraseIndex]);

  // Set first project as default selected
  useEffect(() => {
    if (!selectedProject && filteredProjects.length > 0) {
      setSelectedProject(filteredProjects[0]);
    }
  }, [filteredProjects, selectedProject]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen overflow-y-auto snap-y snap-mandatory bg-black text-white flex flex-col"
    >
      <NavBar />

      {/* Hero Section */}
      <section className="h-screen snap-start snap-always flex flex-col items-center justify-center bg-black relative px-4 sm:px-6 shrink-0">
        <div className="max-w-7xl mx-auto text-center z-10">
          <motion.h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-white">Our </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
              Projects
            </span>
          </motion.h1>

          <motion.div
            className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span>Delivering </span>
            <span
              className={`${typingPhrases[currentPhraseIndex].color} font-semibold`}
            >
              {displayText}
            </span>
            <motion.span
              className="inline-block w-0.5 h-5 bg-blue-400 ml-1 align-middle"
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span> For Forward-thinking Businesses</span>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 1, duration: 1.5, repeat: Infinity }}
          onClick={() => {
            if (containerRef.current) {
              containerRef.current.scrollTo({
                top: window.innerHeight,
                behavior: "smooth",
              });
            }
          }}
        >
          <ChevronDown className="w-8 h-8 text-gray-400 hover:text-white transition-colors" />
        </motion.div>
      </section>

      {/* Mobile Layout */}
      {isMobile ? (
        <div className="min-h-screen snap-start snap-always flex-1 pt-24">
          <div className="p-4">
            {/* Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-950 border border-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-gray-400 text-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`px-3 py-1 text-xs rounded transition-all ${
                    selectedFilter === filter.id
                      ? "bg-primary/20 text-primary border border-primary/50"
                      : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                  }`}
                >
                  {filter.label} ({filter.count})
                </button>
              ))}
            </div>

            {/* Mobile Project List - Scrollable */}
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-black border border-white/20 rounded-lg overflow-hidden"
                >
                  {/* Project Header */}
                  <div className="p-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={project.logo || "/placeholder.svg"}
                        alt={project.name}
                        className="w-16 h-16 object-contain bg-gray-800/50 rounded-lg p-2"
                      />
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-white">
                          {project.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {project.client}
                        </p>
                        <div className="flex items-center space-x-2 mt-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              project.status,
                            )}`}
                          >
                            {project.status === "in-progress"
                              ? "In Progress"
                              : "Completed"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 text-sm mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Project Preview */}
                  <div className="bg-gray-900">
                    {project.hasLivePreview ? (
                      project.isImage && project.screenshots ? (
                        <div className="w-full h-80 flex items-center justify-center bg-gray-900 relative overflow-hidden">
                          <img
                            src={project.screenshots[currentScreenshotIndex]}
                            alt={`${project.name} Screenshot ${currentScreenshotIndex + 1}`}
                            className="w-full h-full object-contain"
                          />

                          {/* Navigation Buttons */}
                          {project.screenshots.length > 1 && (
                            <>
                              <button
                                onClick={() =>
                                  setCurrentScreenshotIndex((prev) =>
                                    prev === 0
                                      ? project.screenshots.length - 1
                                      : prev - 1,
                                  )
                                }
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                              >
                                <ChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() =>
                                  setCurrentScreenshotIndex((prev) =>
                                    prev === project.screenshots.length - 1
                                      ? 0
                                      : prev + 1,
                                  )
                                }
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                              >
                                <ChevronRight className="w-4 h-4" />
                              </button>

                              {/* Indicator Dots */}
                              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {project.screenshots.map(
                                  (_: any, index: number) => (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        setCurrentScreenshotIndex(index)
                                      }
                                      className={`w-2 h-2 rounded-full transition-all ${
                                        index === currentScreenshotIndex
                                          ? "bg-white w-6"
                                          : "bg-white/50 hover:bg-white/70"
                                      }`}
                                    />
                                  ),
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <iframe
                          src={project.previewUrl}
                          className="w-full h-64 border-0"
                          title={`${project.name} Preview`}
                        />
                      )
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-gray-900 text-white">
                        <div className="text-center">
                          <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-400">Private Project</p>
                          <p className="text-sm text-gray-500">
                            Preview not available
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="p-4 space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Key Features
                      </h3>
                      <div className="space-y-2">
                        {project.details.features
                          .slice(0, 3)
                          .map((feature: string, featureIndex: number) => (
                            <div
                              key={featureIndex}
                              className="flex items-center text-gray-300 text-sm"
                            >
                              <CheckCircle className="w-3 h-3 text-green-400 mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {project.details.technologies
                          .slice(0, 4)
                          .map((tech: string, techIndex: number) => (
                            <span
                              key={techIndex}
                              className="px-2 py-1 bg-primary/20 text-primary rounded text-xs border border-primary/30"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-blue-400">
                          {project.metrics.timeSaved}
                        </div>
                        <div className="text-xs text-gray-400">
                          {project.metricLabels?.timeSaved || "Time Saved"}
                        </div>
                      </div>
                      <div className="bg-gray-950 border border-gray-800 rounded-lg p-2 text-center">
                        <div className="text-sm font-bold text-purple-400">
                          {project.metrics.errorReduction}
                        </div>
                        <div className="text-xs text-gray-400">
                          {project.metricLabels?.errorReduction ||
                            "Error Reduction"}
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2 pt-2">
                      {project.hasLivePreview ? (
                        <Button
                          onClick={() =>
                            window.open(project.previewUrl, "_blank")
                          }
                          size="sm"
                          className="flex-1 bg-primary/20 text-primary hover:bg-primary/30"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Site
                        </Button>
                      ) : (
                        <Button
                          disabled
                          size="sm"
                          variant="outline"
                          className="flex-1 border-gray-600 text-gray-500"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Private
                        </Button>
                      )}
                      <Button
                        onClick={() => handleLike(project.id)}
                        size="sm"
                        variant="outline"
                        className={`border-gray-600 ${
                          projectLikes[project.id]?.liked
                            ? "bg-red-500 text-white"
                            : "text-gray-400"
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button
                        onClick={() => handleDislike(project.id)}
                        size="sm"
                        variant="outline"
                        className={`border-gray-600 ${
                          projectLikes[project.id]?.disliked
                            ? "bg-gray-700 text-white"
                            : "text-gray-400"
                        }`}
                      >
                        <ThumbsDown className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Desktop Layout */
        <div className="min-h-screen snap-start snap-always flex flex-1 pt-24">
          {/* Left Sidebar - Projects List */}
          <div
            className={`${sidebarCollapsed ? "w-16" : "w-1/3"} border-r border-gray-800 bg-black transition-all duration-300 relative overflow-y-auto`}
          >
            <div className={`p-4 ${sidebarCollapsed ? "px-2" : ""}`}>
              {/* Filters - Hidden when collapsed */}
              {!sidebarCollapsed && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {filters.map((filter) => (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`px-2 py-1 text-xs rounded transition-all ${
                        selectedFilter === filter.id
                          ? "bg-primary/20 text-primary border border-primary/50"
                          : "bg-gray-950 text-gray-400 border border-gray-800 hover:text-white hover:border-primary/30"
                      }`}
                    >
                      {filter.label} ({filter.count})
                    </button>
                  ))}
                </div>
              )}

              {/* Projects List */}
              <div className={`space-y-3 ${sidebarCollapsed ? "pt-8" : ""}`}>
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className={`cursor-pointer rounded-lg border transition-all duration-300 ${
                      selectedProject?.id === project.id
                        ? "bg-black border-white/30 shadow-lg"
                        : "bg-black border-white/10 hover:border-white/20 hover:shadow-md"
                    }`}
                    title={sidebarCollapsed ? project.name : undefined}
                  >
                    <div className={sidebarCollapsed ? "p-2" : "p-3"}>
                      {sidebarCollapsed ? (
                        /* Collapsed view - only show logo */
                        <img
                          src={project.logo || "/placeholder.svg"}
                          alt={project.name}
                          className="max-w-10 max-h-10 w-auto h-auto object-contain bg-gray-800 rounded p-1 mx-auto"
                        />
                      ) : (
                        /* Expanded view - full content */
                        <div className="flex items-start space-x-2">
                          <img
                            src={project.logo || "/placeholder.svg"}
                            alt={project.name}
                            className="max-w-12 max-h-10 w-auto h-auto object-contain bg-gray-800 rounded p-1 flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-white truncate text-sm">
                                {project.name}
                              </h3>
                              {project.featured && (
                                <span className="px-1 py-0.5 bg-primary text-black rounded text-xs font-medium">
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-gray-400 mb-1">
                              {project.client}
                            </p>
                            <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                              {project.description}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                {getCategoryIcon(project.category)}
                                <span className="text-xs text-gray-400">
                                  {project.category}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                {[...Array(project.rating)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-2.5 h-2.5 text-yellow-500 fill-current"
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Content - Project Details & Preview */}
          <div className="flex-1 flex flex-col bg-black relative overflow-y-auto">
            {selectedProject ? (
              <>
                {/* Project Header */}
                <div className="border-b border-gray-800 p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <img
                        src={selectedProject.logo || "/placeholder.svg"}
                        alt={selectedProject.name}
                        className="max-w-32 max-h-20 w-auto h-auto object-contain bg-gray-800/50 rounded-xl p-2 border border-gray-700"
                      />
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2">
                          {selectedProject.name}
                        </h2>
                        <p className="text-lg text-gray-400 mb-3">
                          {selectedProject.client}
                        </p>
                        <div className="flex items-center space-x-4">
                          <span
                            className={`px-4 py-2 rounded-full text-sm font-medium border ${getStatusColor(
                              selectedProject.status,
                            )}`}
                          >
                            {selectedProject.status === "in-progress"
                              ? "In Progress"
                              : "Completed"}
                          </span>
                          <span className="text-sm text-gray-400">
                            {selectedProject.timeline}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Commented out toggle expand button and visit site button */}
                    {/* <div className="flex items-center space-x-3">
                      <Button
                        onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                        size="sm"
                        variant="outline"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800"
                      >
                        {sidebarCollapsed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                      </Button>
                      {selectedProject.hasLivePreview ? (
                        <Button
                          onClick={() => window.open(selectedProject.previewUrl, "_blank")}
                          size="sm"
                          className="bg-primary/20 text-primary hover:bg-primary/30"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Visit Site
                        </Button>
                      ) : (
                        <Button
                          disabled
                          size="sm"
                          variant="outline"
                          className="border-gray-600 text-gray-500 cursor-not-allowed"
                        >
                          <Shield className="w-4 h-4 mr-2" />
                          Private Project
                        </Button>
                      )}
                    </div> */}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col overflow-y-auto">
                  {/* Project Preview - Full Width Landscape */}
                  <div className="w-full h-[60vh] bg-white shrink-0">
                    {selectedProject.hasLivePreview ? (
                      selectedProject.isImage && selectedProject.screenshots ? (
                        <div className="w-full h-full flex items-center justify-center bg-white relative overflow-hidden">
                          <img
                            src={
                              selectedProject.screenshots[
                                currentScreenshotIndex
                              ]
                            }
                            alt={`${selectedProject.name} Screenshot ${currentScreenshotIndex + 1}`}
                            className="w-full h-full object-contain"
                          />

                          {/* Navigation Buttons */}
                          {selectedProject.screenshots.length > 1 && (
                            <>
                              <button
                                onClick={() =>
                                  setCurrentScreenshotIndex((prev) =>
                                    prev === 0
                                      ? selectedProject.screenshots.length - 1
                                      : prev - 1,
                                  )
                                }
                                className="absolute left-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                              >
                                <ChevronLeft className="w-6 h-6" />
                              </button>
                              <button
                                onClick={() =>
                                  setCurrentScreenshotIndex((prev) =>
                                    prev ===
                                    selectedProject.screenshots.length - 1
                                      ? 0
                                      : prev + 1,
                                  )
                                }
                                className="absolute right-6 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                              >
                                <ChevronRight className="w-6 h-6" />
                              </button>

                              {/* Indicator Dots */}
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                                {selectedProject.screenshots.map(
                                  (_: any, index: number) => (
                                    <button
                                      key={index}
                                      onClick={() =>
                                        setCurrentScreenshotIndex(index)
                                      }
                                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                                        index === currentScreenshotIndex
                                          ? "bg-white w-8"
                                          : "bg-white/50 hover:bg-white/70"
                                      }`}
                                    />
                                  ),
                                )}
                              </div>

                              {/* Screenshot Counter */}
                              <div className="absolute top-6 right-6 bg-black/50 text-white px-3 py-1.5 rounded-full text-sm">
                                {currentScreenshotIndex + 1} /{" "}
                                {selectedProject.screenshots.length}
                              </div>
                            </>
                          )}
                        </div>
                      ) : (
                        <iframe
                          src={selectedProject.previewUrl}
                          className="w-full h-full border-0"
                          title={`${selectedProject.name} Preview`}
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 text-white">
                        <div className="text-center">
                          <Shield className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                          <h3 className="text-2xl font-semibold text-white mb-4">
                            Private Project
                          </h3>
                          <p className="text-gray-400 max-w-md">
                            This project contains confidential client
                            information and cannot be previewed publicly.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Project Details - Below Preview */}
                  <div className="bg-black border-t border-gray-800">
                    <div className="p-6 max-w-7xl mx-auto">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Overview */}
                        <div className="lg:col-span-2">
                          <h3 className="text-xl font-semibold text-white mb-4">
                            Overview
                          </h3>
                          <p className="text-gray-300 leading-relaxed">
                            {selectedProject.details.overview}
                          </p>
                        </div>

                        {/* Metrics */}
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">
                            Project Metrics
                          </h3>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">
                                  {selectedProject.metricLabels?.timeSaved ||
                                    "Daily Time Saved"}
                                </span>
                                <span className="text-blue-400 font-semibold">
                                  {selectedProject.metrics.timeSaved}
                                </span>
                              </div>
                            </div>
                            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
                              <div className="flex items-center justify-between">
                                <span className="text-gray-400">
                                  {selectedProject.metricLabels
                                    ?.errorReduction || "Error Reduction"}
                                </span>
                                <span className="text-purple-400 font-semibold">
                                  {selectedProject.metrics.errorReduction}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Key Features */}
                        <div className="lg:col-span-2">
                          <h3 className="text-xl font-semibold text-white mb-4">
                            Key Features
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {selectedProject.details.features.map(
                              (feature: string, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center text-gray-300"
                                >
                                  <CheckCircle className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                                  {feature}
                                </div>
                              ),
                            )}
                          </div>
                        </div>

                        {/* Technologies */}
                        <div>
                          <h3 className="text-xl font-semibold text-white mb-4">
                            Technologies
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedProject.details.technologies.map(
                              (tech: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-3 py-1.5 bg-primary/20 text-primary rounded-full text-sm border border-primary/30 flex items-center gap-1.5"
                                >
                                  <img
                                    src={getTechnologyIcon(tech)}
                                    alt={tech}
                                    className="w-4 h-4"
                                  />
                                  {tech}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Monitor className="w-24 h-24 text-gray-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    Select a Project
                  </h3>
                  <p className="text-gray-400">
                    Choose a project from the list to view details and preview
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
