'use client';
import React, { useState} from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, ChevronDown, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Route {
  id: string;
  name: string;
  type: string;
  city: string;
  startPoint: string;
  endPoint: string;
  schedule: string;
  capacity: number;
}

const RouteCard: React.FC<{
  route: Route;
  onDelete: (id: string) => void;
  onEdit: (route: Route) => void;
}> = ({ route, onDelete, onEdit }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    whileHover={{ scale: 1.02 }}
    className="bg-gradient-to-br from-gray-800 via-gray-900 to-[#1A1B1F] border-l-4 border-[#E59D23] rounded-lg p-5 shadow-lg transition-all"
  >
    <div className="flex items-center justify-between pb-4 border-b border-gray-700">
      <h3 className="text-xl font-semibold text-white flex items-center gap-2">
        🚌 {route.name}
      </h3>
      <div className="flex gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => onEdit(route)}
          className="text-gray-400 hover:text-[#E59D23] p-1"
        >
          <Edit className="h-4 w-4" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => onDelete(route.id)}
          className="text-gray-400 hover:text-red-500 p-1"
        >
          <Trash2 className="h-4 w-4" />
        </motion.button>
      </div>
    </div>

    <div className="pt-4 space-y-4">
      <div className="flex items-center gap-3 text-sm">
        <div className="bg-[#E59D23]/20 text-[#E59D23] font-medium px-3 py-1 rounded-full">
          🛞 {route.type}
        </div>
        <div className="bg-blue-500/10 text-blue-400 px-3 py-1 rounded-full">
          🚻 {route.capacity} pasajeros
        </div>
      </div>

      <div className="text-sm text-gray-300 space-y-2">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-[#E59D23]" />
          <span>{route.schedule}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span className="text-white">{route.startPoint}</span>
          <ChevronDown className="h-3 w-3 rotate-[-90deg] text-gray-500" />
          <span className="text-white">{route.endPoint}</span>
        </div>
      </div>
    </div>

    {/* Línea decorativa de carretera */}
    <div className="mt-4 border-t border-dashed border-gray-600 relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 -top-3 bg-[#1A1B1F] px-2 text-xs text-gray-500">
      
      </div>
    </div>
  </motion.div>
);


const RouteForm: React.FC<{
  onSubmit: (route: Route) => void;
  initialData?: Route;
  onCancel: () => void;
}> = ({ onSubmit, initialData, onCancel }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const routeData: Route = {
      id: initialData?.id || Date.now().toString(),
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      city: formData.get("city") as string,
      startPoint: formData.get("startPoint") as string,
      endPoint: formData.get("endPoint") as string,
      schedule: formData.get("schedule") as string,
      capacity: Number(formData.get("capacity")),
    };
    onSubmit(routeData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Nombre de la Ruta</label>
          <Input
            name="name"
            defaultValue={initialData?.name}
            required
            className="bg-[#2A2B3C] border-[#3A3B4C]"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Tipo de Transporte</label>
          <Select name="type" defaultValue={initialData?.type}>
            <SelectTrigger className="bg-[#2A2B3C] border-[#3A3B4C]">
              <SelectValue placeholder="Seleccionar tipo" />
            </SelectTrigger>
            <SelectContent>
              {["Bus", "Metro", "Avión", "Tren"].map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Ciudad</label>
          <Select name="city" defaultValue={initialData?.city}>
            <SelectTrigger className="bg-[#2A2B3C] border-[#3A3B4C]">
              <SelectValue placeholder="Seleccionar ciudad" />
            </SelectTrigger>
            <SelectContent>
              {["Quito", "Guayaquil", "Cuenca", "New York"].map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Capacidad</label>
          <Input
            name="capacity"
            type="number"
            defaultValue={initialData?.capacity}
            required
            className="bg-[#2A2B3C] border-[#3A3B4C]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Punto de Inicio</label>
          <Input
            name="startPoint"
            defaultValue={initialData?.startPoint}
            required
            className="bg-[#2A2B3C] border-[#3A3B4C]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Punto Final</label>
          <Input
            name="endPoint"
            defaultValue={initialData?.endPoint}
            required
            className="bg-[#2A2B3C] border-[#3A3B4C]"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Horario</label>
          <Input
            name="schedule"
            defaultValue={initialData?.schedule}
            required
            className="bg-[#2A2B3C] border-[#3A3B4C]"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
          className="text-gray-400 hover:text-white"
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-[#E59D23] hover:bg-[#c48620] text-white"
        >
          {initialData ? 'Actualizar Ruta' : 'Crear Ruta'}
        </Button>
      </div>
    </form>
  );
};

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
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);

  const handleAddRoute = (newRoute: Route) => {
    setRoutes([...routes, newRoute]);
    setIsDialogOpen(false);
  };

  const handleEditRoute = (updatedRoute: Route) => {
    setRoutes(routes.map(route => 
      route.id === updatedRoute.id ? updatedRoute : route
    ));
    setEditingRoute(null);
  };

  const handleDeleteRoute = (id: string) => {
    setRoutes(routes.filter((route) => route.id !== id));
  };

  return (
    <div className="container mx-auto p-5">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Gestión de Transporte</h1>
          <p className="text-gray-400 mt-1">Administra las rutas y medios de transporte</p>
        </div>
        <Button
          onClick={() => setIsDialogOpen(true)}
          className="bg-[#E59D23] hover:bg-[#c48620] text-white"
        >
          <Plus className="mr-2 h-4 w-4" /> Agregar Ruta
        </Button>
      </motion.div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#1D1E2C] text-white border-[#3A3B4C]">
          <DialogHeader>
            <DialogTitle>Agregar Nueva Ruta</DialogTitle>
            <DialogDescription className="text-gray-400">
              Ingresa los detalles de la nueva ruta de transporte
            </DialogDescription>
          </DialogHeader>
          <RouteForm onSubmit={handleAddRoute} onCancel={() => setIsDialogOpen(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingRoute} onOpenChange={() => setEditingRoute(null)}>
        <DialogContent className="bg-[#1D1E2C] text-white border-[#3A3B4C]">
          <DialogHeader>
            <DialogTitle>Editar Ruta</DialogTitle>
            <DialogDescription className="text-gray-400">
              Modifica los detalles de la ruta
            </DialogDescription>
          </DialogHeader>
          {editingRoute && (
            <RouteForm
              initialData={editingRoute}
              onSubmit={handleEditRoute}
              onCancel={() => setEditingRoute(null)}
            />
          )}
        </DialogContent>
      </Dialog>

      <div className="space-y-4">
        <AnimatePresence>
          {["Quito", "Guayaquil", "Cuenca", "New York"].map((city) => {
            const cityRoutes = routes.filter((route) => route.city === city);
            if (cityRoutes.length === 0) return null;

            return (
              <motion.div
                key={city}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex-1 border border-[#3A3B4C]"
              >
                <motion.button
                  onClick={() => setSelectedCity(selectedCity === city ? null : city)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:text-[#E59D23] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg font-medium ">Rutas en {city}</span>
                    <span className="text-sm text-gray-400">
                      ({cityRoutes.length} {cityRoutes.length === 1 ? 'ruta' : 'rutas'})
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: selectedCity === city ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {selectedCity === city && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 border-t border-[#3A3B4C]">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                          <AnimatePresence>
                            {cityRoutes.map((route) => (
                              <RouteCard
                                key={route.id}
                                route={route}
                                onDelete={handleDeleteRoute}
                                onEdit={setEditingRoute}
                              />
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}