"use client"

import { motion } from "framer-motion"

interface LoadingAnimationProps {
  size?: "sm" | "md" | "lg"
  variant?: "spinner" | "dots" | "pulse" | "bars"
}

export function LoadingAnimation({ 
  size = "md", 
  variant = "spinner" 
}: LoadingAnimationProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }

  const containerSizes = {
    sm: "w-16 h-16",
    md: "w-24 h-24",
    lg: "w-32 h-32"
  }

  if (variant === "spinner") {
    return (
      <div className={`${sizeClasses[size]} relative`}>
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-white/20 border-t-white"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    )
  }

  if (variant === "dots") {
    return (
      <div className="flex gap-1 items-center">
        {[0, 0.2, 0.4].map((delay, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-white rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  if (variant === "pulse") {
    return (
      <motion.div
        className={`${sizeClasses[size]} bg-white rounded-full`}
        animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
        transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
      />
    )
  }

  if (variant === "bars") {
    return (
      <div className="flex gap-1 items-center">
        {[0, 0.1, 0.2, 0.3].map((delay, i) => (
          <motion.div
            key={i}
            className="w-1 bg-white rounded-full"
            style={{ height: size === "sm" ? "12px" : size === "md" ? "16px" : "20px" }}
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    )
  }

  // Versión compleja para la página de auth (cuando no se especifica variant)
  return (
    <div className={`${containerSizes[size]} relative flex items-center justify-center`}>
      {/* Anillo exterior */}
      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/20 to-blue-500/20"
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Anillo giratorio */}
      <motion.div
        className="absolute inset-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500"
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ filter: "blur(4px)" }}
      />
      
      {/* Centro */}
      <div className="absolute inset-4 bg-gray-900 rounded-full flex items-center justify-center overflow-hidden">
        <div className="flex gap-1 items-center">
          {[0, 0.1, 0.2, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              className="w-1 h-6 rounded-full"
              style={{
                backgroundColor: ["#06b6d4", "#3b82f6", "#6366f1", "#a855f7"][i],
              }}
              animate={{ y: [-8, 0, -8] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
        
        {/* Efecto de destello */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-transparent via-blue-500/10 to-transparent"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Partículas de esquina */}
      {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((position, i) => (
        <motion.div
          key={i}
          className={`absolute ${position} w-2 h-2 rounded-full`}
          style={{
            backgroundColor: ["#06b6d4", "#a855f7", "#06b6d4", "#3b82f6"][i],
          }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
          }}
        />
      ))}
    </div>
  )
}