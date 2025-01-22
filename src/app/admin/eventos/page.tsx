'use client';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Film, Music, Bus, Star, Users, MapPin, Clock, PlusCircle } from 'lucide-react';

interface EventCardProps {
  image: string;
  name: string;
  revenue: string;
  link: string;
}


const EventCard: React.FC<EventCardProps> = ({ image, name, revenue, link }) => (
  
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className="group bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow w-65"
  >
    <div className="relative h-40">
      <img
        src={image}
        alt={name}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-120 transition-transform duration-500"
      />
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-white mb-2">{name}</h3>
      <p className="text-gray-400 mb-4">Total recaudado: {revenue}</p>
      <motion.a
        whileHover={{ scale: 1.1 }}
        href={link}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold w-full block text-center transition-all"
      >
        Administrar
      </motion.a>
    </div>
  </motion.div>
);


const FeaturedEvent: React.FC = () => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative h-[500px] rounded-2xl overflow-hidden mb-16"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent" />
    <img
      src="/img/spiderman.jpeg"
      alt="Featured event"
      className="absolute inset-0 w-full h-full object-cover"
    />
    <div className="relative h-full flex flex-col justify-end p-8 md:p-12 max-w-3xl">
      <motion.div
        className="flex items-center gap-2 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        <span className="text-yellow-400 font-semibold">Evento Destacado</span>
      </motion.div>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
        Spiderman 3
        <br /> No Way Home
      </h2>
      <p className="text-gray-300 text-lg mb-6 max-w-2xl">
        El evento más vendido en el año
      </p>
      <motion.div
        className="flex flex-wrap gap-4 mb-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
          <Calendar className="w-4 h-4 text-white" />
          <span className="text-white text-sm">15 Marzo 2025</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
          <MapPin className="w-4 h-4 text-white" />
          <span className="text-white text-sm">Multicines</span>
        </div>
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
          <Users className="w-4 h-4 text-white" />
          <span className="text-white text-sm">60,000 asistentes</span>
        </div>
      </motion.div>
      <motion.button
        whileHover={{ scale: 1.1 }}
        className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2 w-fit"
      >
        Administrar
        <Clock className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

const Eventos: React.FC = () => {
  const [newEvent, setNewEvent] = useState<string>('');

  const renderCarousel = (title: string, events: EventCardProps[]) => (
    <motion.div
      initial={{ opacity: 0, x: -100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <EventCard key={index} {...event} />
        ))}
      </div>
    </motion.div>
  );

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
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <FeaturedEvent />

        {/* Crear un nuevo evento */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">¿Quieres agregar un nuevo evento?</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Escribe el nombre del evento..."
              value={newEvent}
              onChange={(e) => setNewEvent(e.target.value)}
              className="flex-1 px-4 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <a href="/admin/eventos/crear" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-semibold transition-all">Agregar</a>
          </div>
        </motion.div>




        {/* Carruseles */}
        {renderCarousel('Eventos de Cine', cineEvents)}
        {renderCarousel('Conciertos', conciertosEvents)}
        {renderCarousel('Transporte', transporteEvents)}

        {/* Servicios */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Nuestros Servicios</h2>
          <p className="text-gray-400">Explora nuestra amplia gama de servicios para eventos</p>
          <div className="flex gap-6 mt-6">
            <div className="p-6 bg-gray-800 rounded-lg text-white flex-1">
              <Film className="w-8 h-8 mb-4" />
              Servicio de Proyección
            </div>
            <div className="p-6 bg-gray-800 rounded-lg text-white flex-1">
              <Music className="w-8 h-8 mb-4" />
              Equipos de Sonido
            </div>
            <div className="p-6 bg-gray-800 rounded-lg text-white flex-1">
              <Bus className="w-8 h-8 mb-4" />
              Transporte Especial
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Eventos;
