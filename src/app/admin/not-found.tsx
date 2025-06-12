// src/app/not-found.tsx
"use client"

import { motion } from "framer-motion"
import { Home, Search, ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useState } from "react"

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("")

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -20, 0],
        opacity: [0.3, 1, 0.3],
        scale: [1, 1.2, 1],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    />
  ))

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-[#1c1c25] to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos flotantes decorativos */}
      {floatingElements}
      
      {/* Gradiente de fondo animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="max-w-2xl w-full text-center relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Número 404 animado */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <motion.h1
            className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent"
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: "200% 200%",
            }}
          >
            404
          </motion.h1>
        </motion.div>

        {/* Icono de alerta animado */}
        <motion.div
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <motion.div
            className="p-6 rounded-full bg-gray-800/50 backdrop-blur-xl border border-purple-500/20"
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: [
                "0 0 20px rgba(168, 85, 247, 0.3)",
                "0 0 40px rgba(168, 85, 247, 0.6)",
                "0 0 20px rgba(168, 85, 247, 0.3)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <AlertTriangle className="w-12 h-12 text-purple-400" />
          </motion.div>
        </motion.div>

        {/* Mensaje principal */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¡Ups! Página no encontrada
          </h2>
          <p className="text-lg text-gray-400 mb-6 max-w-md mx-auto">
            La página que estás buscando parece haberse perdido en el espacio digital. 
            No te preocupes, te ayudamos a encontrar lo que necesitas.
          </p>
        </motion.div>

        {/* Barra de búsqueda */}
        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Buscar páginas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-gray-800/50 border-purple-500/20 text-white placeholder:text-gray-400 backdrop-blur-xl"
            />
          </div>
        </motion.div>

        {/* Botones de acción */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          variants={itemVariants}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button asChild className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 px-8 py-3">
              <Link href="/admin">
                <Home className="w-5 h-5 mr-2" />
                Ir al Dashboard
              </Link>
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              className="border-purple-500/20 bg-gray-800/50 text-white hover:bg-purple-500/10 backdrop-blur-xl px-8 py-3"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver atrás
            </Button>
          </motion.div>
        </motion.div>


        {/* Mensaje de ayuda */}
        <motion.div
          className="mt-8 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20 backdrop-blur-xl"
          variants={itemVariants}
        >
          <p className="text-sm text-purple-200">
            💡 <strong>Consejo:</strong> Si crees que esto es un error, puedes contactar al soporte técnico.
          </p>
        </motion.div>
      </motion.div>

      {/* Efectos de partículas en las esquinas */}
      <motion.div
        className="absolute top-10 left-10 w-20 h-20 border border-purple-500/20 rounded-full"
        animate={{
          rotate: 360,
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute bottom-10 right-10 w-16 h-16 border border-blue-500/20 rounded-full"
        animate={{
          rotate: -360,
          scale: [1, 0.8, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  )
}