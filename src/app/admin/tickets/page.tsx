"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TicketCard } from "./components/ticket-card"
import { mockTickets } from "./utils/mock-tickets"

export default function TicketsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch = ticket.eventName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesType = filterType === "all" || ticket.type === filterType
    return matchesSearch && matchesType
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="min-h-screen ">
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Crea experiencias inolvidables
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
          <h2 className="text-2xl font-semibold text-blue-300">Gestión de Usuarios</h2>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Buscar tickets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#2a2438] border-none text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px] bg-[#2a2438] border-none text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por tipo" />
              </SelectTrigger>
              <SelectContent className="bg-[#2a2438] border-none text-white">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="cinema">Cine</SelectItem>
                <SelectItem value="concert">Concierto</SelectItem>
                <SelectItem value="transport">Transporte</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </motion.div>
      </div>
    </div>
  )
}

