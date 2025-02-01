"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

const welcomeMessages = [
  "¡Bienvenido a EvenTix!", 
  "Gestiona tus eventos", 
  "Crea experiencias inolvidables"
]

export function TopBar() {
  const [welcomeIndex, setWelcomeIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomeMessages.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="top-bar">
      <header className="border-b border-purple-500/20 bg-black/40 backdrop-blur-xl px-6 py-4 flex justify-center">
        <div className="relative w-full max-w-lg min-h-[20px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={welcomeIndex}
              variants={fadeIn}
              initial="initial"
              animate="animate"
              exit="exit"
              className="absolute text-center font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent 
              text-l sm:text-2xl md:text-3xl lg:text-4xl max-w-[100%] md:max-w-[100%]"
            >
              {welcomeMessages[welcomeIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </header>
    </div>
  )
}
