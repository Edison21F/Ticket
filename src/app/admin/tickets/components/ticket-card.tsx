"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Upload, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Ticket } from "../utils/mock-tickets"
import Image from "next/image";


interface TicketCardProps {
  ticket: Ticket
}

export function TicketCard({ ticket }: TicketCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [customImage, setCustomImage] = useState<string | null>(null)

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCustomImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const getTicketColor = () => {
    switch (ticket.type) {
      case "cinema":
        return "bg-red-500"
      case "concert":
        return "bg-purple-500"
      case "transport":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02, boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.1)" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative bg-gray-900 bg-opacity-80 rounded-lg overflow-hidden shadow-lg backdrop-blur-lg border border-gray-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of the ticket */}
        <div
          className={`${
            isFlipped ? "opacity-0" : "opacity-100"
          } flex h-48 transition-opacity duration-300 relative`}
        >
          <div className={`w-1/3 ${getTicketColor()} p-4 flex items-center justify-center`}>
            <Image
              src={customImage || ticket.image || "/placeholder.svg?height=200&width=200"}
              alt={ticket.eventName}
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">{ticket.eventName}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-300">
                  <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                  {ticket.date}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <Clock className="w-4 h-4 mr-2 text-gray-400" />
                  {ticket.time}
                </div>
                <div className="flex items-center text-sm text-gray-300">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  {ticket.location}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold text-gray-300">
                {ticket.type === "cinema"
                  ? `Sala ${ticket.seat.theater} • Fila ${ticket.seat.row} • Asiento ${ticket.seat.number}`
                  : `Sección ${ticket.section} • Asiento ${ticket.seat.number}`}
              </div>
              <QrCode className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Back of the ticket */}
        <div
          className={`${
            isFlipped ? "opacity-100" : "opacity-0"
          } absolute inset-0 bg-gray-800 bg-opacity-90 p-4 transition-opacity duration-300 flex flex-col justify-between`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Personalizar Ticket</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full border-gray-500 text-gray-300 hover:bg-gray-700">
                  <Upload className="w-4 h-4 mr-2 text-gray-400" />
                  Cambiar Imagen
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 border border-gray-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Cambiar imagen del ticket</DialogTitle>
                </DialogHeader>
                <Input type="file" accept="image/*" onChange={handleImageUpload} className="text-white bg-gray-800 border-gray-600" />
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-sm text-gray-400 text-center">
            <p>Ticket ID: {ticket.id}</p>
            <p>Comprado el {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full" />
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-600 rounded-full" />
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full border-t-2 border-dashed border-gray-600 -z-10" />
    </motion.div>
  )
}
