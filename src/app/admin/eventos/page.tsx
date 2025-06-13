'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Film, Music, Bus, Star, Users, MapPin, Clock, Search, Plus, ArrowRight, Ticket } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EventCardProps {
  image: string;
  name: string;
  revenue: string;
  link: string;
}

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const EventCard: React.FC<EventCardProps> = ({ image, name, revenue, link }) => (
  <motion.div
    variants={fadeInUp}
    whileHover={{
      scale: 1.03,
      y: -5,
      boxShadow: "0 10px 25px rgba(159, 122, 234, 0.3)"
    }}
    whileTap={{ scale: 0.98 }}
    className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300"
  >
    {/* Efecto de gradiente sutil al hacer hover */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />

    {/* Imagen con overlay mejorado */}
    <div className="relative h-48 overflow-hidden">
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/30 to-transparent" />

      {/* Badge de recaudación */}
      <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
        ${revenue}
      </div>
    </div>

    {/* Contenido de la carta */}
    <div className="p-5 relative z-10">
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 transition-all duration-300">
          {name}
        </h3>

        {/* Icono de estado (puedes personalizarlo) */}
        <div className="p-1.5 rounded-full bg-gray-700/80 group-hover:bg-purple-500/30 transition-colors duration-300">
          <Ticket className="w-5 h-5 text-purple-400" />
        </div>
      </div>

      {/* Botón con efecto mejorado */}
      <motion.a
        whileHover={{
          scale: 1.05,
          boxShadow: "0 5px 15px rgba(99, 102, 241, 0.3)"
        }}
        whileTap={{ scale: 0.95 }}
        href={link}
        className="mt-6 inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-4 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-purple-500/20"
      >
        <span>Administrar Evento</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </motion.a>
    </div>

    {/* Borde decorativo inferior */}
    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

const FeaturedEvent: React.FC = () => {
  const badgeVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    hover: { scale: 1.05 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative h-[600px] rounded-2xl overflow-hidden mb-16"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <motion.img
        src="/img/spiderman.jpeg"
        alt="Featured event"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
      />
      <div className="relative h-full flex flex-col justify-end p-12 max-w-4xl">
        <motion.div
          className="flex items-center gap-2 mb-4"
          variants={badgeVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 font-bold text-lg">Evento Destacado</span>
        </motion.div>
        <motion.h2
          className="text-6xl font-bold text-white mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Spiderman 3
          <br />
          <span className="text-blue-400">No Way Home</span>
        </motion.h2>
        <motion.p
          className="text-gray-200 text-xl mb-8 max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          El evento más vendido en el año con récord de asistencia
        </motion.p>
        <motion.div
          className="flex flex-wrap gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          {[
            { icon: Calendar, text: "15 Marzo 2025" },
            { icon: MapPin, text: "Multicines" },
            { icon: Users, text: "60,000 asistentes" }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="flex items-center gap-2 bg-white/15 backdrop-blur-md px-5 py-2.5 rounded-full"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <item.icon className="w-5 h-5 text-blue-400" />
              <span className="text-white text-sm font-medium">{item.text}</span>
            </motion.div>
          ))}
        </motion.div>
        <motion.button
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-bold inline-flex items-center gap-3 w-fit transition-colors duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Administrar Evento
          <Clock className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
};

const ServiceCard: React.FC<{ icon: React.ElementType; title: string; description: string }> = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ y: -10, scale: 1.02 }}
    className="p-8 bg-gray-800/80 rounded-xl backdrop-blur-sm"
  >
    <Icon className="w-10 h-10 text-blue-400 mb-4" />
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </motion.div>
);

const Eventos: React.FC = () => {
  const [newEvent, setNewEvent] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const renderCarousel = useCallback((title: string, events: EventCardProps[]) => (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold text-white mb-8">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <AnimatePresence>
          {events
            .filter(event => event.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((event, index) => (
              <EventCard key={index} {...event} />
            ))}
        </AnimatePresence>
      </div>
    </motion.div>
  ), [searchTerm]);

  // Your existing event data...
  const cineEvents = [
    { image: '/img/thor.jpeg', name: 'Thor: Love and Thunder', revenue: '$120,000', link: '/admin/eventos/cine' },
    { image: '/img/doctor-strange.png', name: 'Doctor Strange in the Multiverse of Madness', revenue: '$100,000', link: '/admin/eventos/cine' },
    { image: '/img/spider-man.jpg', name: 'Spider-Man: Across the Spider-Verse', revenue: '$80,000', link: '/admin/eventos/cine' },
    { image: '/img/black-panther.png', name: 'Black Panther: Wakanda Forever', revenue: '$60,000', link: '/admin/eventos/cine' },
  ];

  const conciertosEvents = [
    { image: '/img/santa-grifa.webp', name: 'Santa Grifa', revenue: '$250,000', link: '/admin/eventos/concierto' },
    { image: '/img/bad.bunny.jpg', name: 'Bad Bunny', revenue: '$200,000', link: '/admin/eventos/concierto' },
    { image: '/img/tomorrow.jpg', name: 'Tomorrowland', revenue: '$150,000', link: '/admin/eventos/concierto' },
    { image: '/img/guardarraya.jpg', name: 'Guardarraya', revenue: '$100,000', link: '/admin/eventos/concierto' },
  ];

  const transporteEvents = [
    { image: '/img/quito.jpg', name: 'Rutas de Quito', revenue: '$10,000', link: '/admin/eventos/transporte' },
    { image: '/img/playas.jpg', name: 'Rutas de Playas', revenue: '$8,000', link: '/admin/eventos/transporte' },
    { image: '/img/estados-unidos.jpg', name: 'Vuelos a Estados Unidos', revenue: '$6,000', link: '/admin/eventos/transporte' },
    { image: '/img/metro.webp', name: 'Metro de Quito', revenue: '$4,000', link: '/admin/eventos/transporte' },
  ];

  return (
    <div className="min-h-screen p-8 ">
      <div className="flex-1">
        <FeaturedEvent />

        {/* Search and Create Event Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 space-y-8"
        >
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            {/* Tarjeta de Búsqueda - Diseño mejorado */}
            <Card className="flex-1 bg-gray-800/50 border-gray-700 border border-gray-700/50 backdrop-blur-sm hover:border-purple-500/30 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Search className="w-5 h-5 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Buscar Eventos
                  </h2>
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/30 transition-all"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                </div>
              </CardContent>
            </Card>

            {/* Tarjeta de Nuevo Evento - Diseño mejorado */}
            <Card className="flex-1 bg-gray-800/50 border-gray-700 border border-gray-700/50 backdrop-blur-sm hover:border-cyan-500/30 transition-all duration-300 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <CardContent className="p-6 relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10">
                    <Plus className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                    Nuevo Evento
                  </h2>
                </div>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Nombre del evento..."
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    className="flex-1 bg-gray-700/50 border-gray-600/50 text-white placeholder:text-gray-400 focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
                  />
                  <Button
                    asChild
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold px-6 shadow-lg hover:shadow-cyan-500/20 transition-all"
                  >
                    <a href="/admin/eventos/crear">
                      <Plus className="w-5 h-5 mr-2" />
                      Crear
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Event Categories */}
        {renderCarousel('Eventos de Cine', cineEvents)}
        {renderCarousel('Conciertos', conciertosEvents)}
        {renderCarousel('Transporte', transporteEvents)}

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          {/* Título con efecto de gradiente y subrayado animado */}
          <div className="mb-10 text-center">
            <motion.h2
              className="text-4xl font-bold text-white mb-3"
              initial={{ y: -10 }}
              whileInView={{ y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Nuestros Servicios
            </motion.h2>
            <motion.div
              className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          {/* Grid de servicios con diseño mejorado */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tarjeta 1 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800/70 rounded-xl overflow-hidden border border-gray-700/50 hover:border-purple-500/50 group transition-all duration-300"
            >
              <div className="p-6">
                <div className="mb-5 p-3 inline-flex rounded-lg bg-purple-500/10 group-hover:bg-purple-500/20 transition-colors duration-300">
                  <Film className="w-8 h-8 text-purple-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                  Servicio de Proyección
                </h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  Equipos de última generación para la mejor experiencia cinematográfica
                </p>

                <div className="flex items-center text-purple-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span className="mr-2">Ver detalles</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Tarjeta 2 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800/70 rounded-xl overflow-hidden border border-gray-700/50 hover:border-cyan-500/50 group transition-all duration-300"
            >
              <div className="p-6">
                <div className="mb-5 p-3 inline-flex rounded-lg bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors duration-300">
                  <Music className="w-8 h-8 text-cyan-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  Equipos de Sonido
                </h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  Sistemas de audio profesional para eventos de cualquier escala
                </p>

                <div className="flex items-center text-cyan-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span className="mr-2">Ver detalles</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>

            {/* Tarjeta 3 */}
            <motion.div
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
              className="relative bg-gray-800/70 rounded-xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 group transition-all duration-300"
            >
              <div className="p-6">
                <div className="mb-5 p-3 inline-flex rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors duration-300">
                  <Bus className="w-8 h-8 text-blue-400" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                  Transporte Especial
                </h3>
                <p className="text-gray-400 mb-6 group-hover:text-gray-300 transition-colors duration-300">
                  Servicios de transporte seguros y puntuales para todos los eventos
                </p>

                <div className="flex items-center text-blue-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                  <span className="mr-2">Ver detalles</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Eventos;