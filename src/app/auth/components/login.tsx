"use client"

import { useState, useEffect, ComponentType } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Github, 
  Facebook, 
  Linkedin, 
  Mail, 
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Shield,
  Zap,
  Globe
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { LoadingAnimation } from "./loading-animation"

// Hardcoded user data for validation
const users = [
  { email: "user@example.com", password: "password123" },
  { email: "admin@gmail.com", password: "admin123" },
]

// Componente de partículas flotantes
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-gradient-to-r from-purple-400/30 to-blue-400/30 rounded-full blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.initialX}%`,
            top: `${particle.initialY}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}

// Componente de características
const FeatureCard = ({ icon: Icon, title, description }: { 
  icon: ComponentType<{ className?: string }>,  
  title: string, 
  description: string 
}) => (
  <motion.div
    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
    whileHover={{ scale: 1.05, y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <motion.div
      className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center mb-4"
      whileHover={{ rotate: 5 }}
    >
      <Icon className="w-6 h-6 text-white" />
    </motion.div>
    <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.div>
)

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const router = useRouter()

  // Validar fortaleza de contraseña
  useEffect(() => {
    if (password.length === 0) {
      setPasswordStrength(0)
      return
    }

    let strength = 0
    if (password.length >= 8) strength += 25
    if (/[A-Z]/.test(password)) strength += 25
    if (/[0-9]/.test(password)) strength += 25
    if (/[^A-Za-z0-9]/.test(password)) strength += 25
    
    setPasswordStrength(strength)
  }, [password])

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return "bg-red-500"
    if (passwordStrength < 50) return "bg-orange-500"
    if (passwordStrength < 75) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return "Muy débil"
    if (passwordStrength < 50) return "Débil"
    if (passwordStrength < 75) return "Buena"
    return "Muy fuerte"
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setIsLoading(true)

    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 1500))

    if (isSignUp) {
      // Validaciones para registro
      if (!name.trim()) {
        setError("El nombre es requerido")
        setIsLoading(false)
        return
      }
      
      if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden")
        setIsLoading(false)
        return
      }

      if (passwordStrength < 50) {
        setError("La contraseña debe ser más fuerte")
        setIsLoading(false)
        return
      }

      if (name && email && password) {
        setSuccess("¡Cuenta creada exitosamente! Redirigiendo...")
        setTimeout(() => {
          setIsSignUp(false)
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          setIsLoading(false)
        }, 2000)
      }
    } else {
      // Login logic
      const user = users.find((u) => u.email === email && u.password === password)
      if (user) {
        setSuccess("¡Inicio de sesión exitoso! Redirigiendo...")
        setTimeout(() => {
          router.push("/admin")
        }, 2000)
      } else {
        setError("Credenciales inválidas")
        setIsLoading(false)
      }
    }
  }

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

  const formVariants = {
    hidden: (isRight: boolean) => ({
      x: isRight ? 300 : -300,
      opacity: 0,
      rotateY: isRight ? 15 : -15,
    }),
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
    exit: (isRight: boolean) => ({
      x: isRight ? -300 : 300,
      opacity: 0,
      rotateY: isRight ? -15 : 15,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    }),
  }

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-purple-900 via-gray-900 to-blue-900">
      {/* Fondo animado */}
      <div className="absolute inset-0">
        <FloatingParticles />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1))",
              "linear-gradient(45deg, rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
              "linear-gradient(45deg, rgba(168, 85, 247, 0.1), rgba(236, 72, 153, 0.1), rgba(59, 130, 246, 0.1))",
            ]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 min-h-screen flex items-center justify-center p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="w-full max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            
            {/* Panel izquierdo - Información */}
            <motion.div
              className="hidden lg:block space-y-8"
              variants={itemVariants}
            >
              <div className="space-y-6">
                <motion.div
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                >
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      EvenTix
                    </h1>
                    <p className="text-gray-400">Panel de Administración</p>
                  </div>
                </motion.div>

                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-white leading-tight">
                    Gestiona tus eventos con{" "}
                    <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                      inteligencia
                    </span>
                  </h2>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    Plataforma completa para administrar eventos, usuarios y transacciones 
                    con herramientas avanzadas y análisis en tiempo real.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <FeatureCard
                    icon={Shield}
                    title="Seguridad Avanzada"
                    description="Protección de datos con encriptación de extremo a extremo"
                  />
                  <FeatureCard
                    icon={Zap}
                    title="Análisis en Tiempo Real"
                    description="Dashboard con métricas y estadísticas actualizadas"
                  />
                  <FeatureCard
                    icon={Globe}
                    title="Multi-plataforma"
                    description="Acceso desde cualquier dispositivo y ubicación"
                  />
                </div>
              </div>
            </motion.div>

            {/* Panel derecho - Formulario */}
            <motion.div
              className="w-full max-w-md mx-auto"
              variants={itemVariants}
            >
              <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                {/* Header del formulario */}
                <div className="text-center mb-8">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <Lock className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}
                  </h3>
                  <p className="text-gray-400">
                    {isSignUp 
                      ? "Únete a nuestra plataforma de gestión" 
                      : "Accede a tu panel de administración"
                    }
                  </p>
                </div>

                {/* Alertas */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="mb-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center gap-3"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <span className="text-red-200 text-sm">{error}</span>
                    </motion.div>
                  )}
                  
                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="mb-4 p-4 bg-green-500/20 border border-green-500/30 rounded-xl flex items-center gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                      <span className="text-green-200 text-sm">{success}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Formulario */}
                <AnimatePresence mode="wait">
                  <motion.form
                    key={isSignUp ? "signup" : "signin"}
                    custom={isSignUp}
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Botones sociales */}
                    <div>
                      <div className="grid grid-cols-4 gap-3 mb-6">
                        {[
                          { Icon: Github, color: "hover:bg-gray-700" },
                          { Icon: Facebook, color: "hover:bg-blue-600" },
                          { Icon: Linkedin, color: "hover:bg-blue-700" },
                          { Icon: Mail, color: "hover:bg-red-600" }
                        ].map(({ Icon, color }, i) => (
                          <motion.button
                            key={i}
                            type="button"
                            className={`p-3 rounded-xl bg-white/5 border border-white/10 ${color} transition-all duration-200`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Icon className="w-5 h-5 text-gray-300" />
                          </motion.button>
                        ))}
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-white/10" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-transparent text-gray-400">o continúa con email</span>
                        </div>
                      </div>
                    </div>

                    {/* Campos del formulario */}
                    <div className="space-y-4">
                      {isSignUp && (
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            type="text"
                            placeholder="Nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl h-12 focus:ring-purple-500/50"
                            disabled={isLoading}
                          />
                        </div>
                      )}

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type="email"
                          placeholder="Correo electrónico"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl h-12 focus:ring-purple-500/50 focus:border-purple-500/50"
                          disabled={isLoading}
                        />
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Contraseña"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl h-12 focus:ring-purple-500/50 focus:border-purple-500/50"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>

                      {/* Indicador de fortaleza de contraseña */}
                      {isSignUp && password && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-2"
                        >
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Fortaleza de contraseña</span>
                            <span className={`font-medium ${
                              passwordStrength < 50 ? "text-red-400" : 
                              passwordStrength < 75 ? "text-yellow-400" : "text-green-400"
                            }`}>
                              {getPasswordStrengthText()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <motion.div
                              className={`h-2 rounded-full ${getPasswordStrengthColor()}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${passwordStrength}%` }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                        </motion.div>
                      )}

                      {isSignUp && (
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirmar contraseña"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="pl-10 pr-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 rounded-xl h-12 focus:ring-purple-500/50 focus:border-purple-500/50"
                            disabled={isLoading}
                          />
                          <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                            disabled={isLoading}
                          >
                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Link de recuperación */}
                    {!isSignUp && (
                      <div className="flex justify-end">
                        <Link 
                          href="#" 
                          className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                        >
                          ¿Olvidaste tu contraseña?
                        </Link>
                      </div>
                    )}

                    {/* Botón de submit */}
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white rounded-xl h-12 font-semibold flex items-center justify-center gap-2"
                      >
                        {isLoading ? (
                          <LoadingAnimation />
                        ) : (
                          <>
                            <span>{isSignUp ? "Crear Cuenta" : "Iniciar Sesión"}</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </motion.div>

                    {/* Toggle entre login/signup */}
                    <div className="text-center pt-4">
                      <span className="text-gray-400 text-sm">
                        {isSignUp ? "¿Ya tienes una cuenta?" : "¿No tienes una cuenta?"}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsSignUp(!isSignUp)
                          setError("")
                          setSuccess("")
                          setEmail("")
                          setPassword("")
                          setName("")
                          setConfirmPassword("")
                        }}
                        className="ml-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                        disabled={isLoading}
                      >
                        {isSignUp ? "Iniciar Sesión" : "Crear Cuenta"}
                      </button>
                    </div>
                  </motion.form>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}