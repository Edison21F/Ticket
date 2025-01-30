"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Github, Facebook, Linkedin, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingAnimation } from "./loading-animation"

// Hardcoded user data for validation
const users = [
  { email: "user@example.com", password: "password123" },
  { email: "admin@gmail.com", password: "admin123" },
]

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (isSignUp) {
      // Sign up logic (for demonstration, just show a success message)
      if (name && email && password) {
        alert("Sign up successful! Please log in.")
        setIsSignUp(false)
        setName("")
        setEmail("")
        setPassword("")
      } else {
        setError("Please fill in all fields")
      }
    } else {
      // Login logic
      const user = users.find((u) => u.email === email && u.password === password)
      if (user) {
        router.push("/admin")
      } else {
        setError("Invalid email or password")
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const formVariants = {
    hidden: (isRight: boolean) => ({
      x: isRight ? 200 : -200,
      opacity: 0,
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: (isRight: boolean) => ({
      x: isRight ? -200 : 200,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  }

  return (
    <motion.div
      className="min-h-screen w-full flex items-center justify-center p-4 bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="relative w-full max-w-4xl bg-gray-900/50 backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
        <div className="relative grid md:grid-cols-2 gap-8 p-8">
          {/* Form Container */}
          <AnimatePresence mode="wait">
            {isSignUp ? (
              <motion.form
                key="signup"
                className="w-full"
                custom={true}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
              >
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white text-center">Crear Cuenta</h2>
                  <div className="flex justify-center gap-4">
                    {[Github, Facebook, Linkedin, Mail].map((Icon, i) => (
                      <Button key={i} variant="outline" size="icon" className="rounded-full bg-gray-800/50 border-0">
                        <Icon className="w-5 h-5" />
                      </Button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-center">o usa tu correo electrónico</p>
                  <div className="space-y-4">
                    <Input
                      type="text"
                      placeholder="Nombre"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="bg-gray-800/50 border-0 text-white placeholder:text-gray-400"
                    />
                    <Input
                      type="email"
                      placeholder="Correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800/50 border-0 text-white placeholder:text-gray-400"
                    />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800/50 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    Registrarse
                  </Button>
                </div>
              </motion.form>
            ) : (
              <motion.form
                key="signin"
                className="w-full"
                custom={false}
                variants={formVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                onSubmit={handleSubmit}
              >
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-white text-center">Iniciar Sesión</h2>
                  <div className="flex justify-center gap-4">
                    {[Github, Facebook, Linkedin, Mail].map((Icon, i) => (
                      <Button key={i} variant="outline" size="icon" className="rounded-full bg-gray-800/50 border-0">
                        <Icon className="w-5 h-5" />
                      </Button>
                    ))}
                  </div>
                  <p className="text-gray-400 text-center">o usa tu correo electrónico</p>
                  <div className="space-y-4">
                    <Input
                      type="email"
                      placeholder="Correo"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-gray-800/50 border-0 text-white placeholder:text-gray-400"
                    />
                    <Input
                      type="password"
                      placeholder="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="bg-gray-800/50 border-0 text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="flex justify-end">
                    <Link href="#" className="text-sm text-blue-400 hover:text-blue-300">
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                  >
                    Iniciar Sesión
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Toggle Section */}
          <div className="flex flex-col items-center justify-center space-y-6 p-8 bg-gray-800/30 rounded-xl">
            <h3 className="text-2xl font-bold text-white text-center">
              {isSignUp ? "¿Ya tienes cuenta?" : "¿Aún no tienes cuenta?"}
            </h3>
            <p className="text-gray-400 text-center">
              {isSignUp ? "Inicia sesión para comenzar" : "Estás a un click de formar parte de nuestra comunidad"}
            </p>
            <LoadingAnimation />
            <Button
              variant="outline"
              onClick={() => {
                setIsSignUp(!isSignUp)
                setError("")
                setEmail("")
                setPassword("")
                setName("")
              }}
              className="border-2 border-white/20 bg-transparent text-white hover:bg-white/10"
            >
              {isSignUp ? "Iniciar Sesión" : "Crear Cuenta"}
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

