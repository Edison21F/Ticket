"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { 
  Bell, 
  Search, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  ChevronDown,
  LogOut,
  UserCog,
  HelpCircle
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const fadeIn = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
}

const welcomeMessages = [
  "¡Bienvenido a EvenTix!", 
  "Gestiona tus eventos", 
  "Crea experiencias inolvidables",
  "Panel de Administración"
]

export function TopBar() {
  const [welcomeIndex, setWelcomeIndex] = useState(0)
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setWelcomeIndex((prev) => (prev + 1) % welcomeMessages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  // Notificaciones simuladas
  const notifications = [
    { id: 1, title: "Nuevo evento creado", message: "Concierto de Bad Bunny programado", time: "hace 5 min", unread: true },
    { id: 2, title: "Pago procesado", message: "Transacción de $250.00 completada", time: "hace 15 min", unread: true },
    { id: 3, title: "Usuario registrado", message: "Nueva cuenta creada: juan@email.com", time: "hace 1 hora", unread: false },
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <div className="sticky top-0 z-30">
      <header className="border-b border-white/10 bg-gray-900/95 backdrop-blur-xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Título animado */}
          <div className="flex-1 flex items-center gap-6">
            <div className="relative min-h-[40px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={welcomeIndex}
                  variants={fadeIn}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-purple-600 bg-clip-text text-transparent"
                >
                  {welcomeMessages[welcomeIndex]}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* Breadcrumb o información contextual */}
            <motion.div
              className="hidden md:flex items-center gap-2 text-sm text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Sistema operativo</span>
              </div>
              <span>•</span>
              <span>Última actualización: hoy</span>
            </motion.div>
          </div>

          {/* Controles del header */}
          <div className="flex items-center gap-3">
            {/* Buscador */}
            <div className="relative">
              <AnimatePresence>
                {showSearch ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        type="text"
                        placeholder="Buscar eventos, usuarios..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-400 focus:ring-purple-500/50"
                        autoFocus
                        onBlur={() => !searchQuery && setShowSearch(false)}
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    onClick={() => setShowSearch(true)}
                    className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Search className="w-5 h-5 text-gray-400" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Toggle tema */}
            <motion.button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isDarkMode ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {isDarkMode ? (
                  <Moon className="w-5 h-5 text-gray-400" />
                ) : (
                  <Sun className="w-5 h-5 text-yellow-500" />
                )}
              </motion.div>
            </motion.button>

            {/* Notificaciones */}
            <div className="relative">
              <motion.button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Bell className="w-5 h-5 text-gray-400" />
                {unreadCount > 0 && (
                  <motion.span
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500 }}
                  >
                    {unreadCount}
                  </motion.span>
                )}
              </motion.button>

              {/* Panel de notificaciones */}
              <AnimatePresence>
                {showNotifications && (
                  <>
                    <motion.div
                      className="fixed inset-0 z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowNotifications(false)}
                    />
                    <motion.div
                      className="absolute right-0 top-12 w-80 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b border-white/10">
                        <h3 className="font-semibold text-white">Notificaciones</h3>
                        <p className="text-xs text-gray-400">{unreadCount} nuevas</p>
                      </div>
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.map((notification, index) => (
                          <motion.div
                            key={notification.id}
                            className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${notification.unread ? 'bg-purple-500/5' : ''}`}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-start gap-3">
                              {notification.unread && (
                                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                              )}
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-gray-400 mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                      <div className="p-3 border-t border-white/10">
                        <Button variant="ghost" className="w-full text-purple-400 hover:text-purple-300 hover:bg-purple-500/10">
                          Ver todas las notificaciones
                        </Button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Perfil de usuario */}
            <div className="relative">
              <motion.button
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-2 p-2 hover:bg-gray-800/50 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium text-white">Admin</p>
                  <p className="text-xs text-gray-400">Administrador</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </motion.button>

              {/* Menu del perfil */}
              <AnimatePresence>
                {showProfile && (
                  <>
                    <motion.div
                      className="fixed inset-0 z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onClick={() => setShowProfile(false)}
                    />
                    <motion.div
                      className="absolute right-0 top-12 w-56 bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl z-20"
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-medium text-white">Admin User</p>
                            <p className="text-xs text-gray-400">admin@eventix.com</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        {[
                          { icon: UserCog, label: "Configurar perfil", href: "/admin/profile" },
                          { icon: Settings, label: "Configuración", href: "/admin/settings" },
                          { icon: HelpCircle, label: "Ayuda", href: "/admin/help" },
                        ].map((item, index) => (
                          <motion.button
                            key={item.label}
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 2 }}
                          >
                            <item.icon className="w-4 h-4" />
                            {item.label}
                          </motion.button>
                        ))}
                        <div className="border-t border-white/10 mt-2 pt-2">
                          <motion.button
                            className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            whileHover={{ x: 2 }}
                          >
                            <LogOut className="w-4 h-4" />
                            Cerrar sesión
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Barra de progreso de carga (opcional) */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </header>
    </div>
  )
}