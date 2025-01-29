"use client"

import { useState } from "react"
import { Plus, Edit, Trash2, ChevronDown } from "lucide-react"

interface Route {
  id: string
  name: string
  type: string
  city: string
  startPoint: string
  endPoint: string
  schedule: string
  capacity: number
}

export default function TransportePage() {
  const [routes, setRoutes] = useState<Route[]>([
    {
      id: "1",
      name: "Ruta Express Centro-Norte",
      type: "Bus",
      city: "Quito",
      startPoint: "Terminal Quitumbe",
      endPoint: "Terminal Norte",
      schedule: "6:00 AM - 10:00 PM",
      capacity: 40,
    },
    {
      id: "2",
      name: "Metro Línea 1",
      type: "Metro",
      city: "Quito",
      startPoint: "Quitumbe",
      endPoint: "El Labrador",
      schedule: "5:00 AM - 11:00 PM",
      capacity: 200,
    },
  ])
  
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState<string | null>(null)

  const cities = ["Quito", "Guayaquil", "Cuenca","New York"]
  const transportTypes = ["Bus", "Metro", "Avión", "Tren"]

  const handleAddRoute = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const newRoute: Route = {
      id: Date.now().toString(),
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      city: formData.get("city") as string,
      startPoint: formData.get("startPoint") as string,
      endPoint: formData.get("endPoint") as string,
      schedule: formData.get("schedule") as string,
      capacity: Number.parseInt(formData.get("capacity") as string),
    }
    setRoutes([...routes, newRoute])
    setIsDialogOpen(false)
  }

  const handleDeleteRoute = (id: string) => {
    setRoutes(routes.filter((route) => route.id !== id))
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestión de Transporte</h1>
          <p className="text-gray-400">Administra las rutas y medios de transporte</p>
        </div>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="flex items-center px-4 py-2 bg-[#E59D23] hover:bg-[#c48620] text-white rounded-md transition-colors"
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Ruta
        </button>
      </div>

      {/* Modal Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1D1E2C] text-white rounded-lg w-full max-w-2xl p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">Agregar Nueva Ruta</h2>
              <p className="text-gray-400">Ingresa los detalles de la nueva ruta de transporte</p>
            </div>
            <form onSubmit={handleAddRoute} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-sm font-medium">
                    Nombre de la Ruta
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    className="w-full px-3 py-2 bg-[#2A2B3C] border border-[#3A3B4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E59D23]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="type" className="block text-sm font-medium">
                    Tipo de Transporte
                  </label>
                  <select
                    name="type"
                    required
                    className="w-full px-3 py-2 bg-[#2A2B3C] border border-[#3A3B4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E59D23]"
                  >
                    <option value="">Seleccionar tipo</option>
                    {transportTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="city" className="block text-sm font-medium">
                    Ciudad
                  </label>
                  <select
                    name="city"
                    required
                    className="w-full px-3 py-2 bg-[#2A2B3C] border border-[#3A3B4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E59D23]"
                  >
                    <option value="">Seleccionar ciudad</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label htmlFor="capacity" className="block text-sm font-medium">
                    Capacidad
                  </label>
                  <input
                    id="capacity"
                    name="capacity"
                    type="number"
                    required
                    className="w-full px-3 py-2 bg-[#2A2B3C] border border-[#3A3B4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E59D23]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="startPoint" className="block text-sm font-medium">
                    Punto de Inicio
                  </label>
                  <input
                    id="startPoint"
                    name="startPoint"
                    required
                    className="w-full px-3 py-2 bg-[#2A2B3C] border border-[#3A3B4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E59D23]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="endPoint" className="block text-sm font-medium">
                    Punto Final
                  </label>
                  <input
                    id="endPoint"
                    name="endPoint"
                    required
                    className="w-full px-3 py-2 bg-[#2A2B3C] border border-[#3A3B4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E59D23]"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="schedule" className="block text-sm font-medium">
                    Horario
                  </label>
                  <input
                    id="schedule"
                    name="schedule"
                    required
                    className="w-full px-3 py-2 bg-[#2A2B3C] border border-[#3A3B4C] rounded-md focus:outline-none focus:ring-2 focus:ring-[#E59D23]"
                  />
                </div>
              </div>
              <div className="flex gap-2 justify-end mt-6">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#E59D23] hover:bg-[#c48620] text-white rounded-md transition-colors"
                >
                  Guardar Ruta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accordion */}
      <div className="space-y-4">
        {cities.map((city) => (
          <div key={city} className="bg-[#2A2B3C] rounded-lg border border-[#3A3B4C]">
            <button
              onClick={() => setSelectedCity(selectedCity === city ? null : city)}
              className="w-full px-4 py-3 flex items-center justify-between hover:text-[#E59D23] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">Rutas en {city}</span>
                <span className="text-sm text-gray-400">
                  ({routes.filter((route) => route.city === city).length} rutas)
                </span>
              </div>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  selectedCity === city ? "transform rotate-180" : ""
                }`}
              />
            </button>
            
            {selectedCity === city && (
              <div className="px-4 py-3 border-t border-[#3A3B4C]">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {routes
                    .filter((route) => route.city === city)
                    .map((route) => (
                      <div key={route.id} className="bg-[#1D1E2C] border border-[#3A3B4C] rounded-lg p-4">
                        <div className="flex items-center justify-between pb-2">
                          <h3 className="text-md font-medium">{route.name}</h3>
                          <div className="flex gap-2">
                            <button className="text-gray-400 hover:text-[#E59D23] p-1">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteRoute(route.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                        <div className="grid gap-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Tipo:</span>
                            <span className="text-sm">{route.type}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Capacidad:</span>
                            <span className="text-sm">{route.capacity} pasajeros</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Horario:</span>
                            <span className="text-sm">{route.schedule}</span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-[#3A3B4C]">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="text-gray-400">Ruta:</span>
                              <span>{route.startPoint}</span>
                              <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
                              <span>{route.endPoint}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}