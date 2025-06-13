"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Ticket, User, Calendar, DollarSign, BarChart2, Clock, Rocket, Users, Bus, Film, MoreHorizontal, Music } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div>
      {/* Main Content */}
      <div className="flex-1">
        <div className="p-4 space-y-6">
          {/* Stats Grid with Icons */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Total Ventas",
                value: "$12,345",
                change: "+12%",
                gradient: "from-purple-500 to-pink-500",
                icon: <DollarSign className="w-5 h-5 text-pink-400" />
              },
              {
                title: "Eventos Activos",
                value: "45",
                change: "+5%",
                gradient: "from-indigo-500 to-purple-500",
                icon: <Calendar className="w-5 h-5 text-purple-400" />
              },
              {
                title: "Usuarios Nuevos",
                value: "126",
                change: "+22%",
                gradient: "from-blue-500 to-indigo-500",
                icon: <User className="w-5 h-5 text-indigo-400" />
              },
              {
                title: "Tickets Vendidos",
                value: "1,234",
                change: "+18%",
                gradient: "from-violet-500 to-purple-600",
                icon: <Ticket className="w-5 h-5 text-violet-400" />
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
              >
                <Card className="border border-purple-500/20 bg-gray-900/50 backdrop-blur-md shadow-sm overflow-hidden transition-all duration-300 hover:border-purple-500/40">
                  {/* Línea coloreada añadida aquí */}
                  <div className={`h-1 w-full bg-gradient-to-r ${stat.gradient}`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-10`} />
                  <CardHeader className="relative flex flex-row items-center justify-between pb-2 z-10">
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-lg bg-white/5 backdrop-blur-sm">
                        {stat.icon}
                      </div>
                      <CardTitle className="text-sm font-medium text-gray-200">{stat.title}</CardTitle>
                    </div>
                    <motion.span
                      className="text-xs font-semibold text-green-400"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      {stat.change}
                    </motion.span>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Welcome Card with Enhanced Design */}
          <Card className="bg-gradient-to-br from-[#121828] to-[#1F2937] border border-white/10 shadow-xl rounded-xl p-6 relative overflow-hidden">
            {/* Subtle decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-900/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-900/20 rounded-full blur-xl"></div>

            <div className="flex items-center gap-4 mb-4 relative z-10">
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                <User className="text-white w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg text-white font-semibold">¡Hola, Admin!</h2>
                <p className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> Último acceso: hace 2 horas
                </p>
              </div>
            </div>

            <CardTitle className="text-xl font-bold text-white relative z-10 flex items-center gap-2">
              <Rocket className="w-5 h-5 text-purple-400" />
              Bienvenido de vuelta
            </CardTitle>

            <CardContent className="mt-4 relative z-10">
              <p className="text-blue-100 mb-3">
                Gestiona eventos, usuarios y estadísticas desde un solo lugar. Toda la información actualizada para tomar decisiones inteligentes.
              </p>

              {/* Quick stats mini-badge */}
              <div className="flex flex-wrap gap-2 mt-4">
                <div className="bg-indigo-900/40 text-indigo-200 text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-indigo-800">
                  <Users className="w-3 h-3" /> 142 usuarios
                </div>
                <div className="bg-purple-900/40 text-purple-200 text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-purple-800">
                  <Calendar className="w-3 h-3" /> 7 eventos
                </div>
                <div className="bg-blue-900/40 text-blue-200 text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-blue-800">
                  <BarChart2 className="w-3 h-3" /> 92% eficiencia
                </div>
              </div>
            </CardContent>
          </Card>


          {/* Two Column Layout */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Upcoming Events with Ticket Design */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="border border-purple-500/20 bg-gray-900/50 backdrop-blur-md shadow-lg rounded-xl">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                    Próximos Eventos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Concierto Guardarraya en Vivo",
                        date: "15 Mar",
                        venue: "Estadio Nacional",
                        image: "/img/guardarraya.jpg",
                        category: "Concierto",
                        code: "EVT-2025-001"
                      },
                      {
                        title: "Spiderman: No Way Home",
                        date: "22 Mar",
                        venue: "Plaza Mayor",
                        image: "/img/spiderman.jpeg",
                        category: "Cine",
                        code: "EVT-2025-002"
                      },
                      {
                        title: "Metro de Quito",
                        date: "29 Mar",
                        venue: "Recreo",
                        image: "/img/metro.webp",
                        category: "Transporte",
                        code: "EVT-2025-003"
                      }
                    ].map((event, i) => (
                      <motion.div
                        key={event.title}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="relative p-4 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-500/20 shadow-md overflow-hidden"
                      >
                        {/* Perforaciones */}
                        <div className="absolute left-0 top-1/2 h-6 w-6 -translate-y-1/2 -translate-x-1/2 rounded-full bg-gray-900 border-2 border-purple-500/30"></div>
                        <div className="absolute right-0 top-1/2 h-6 w-6 -translate-y-1/2 translate-x-1/2 rounded-full bg-gray-900 border-2 border-purple-500/30"></div>

                        {/* Línea punteada central (simula corte de ticket) */}
                        <div className="absolute inset-y-0 left-1/2 w-px border-l border-dashed border-purple-500/20 opacity-20" />

                        <div className="flex items-center gap-4">
                          {/* Imagen */}
                          <div className="relative h-16 w-16 overflow-hidden rounded-lg border border-purple-500/20 shadow-sm">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              className="object-cover"
                            />
                          </div>

                          {/* Información principal */}
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-white text-sm">{event.title}</p>
                            <p className="text-xs text-purple-300/80">{event.venue}</p>
                            <span className="inline-block mt-1 text-[10px] px-2 py-0.5 bg-purple-700/30 text-purple-100 rounded-full">
                              {event.category}
                            </span>
                          </div>

                          {/* Fecha y código */}
                          <div className="text-right space-y-1">
                            <div className="text-xs text-purple-300/60">Fecha</div>
                            <div className="font-medium text-purple-200">{event.date}</div>
                            <div className="text-[10px] text-purple-400 font-mono">{event.code}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>


            {/* Sales by Category */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <Card className="border border-purple-500/20 bg-gray-900/50 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
                    Ventas por Categoría
                  </CardTitle>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-5">
                    {[
                      {
                        category: "Conciertos",
                        amount: "$5,234",
                        percentage: "47%",
                        gradient: "from-purple-500 to-pink-500",
                        icon: <Music className="w-4 h-4 text-pink-400" />
                      },
                      {
                        category: "Cine",
                        amount: "$3,126",
                        percentage: "23%",
                        gradient: "from-blue-500 to-cyan-500",
                        icon: <Film className="w-4 h-4 text-cyan-400" />
                      },
                      {
                        category: "Transporte",
                        amount: "$2,845",
                        percentage: "23%",
                        gradient: "from-indigo-500 to-blue-500",
                        icon: <Bus className="w-4 h-4 text-blue-400" />
                      },
                      {
                        category: "Otros",
                        amount: "$1,140",
                        percentage: "10%",
                        gradient: "from-violet-500 to-purple-600",
                        icon: <MoreHorizontal className="w-4 h-4 text-purple-400" />
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.category}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          delay: i * 0.1 + 0.4,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="group"
                      >
                        <div className="flex justify-between items-center mb-1.5">
                          <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-md bg-gray-800/50 border border-gray-700/50 group-hover:bg-gray-800 transition-colors">
                              {item.icon}
                            </div>
                            <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                              {item.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`text-sm font-semibold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                              {item.amount}
                            </span>
                            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-800/70 text-gray-300">
                              {item.percentage}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-800/80">
                            <motion.div
                              className={`h-full rounded-full bg-gradient-to-r ${item.gradient} shadow-[0_0_8px_var(--tw-shadow-color)]`}
                              style={{
                                boxShadow: `0 0 8px ${item.gradient.split(' ')[1].replace('from-', '#').split('-')[0]}40`
                              }}
                              initial={{ width: 0 }}
                              animate={{ width: item.percentage }}
                              transition={{
                                delay: i * 0.1 + 0.5,
                                duration: 0.8,
                                type: "spring"
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Leyenda de porcentajes */}
                  <div className="mt-6 pt-4 border-t border-gray-800/50 flex justify-between text-xs text-gray-400">
                    <span>Distribución porcentual</span>
                    <span>Actualizado: {new Date().toLocaleDateString()}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}