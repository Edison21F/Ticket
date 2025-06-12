"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { JSX, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  Users, 
  Key, 
  List, 
  Music, 
  Film, 
  Bus, 
  Ticket, 
  Wallet, 
  LogOut,
  Settings,
  Bell,
  User
} from "lucide-react"

// Definición de interfaces
interface NavItem {
  label: string
  routerLink: string[]
}

interface NavGroup {
  label: string
  items: NavItem[]
}

// Utility function para unir clases CSS
const cn = (...classes: string[]) => classes.filter(Boolean).join(' ')

// Mapeo de iconos mejorado
const iconMap: Record<string, JSX.Element> = {
  "Dashboard": <Home className="h-5 w-5" />,
  "Usuarios": <Users className="h-5 w-5" />,
  "Roles y Permisos": <Key className="h-5 w-5" />,
  "Listado de Eventos": <List className="h-5 w-5" />,
  "Conciertos": <Music className="h-5 w-5" />,
  "Cine": <Film className="h-5 w-5" />,
  "Transporte": <Bus className="h-5 w-5" />,
  "Otros": <Settings className="h-5 w-5" />,
  "Listado de Tickets": <Ticket className="h-5 w-5" />,
  "Gestión de Pagos": <Wallet className="h-5 w-5" />,
  "Cerrar sesión": <LogOut className="h-5 w-5" />
}

// Colores para cada sección
const sectionColors: Record<string, string> = {
  "Inicio": "from-blue-500 to-cyan-500",
  "Gestión de Usuarios": "from-purple-500 to-pink-500",
  "Eventos": "from-orange-500 to-red-500",
  "Tickets": "from-green-500 to-emerald-500",
  "Pagos y Transacciones": "from-yellow-500 to-orange-500",
  "Sesión": "from-red-500 to-pink-500"
}

export function SideNav({ items }: { className?: string; items: NavGroup[] }) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>(["Inicio", "Eventos"]) // Secciones abiertas por defecto
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  // Auto-abrir sección basada en la ruta actual
  useEffect(() => {
    items.forEach((group) => {
      const hasActiveItem = group.items.some(item => pathname === item.routerLink[0])
      if (hasActiveItem && !openSections.includes(group.label)) {
        setOpenSections(prev => [...prev, group.label])
      }
    })
  }, [pathname, items, openSections])

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [pathname])

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev =>
      prev.includes(sectionId) ? prev.filter(id => id !== sectionId) : [...prev, sectionId]
    )
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  }


  return (
    <>
      {/* Overlay para móviles */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleMobileMenu}
          />
        )}
      </AnimatePresence>

      {/* Botón hamburguesa para móviles */}
      <motion.button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 p-3 bg-gray-900/90 backdrop-blur-xl rounded-xl border border-white/10 md:hidden shadow-lg"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </motion.div>
      </motion.button>

      {/* Sidebar - Siempre visible en desktop, animado en móvil */}
      <div className={cn(
        // Estilos base
        "w-72 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl",
        // Desktop: siempre visible, posición relativa
        "hidden md:flex md:flex-col md:relative",
        // Mobile: overlay con animación
        "md:translate-x-0"
      )}>
        {/* Sidebar Content */}
        <SidebarContent 
          items={items}
          openSections={openSections}
          toggleSection={toggleSection}
          pathname={pathname}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      </div>

      {/* Sidebar móvil (overlay) */}
      <motion.div
        className={cn(
          "fixed inset-y-0 left-0 w-72 bg-gray-900/95 backdrop-blur-xl border-r border-white/10 shadow-2xl z-50 md:hidden"
        )}
        variants={sidebarVariants}
        initial="closed"
        animate={isMobileMenuOpen ? "open" : "closed"}
      >
        <SidebarContent 
          items={items}
          openSections={openSections}
          toggleSection={toggleSection}
          pathname={pathname}
          hoveredItem={hoveredItem}
          setHoveredItem={setHoveredItem}
        />
      </motion.div>
    </>
  )
}

// Componente separado para el contenido del sidebar
function SidebarContent({ 
  items, 
  openSections, 
  toggleSection, 
  pathname, 
  hoveredItem, 
  setHoveredItem 
}: {
  items: NavGroup[]
  openSections: string[]
  toggleSection: (sectionId: string) => void
  pathname: string
  hoveredItem: string | null
  setHoveredItem: (item: string | null) => void
}) {
  const sectionVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.2,
          delay: 0.1
        }
      }
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: {
        height: {
          type: "spring",
          stiffness: 300,
          damping: 30
        },
        opacity: {
          duration: 0.1
        }
      }
    }
  }

  return (
    <>
      {/* Header del sidebar */}
      <div className="p-6 border-b border-white/10">
        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="relative">
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Ticket className="w-6 h-6 text-white" />
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-900"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              EvenTix
            </h2>
            <p className="text-xs text-gray-400">Panel de Administración</p>
          </div>
        </motion.div>
      </div>

      {/* Perfil del usuario */}
      <div className="p-4 border-b border-white/5">
        <motion.div
          className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Admin User</p>
            <p className="text-xs text-gray-400 truncate">admin@eventix.com</p>
          </div>
          <Bell className="w-4 h-4 text-gray-400" />
        </motion.div>
      </div>

      {/* Navegación */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
        <div className="p-4 space-y-2">
          {items.map((group, index) => {
            const sectionId = group.label
            const isOpen = openSections.includes(sectionId)
            const sectionColor = sectionColors[group.label] || "from-gray-500 to-gray-600"

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                {/* Header de la sección */}
                <motion.button
                  onClick={() => toggleSection(sectionId)}
                  className="flex items-center justify-between w-full p-3 text-left rounded-xl hover:bg-white/5 transition-all duration-200 group"
                  whileHover={{ x: 2 }}
                >
                  <div className="flex items-center gap-3">
                    <motion.div
                      className={`w-2 h-2 rounded-full bg-gradient-to-r ${sectionColor}`}
                      animate={{ scale: isOpen ? 1.2 : 1 }}
                      transition={{ duration: 0.2 }}
                    />
                    <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                      {group.label}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                  </motion.div>
                </motion.button>

                {/* Items de la sección */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={sectionVariants}
                      initial="closed"
                      animate="open"
                      exit="closed"
                      className="overflow-hidden"
                    >
                      <div className="ml-5 mt-2 space-y-1 border-l-2 border-white/10 pl-4">
                        {group.items.map((item, itemIndex) => {
                          const isActive = pathname === item.routerLink[0]
                          const isHovered = hoveredItem === `${index}-${itemIndex}`

                          return (
                            <motion.div
                              key={itemIndex}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: itemIndex * 0.05 }}
                            >
                              <Link
                                href={item.routerLink[0]}
                                className={cn(
                                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 relative group",
                                  isActive
                                    ? "bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-white border border-purple-500/30"
                                    : "text-gray-300 hover:text-white hover:bg-white/5"
                                )}
                                onMouseEnter={() => setHoveredItem(`${index}-${itemIndex}`)}
                                onMouseLeave={() => setHoveredItem(null)}
                              >
                                {/* Indicador activo */}
                                {isActive && (
                                  <motion.div
                                    className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-blue-500 rounded-r-full"
                                    layoutId="activeIndicator"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  />
                                )}

                                {/* Icono */}
                                <motion.div
                                  className={cn(
                                    "flex items-center justify-center transition-colors",
                                    isActive ? "text-purple-400" : "text-gray-400 group-hover:text-white"
                                  )}
                                  animate={{ 
                                    scale: isHovered ? 1.1 : 1,
                                    rotate: isHovered ? 5 : 0
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {iconMap[item.label] || <Settings className="h-5 w-5" />}
                                </motion.div>

                                {/* Texto */}
                                <span className="font-medium">{item.label}</span>

                                {/* Efecto hover */}
                                {isHovered && !isActive && (
                                  <motion.div
                                    className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-lg"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                  />
                                )}
                              </Link>
                            </motion.div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Footer del sidebar */}
      <div className="p-4 border-t border-white/10">
        <motion.div
          className="flex items-center justify-between text-xs text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span>v2.1.0</span>
          <div className="flex items-center gap-1">
            <motion.div
              className="w-2 h-2 bg-green-500 rounded-full"
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span>Sistema activo</span>
          </div>
        </motion.div>
      </div>
    </>
  )}
