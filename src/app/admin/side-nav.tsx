"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface NavItem {
  label: string
  icon: string
  routerLink: string[]
}

interface NavGroup {
  label: string
  items: NavItem[]
}

// Utility function to combine class names
const cn = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ')
}

export function SideNav({ className = "", items }: { className?: string; items: NavGroup[] }) {
  const pathname = usePathname()
  const [openSections, setOpenSections] = useState<string[]>([])

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  return (
    <div className={cn("pb-12 w-45 bg-[#1D1E2C]", className)}>
      <div className="space-y-4 py-4">
        <div className="px-6 text-gray-400">
          {items.map((group, index) => {
            const sectionId = `item-${index}`
            const isOpen = openSections.includes(sectionId)

            return (
              <div key={index} className="border-b border-[#2A2B3C] last:border-b-0">
                <button
                  onClick={() => toggleSection(sectionId)}
                  className="flex items-center justify-between w-full py-4 text-sm font-medium hover:text-[#E59D23] transition-colors"
                >
                  {group.label}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform duration-200",
                      isOpen ? "transform rotate-180" : ""
                    )}
                  />
                </button>
                
                <div
                  className={cn(
                    "overflow-hidden transition-all duration-200 ease-in-out",
                    isOpen ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="flex flex-col space-y-2 pt-2">
                    {group.items.map((item, itemIndex) => (
                      <Link
                        key={itemIndex}
                        href={item.routerLink[0]}
                        className={cn(
                          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:text-[#E59D23]",
                          pathname === item.routerLink[0]
                            ? "bg-[#2A2B3C] text-[#E59D23]"
                            : "transparent"
                        )}
                      >
                        <i className={item.icon} />
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}