'use client';
import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Film, Music, Bus, Star, Users, MapPin, Clock, Search, Plus } from 'lucide-react';
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
    whileHover={{ scale: 1.03, y: -5 }}
    whileTap={{ scale: 0.98 }}
    className="group relative bg-gray-800/90 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
  >
    <div className="relative h-48 overflow-hidden">
      <motion.img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.6 }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent" />
    </div>
    <div className="p-5">
      <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
      <p className="text-gray-300 mb-4">
        <span className="text-blue-400 font-semibold">Total recaudado:</span> {revenue}
      </p>
      <motion.a
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        href={link}
        className="inline-flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg font-semibold transition-colors duration-200"
      >
        <span>Administrar</span>
        <Clock className="w-4 h-4 ml-2" />
      </motion.a>
    </div>
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
            <Card className="flex-1 bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Buscar Eventos</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Buscar eventos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="flex-1 bg-gray-800/50 border-gray-700">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Nuevo Evento</h2>
                <div className="flex gap-4">
                  <Input
                    type="text"
                    placeholder="Nombre del evento..."
                    value={newEvent}
                    onChange={(e) => setNewEvent(e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
                  />
                  <Button
                    asChild
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6"
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
          <h2 className="text-3xl font-bold text-white mb-8">Nuestros Servicios</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ServiceCard
              icon={Film}
              title="Servicio de Proyección"
              description="Equipos de última generación para la mejor experiencia cinematográfica"
            />
            <ServiceCard
              icon={Music}
              title="Equipos de Sonido"
              description="Sistemas de audio profesional para eventos de cualquier escala"
            />
            <ServiceCard
              icon={Bus}
              title="Transporte Especial"
              description="Servicios de transporte seguros y puntuales para todos los eventos"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Eventos;