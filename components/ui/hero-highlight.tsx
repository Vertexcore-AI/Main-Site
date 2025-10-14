"use client"

import React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface HighlightProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function Highlight({ children, className, delay = 0 }: HighlightProps) {
  return (
    <motion.span
      className={cn(
        "font-bold px-2 py-1 rounded-md text-blue-400 relative inline-block",
        className,
      )}
      initial={{ backgroundSize: "0% 100%" }}
      animate={{ backgroundSize: "100% 100%" }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeInOut",
      }}
      style={{
        backgroundImage: "linear-gradient(90deg, rgba(59, 130, 246, 0.3), rgba(96, 165, 250, 0.3))",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
      }}
    >
      <motion.span
        className="absolute inset-0 bg-blue-400/10 blur-sm rounded-md -z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: delay + 0.3,
        }}
      />
      {children}
    </motion.span>
  )
}
