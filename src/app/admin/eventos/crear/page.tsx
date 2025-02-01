'use client'

import React, { useState } from "react"
import { Music2, Film, Plane, Upload, Plus, Minus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface TicketType {
    name: string
    price: number
    quantity: number
}

interface EventFormData {
    type: 'concierto' | 'película' | 'transporte'
    name: string
    date: string
    time: string
    description: string
    venue: string
    capacity: number
    ticketTypes: TicketType[]
    image: string | null
}

const initialFormData: EventFormData = {
    type: "concierto",
    name: "",
    date: "",
    time: "",
    description: "",
    venue: "",
    capacity: 0,
    ticketTypes: [],
    image: null,
}

const CreateEventForm: React.FC = () => {
    const router = useRouter()
    const [formData, setFormData] = useState<EventFormData>(initialFormData)
    const [step, setStep] = useState<number>(1)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [, setErrors] = useState<Partial<EventFormData>>({})
    const totalSteps = 3

    const validateStep = (currentStep: number): boolean => {
        const newErrors: Partial<EventFormData> = {}

        if (currentStep === 1) {
            if (!formData.name) newErrors.name = "El nombre es requerido"
            if (!formData.date) newErrors.date = "La fecha es requerida"
            if (!formData.time) newErrors.time = "La hora es requerida"
            if (!formData.description) newErrors.description = "La descripción es requerida"
        }

        //if (!formData.capacity || Number(formData.capacity) <= 0) {
          ///  newErrors.capacity = "La capacidad debe ser mayor a 0";
        //}
        

        if (currentStep === 3) {
            if (formData.ticketTypes.length === 0) {
                toast.error("Debe agregar al menos un tipo de ticket")
                return false
            }

            const invalidTickets = formData.ticketTypes.some(
                ticket => !ticket.name || ticket.price <= 0 || ticket.quantity <= 0
            )
            if (invalidTickets) {
                toast.error("Todos los campos de tickets son requeridos y deben ser mayores a 0")
                return false
            }
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleAddTicketType = () => {
        setFormData(prev => ({
            ...prev,
            ticketTypes: [...prev.ticketTypes, { name: "", price: 0, quantity: 0 }],
        }))
    }

    const handleRemoveTicketType = (index: number) => {
        setFormData(prev => ({
            ...prev,
            ticketTypes: prev.ticketTypes.filter((_, i) => i !== index),
        }))
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error("La imagen debe ser menor a 5MB")
                return
            }

            const reader = new FileReader()
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    image: reader.result as string,
                }))
            }
            reader.readAsDataURL(file)
        }
    }

    const handleTicketTypeChange = (index: number, field: keyof TicketType, value: string | number) => {
        const newTicketTypes = [...formData.ticketTypes]
        newTicketTypes[index] = {
            ...newTicketTypes[index],
            [field]: field === 'name' ? value : Number(value)
        }
        setFormData(prev => ({ ...prev, ticketTypes: newTicketTypes }))
    }

    const validateTicketQuantities = (): boolean => {
        const totalTickets = formData.ticketTypes.reduce((total, ticket) => total + ticket.quantity, 0)
        if (totalTickets > formData.capacity) {
            toast.error("El número total de tickets no puede exceder la capacidad del evento")
            return false
        }
        return true
    }

    const handleSubmit = async () => {
        if (!validateStep(3) || !validateTicketQuantities()) return

        setIsSubmitting(true)
        try {
            // Aquí iría la llamada a la API para crear el evento
            await new Promise(resolve => setTimeout(resolve, 1500)) // Simulación de llamada API

            toast.success("Evento creado exitosamente")
            router.push('/admin/eventos')
        }finally {
            setIsSubmitting(false)
        }
    }

    const handleNext = () => {
        if (validateStep(step)) {
            setStep(prev => prev + 1)
        }
    }

    const eventTypes: Array<'concierto' | 'película' | 'transporte'> = ['concierto', 'película', 'transporte']
    const stepTitles = ["Información Básica", "Detalles", "Tickets"]

    return (
        <div className="text-gray-100 py-5">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-12">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl font-bold text-orange-500 mb-4"
                    >
                        Crear Nuevo Evento
                    </motion.h1>
                    <p className="text-gray-400">Completa los detalles para crear tu increíble evento</p>
                </div>

                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex justify-between mb-4">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex flex-col items-center"
                            >
                                <div className={cn(
                                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium border-2 transition-all duration-300",
                                    step > index + 1 ? "bg-orange-500 border-orange-500" :
                                        step === index + 1 ? "bg-orange-400 border-orange-400" :
                                            "border-gray-600 text-gray-600"
                                )}>
                                    {index + 1}
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    {stepTitles[index]}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div
                            className="absolute left-0 top-0 h-full bg-orange-500 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(step / totalSteps) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                <motion.div
                    className=" rounded-2xl shadow-xl p-8 border border-gray-700"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Step 1: Basic Information */}
                            {step === 1 && (
                                <div className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        {eventTypes.map((type) => (
                                            <motion.button
                                                key={type}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setFormData((prev) => ({ ...prev, type }))}
                                                className={cn(
                                                    "h-28 flex flex-col items-center justify-center gap-3 rounded-xl border-2 transition-all",
                                                    formData.type === type
                                                        ? "border-orange-500 bg-orange-500/10 text-orange-400"
                                                        : "border-gray-700 hover:border-gray-600 text-gray-400 hover:text-gray-300"
                                                )}
                                                type="button"
                                            >
                                                {type === 'concierto' && <Music2 className="w-8 h-8" />}
                                                {type === 'película' && <Film className="w-8 h-8" />}
                                                {type === 'transporte' && <Plane className="w-8 h-8" />}
                                                <span className="capitalize">{type}</span>
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="space-y-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del Evento</label>
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                placeholder="Ingresa el nombre del evento"
                                            />
                                        </div>

                                        <div className="grid grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Descripción</label>
                                                <textarea
                                                    value={formData.description}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                                                    rows={4}
                                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Describe tu evento"
                                                />
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Fecha</label>
                                                    <input
                                                        type="date"
                                                        value={formData.date}
                                                        onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Hora</label>
                                                    <input
                                                        type="time"
                                                        value={formData.time}
                                                        onChange={(e) => setFormData((prev) => ({ ...prev, time: e.target.value }))}
                                                        className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => setStep(2)}
                                        className="w-full bg-orange-500 text-white rounded-lg py-3 px-4 hover:bg-orange-600 transition-colors font-medium hover:scale-105"
                                        type="button"
                                    >
                                        Siguiente Paso
                                    </button>
                                </div>

                            )}

                            {/* Step 2: Details and Image */}
                            {step === 2 && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Lugar</label>
                                                <input
                                                    type="text"
                                                    value={formData.venue}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, venue: e.target.value }))}
                                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Ingresa el nombre del lugar"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Capacidad</label>
                                                <input
                                                    type="number"
                                                    value={formData.capacity}
                                                    onChange={(e) => setFormData((prev) => ({ ...prev, capacity: Number(e.target.value) }))}
                                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="Ingresa la capacidad total"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Imagen del Evento</label>
                                            <div className="border-2 border-dashed border-gray-700 rounded-lg p-4">
                                                {formData.image ? (
                                                    <div className="relative">
                                                        <Image
                                                            src={formData.image}
                                                            alt="Vista Previa"
                                                            className="max-h-48 mx-auto rounded"
                                                        />
                                                        <button
                                                            type="button"
                                                            className="absolute top-2 right-2 p-1 bg-gray-900 rounded-full hover:bg-gray-800"
                                                            onClick={() => setFormData((prev) => ({ ...prev, image: null }))}
                                                        >
                                                            <X className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="py-8 text-center">
                                                        <Upload className="w-12 h-12 mx-auto text-gray-500 mb-2" />
                                                        <label
                                                            htmlFor="image-upload"
                                                            className="cursor-pointer text-orange-500 hover:text-orange-400"
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
                                </div>
                            )}

                            {/* Step 3: Ticket Types */}
                            {step === 3 && (
                                <div className="space-y-6">
                                    {formData.ticketTypes.map((ticket, index) => (
                                        <div
                                            key={index}
                                            className="flex items-end gap-4 border border-gray-700 p-4 rounded-lg"
                                        >
                                            <div className="flex-1">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Nombre del Ticket</label>
                                                <input
                                                    type="text"
                                                    value={ticket.name}
                                                    onChange={(e) => handleTicketTypeChange(index, 'name', e.target.value)}
                                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                    placeholder="ej. VIP, Estándar, Anticipado"
                                                />
                                            </div>
                                            <div className="w-32">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Precio</label>
                                                <input
                                                    type="number"
                                                    value={ticket.price}
                                                    onChange={(e) => handleTicketTypeChange(index, 'price', e.target.value)}
                                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            </div>
                                            <div className="w-32">
                                                <label className="block text-sm font-medium text-gray-300 mb-2">Cantidad</label>
                                                <input
                                                    type="number"
                                                    value={ticket.quantity}
                                                    onChange={(e) => handleTicketTypeChange(index, 'quantity', e.target.value)}
                                                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-gray-100 focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTicketType(index)}
                                                className="p-2 text-gray-400 hover:text-gray-200"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}

                                    <button
                                        type="button"
                                        onClick={handleAddTicketType}
                                        className="w-full px-4 py-3 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 text-gray-300 hover:text-white"
                                    >
                                        <Plus className="w-4 h-4" />
                                        Agregar Tipo de Ticket
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    {step > 1 && (
                        <motion.div
                            className="flex justify-between mt-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => setStep(step - 1)}
                                className="px-6 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 transition-colors"
                                disabled={isSubmitting}
                            >
                                Atrás
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="button"
                                onClick={() => step < 3 ? handleNext() : handleSubmit()}
                                className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <span className="flex items-center gap-2">
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                                        />
                                        Procesando...
                                    </span>
                                ) : (
                                    step === 3 ? 'Crear Evento' : 'Siguiente Paso'
                                )}
                            </motion.button>
                        </motion.div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}

export default function CreateEventPage() {
    return (
        <div className="flex-1">
            <CreateEventForm />
        </div>
    )
}