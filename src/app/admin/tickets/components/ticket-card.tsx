"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, MapPin, Upload, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import type { Ticket } from "../utils/mock-tickets"

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
        return "bg-red-600"
      case "concert":
        return "bg-purple-600"
      case "transport":
        return "bg-blue-600"
      default:
        return "bg-gray-600"
    }
  }

  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative bg-white rounded-lg overflow-hidden shadow-lg"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of the ticket */}
        <div
          className={`${isFlipped ? "opacity-0" : "opacity-100"} flex h-48 transition-opacity duration-300 relative`}
        >
          <div className={`w-1/3 ${getTicketColor()} p-4 flex items-center justify-center`}>
            <img
              src={customImage || ticket.image || "/placeholder.svg?height=200&width=200"}
              alt={ticket.eventName}
              className="w-full h-full object-cover rounded"
            />
          </div>
          <div className="w-2/3 p-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">{ticket.eventName}</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {ticket.date}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-2" />
                  {ticket.time}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {ticket.location}
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm font-semibold">
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
          } absolute inset-0 bg-white p-4 transition-opacity duration-300 flex flex-col justify-between`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <div>
            <h4 className="text-lg font-semibold mb-4">Personalizar Ticket</h4>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Upload className="w-4 h-4 mr-2" />
                  Cambiar Imagen
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cambiar imagen del ticket</DialogTitle>
                </DialogHeader>
                <Input type="file" accept="image/*" onChange={handleImageUpload} />
              </DialogContent>
            </Dialog>
          </div>
          <div className="text-sm text-gray-500 text-center">
            <p>Ticket ID: {ticket.id}</p>
            <p>Comprado el {new Date(ticket.purchaseDate).toLocaleDateString()}</p>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full" />
      <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 bg-gray-200 rounded-full" />
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full border-t-2 border-dashed border-gray-200 -z-10" />
    </motion.div>
  )
}

