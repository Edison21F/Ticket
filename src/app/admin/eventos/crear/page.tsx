"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Music2, Film, Plane, Upload, Plus, Minus, Calendar, X } from "lucide-react"
import { format } from "date-fns"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface EventFormData {
  type: string
  name: string
  date: Date | undefined
  time: string
  description: string
  venue: string
  capacity: number
  ticketTypes: {
    name: string
    price: number
    quantity: number
  }[]
  image: string | null
}

export function CreateEventForm() {
  const [formData, setFormData] = useState<EventFormData>({
    type: "concert",
    name: "",
    date: undefined,
    time: "",
    description: "",
    venue: "",
    capacity: 0,
    ticketTypes: [],
    image: null,
  })

  const [step, setStep] = useState(1)
  const totalSteps = 3

  const handleAddTicketType = () => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: [...prev.ticketTypes, { name: "", price: 0, quantity: 0 }],
    }))
  }

  const handleRemoveTicketType = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.filter((_, i) => i !== index),
    }))
  }

  const handleTicketTypeChange = (index: number, field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      ticketTypes: prev.ticketTypes.map((ticket, i) => (i === index ? { ...ticket, [field]: value } : ticket)),
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          image: reader.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const getEventIcon = () => {
    switch (formData.type) {
      case "concert":
        return <Music2 className="w-6 h-6" />
      case "movie":
        return <Film className="w-6 h-6" />
      case "transport":
        return <Plane className="w-6 h-6" />
      default:
        return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <motion.div
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  step > index + 1
                    ? "bg-green-500 text-white"
                    : step === index + 1
                    ? "bg-yellow-400 text-black"
                    : "bg-gray-200 text-gray-500"
                }`}
              initial={{ scale: 0.8 }}
              animate={{ scale: step === index + 1 ? 1.1 : 1 }}
            >
              {index + 1}
            </motion.div>
          ))}
        </div>
        <div className="relative h-2 bg-gray-200 rounded-full">
          <motion.div
            className="absolute left-0 top-0 h-full bg-yellow-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-lg shadow-lg p-8"
      >
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              {getEventIcon()}
              <h2 className="text-2xl font-bold">Información Básica</h2>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {['concert', 'movie', 'transport'].map((type) => (
                <button
                  key={type}
                  onClick={() => setFormData((prev) => ({ ...prev, type }))}
                  className={`h-24 flex flex-col items-center justify-center gap-2 rounded-lg border-2 transition-colors
                    ${formData.type === type 
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                  {type === 'concert' && <Music2 className="w-8 h-8" />}
                  {type === 'movie' && <Film className="w-8 h-8" />}
                  {type === 'transport' && <Plane className="w-8 h-8" />}
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre del Evento</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha</label>
                  <DatePicker
                    selected={formData.date}
                    onChange={(date) => setFormData((prev) => ({ ...prev, date: date || undefined }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    dateFormat="PPP"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Hora</label>
                  <input
                    type="time"
                    value={formData.time}
                    onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <Upload className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Detalles y Multimedia</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Lugar</label>
                  <input
                    type="text"
                    value={formData.venue}
                    onChange={(e) => setFormData((prev) => ({ ...prev, venue: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Capacidad Total</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => setFormData((prev) => ({ ...prev, capacity: Number(e.target.value) }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Imagen del Evento</label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {formData.image ? (
                    <div className="relative">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="max-h-48 mx-auto rounded"
                      />
                      <button
                        className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-lg hover:bg-gray-100"
                        onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="py-8">
                      <Upload className="w-12 h-12 mx-auto text-gray-400" />
                      <label
                        htmlFor="image-upload"
                        className="mt-2 cursor-pointer text-blue-500 hover:text-blue-600"
                      >
                        Subir imagen
                      </label>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setStep(1)}
              >
                Anterior
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => setStep(3)}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-8">
              <Plus className="w-6 h-6" />
              <h2 className="text-2xl font-bold">Tipos de Tickets</h2>
            </div>

            <div className="space-y-4">
              {formData.ticketTypes.map((ticket, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-end gap-4"
                >
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input
                      type="text"
                      value={ticket.name}
                      onChange={(e) => handleTicketTypeChange(index, "name", e.target.value)}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700">Precio</label>
                    <input
                      type="number"
                      value={ticket.price}
                      onChange={(e) => handleTicketTypeChange(index, "price", Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700">Cantidad</label>
                    <input
                      type="number"
                      value={ticket.quantity}
                      onChange={(e) => handleTicketTypeChange(index, "quantity", Number(e.target.value))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveTicketType(index)}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}

              <button
                onClick={handleAddTicketType}
                className="w-full px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Agregar Tipo de Ticket
              </button>
            </div>

            <div className="flex justify-between mt-6">
              <button
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => setStep(2)}
              >
                Anterior
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                onClick={() => {
                  console.log("Formulario enviado:", formData)
                  // Aquí iría la lógica para enviar el formulario
                }}
              >
                Crear Evento
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default function CreateEventPage() {
    return (
      <div className="container mx-auto py-8">
        <CreateEventForm />
      </div>
    )
  }