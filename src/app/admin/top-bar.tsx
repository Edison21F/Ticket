"use client"

import { useState, useRef, useEffect } from "react"
import { Bell, Settings, User } from "lucide-react"
import Link from "next/link"

export function TopBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Cerrar el dropdown cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#2A2B3C] bg-[#1D1E2C]">
      <div className="flex h-16 items-center px-4 md:px-6">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#E59D23]">EvenTix</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <button 
            className="p-2 text-gray-400 hover:text-[#E59D23] transition-colors rounded-full hover:bg-[#2A2B3C]"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 text-gray-400 hover:text-[#E59D23] transition-colors rounded-full hover:bg-[#2A2B3C]"
              aria-label="User menu"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <User className="h-5 w-5" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-[#1D1E2C] text-white border border-[#2A2B3C] rounded-md shadow-lg">
                <div className="px-4 py-2 text-sm font-semibold">Mi Cuenta</div>
                <div className="h-px bg-[#2A2B3C]" />
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-sm text-left flex items-center hover:bg-[#2A2B3C] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </button>
                  <button
                    className="w-full px-4 py-2 text-sm text-left flex items-center hover:bg-[#2A2B3C] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </button>
                </div>
                <div className="h-px bg-[#2A2B3C]" />
                <div className="py-1">
                  <button
                    className="w-full px-4 py-2 text-sm text-left text-red-500 hover:bg-[#2A2B3C] transition-colors"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}