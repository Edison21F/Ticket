"use client"

import { motion} from "framer-motion"
import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {

  return (
    <div>

      {/* Main Content */}
      <div className="flex-1">
        

        <div className=" p-4 space-y-2">
          {/* Featured Event Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 overflow-hidden rounded-2xl bg-black/40 backdrop-blur-xl p-6"
          >
            <h2 className="mb-4 text-xl font-bold text-white">Bienvenido Administrador</h2>
            <div className="relative h-[300px] w-full rounded-xl overflow-hidden">
              <Image src="/img/admin.png" alt="Evento destacado" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
                <h3 className="text-2xl font-bold text-white">Comienza a gestionar</h3>
                <p className="text-gray-200">tus eventos y usuarios</p>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total Ventas", value: "$12,345", change: "+12%", gradient: "from-purple-500 to-pink-500" },
              { title: "Eventos Activos", value: "45", change: "+5%", gradient: "from-blue-500 to-cyan-500" },
              { title: "Usuarios Nuevos", value: "126", change: "+22%", gradient: "from-green-500 to-emerald-500" },
              { title: "Tickets Vendidos", value: "1,234", change: "+18%", gradient: "from-yellow-500 to-orange-500" },
            ].map((stat, i) => (
              <motion.div
                key={stat.title}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="border-purple-500/20 bg-black/40 backdrop-blur-xl overflow-hidden">
                  <div className={`h-1 w-full bg-gradient-to-r ${stat.gradient}`} />
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-gray-200">{stat.title}</CardTitle>
                    <motion.span
                      className="text-xs text-green-500"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      {stat.change}
                    </motion.span>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`text-2xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
                    >
                      {stat.value}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Upcoming Events */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-purple-500/20 bg-black/40 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
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
                      },
                      {
                        title: "Spiderman: No Way Home",
                        date: "22 Mar",
                        venue: "Plaza Mayor",
                        image: "/img/spiderman.jpeg",
                      },
                      {
                        title: "Metro de Quito",
                        date: "29 Mar",
                        venue: "Recreo",
                        image: "/img/metro.webp",
                      },
                    ].map((event, i) => (
                      <motion.div
                        key={event.title}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.5 }}
                        className="flex items-center gap-4 rounded-lg bg-white/5 p-3"
                      >
                        <div className="relative h-12 w-12 overflow-hidden rounded-lg">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-white">{event.title}</p>
                          <p className="text-sm text-gray-400">{event.venue}</p>
                        </div>
                        <span className="text-sm text-purple-400">{event.date}</span>
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
              whileHover={{ scale: 1.02 }}
            >
              <Card className="border-purple-500/20 bg-black/40 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    Ventas por Categoría
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        category: "Conciertos",
                        amount: "$5,234",
                        percentage: "42%",
                        gradient: "from-purple-500 to-pink-500",
                      },
                      { category: "Cine", amount: "$3,126", percentage: "25%", gradient: "from-blue-500 to-cyan-500" },
                      {
                        category: "Transporte",
                        amount: "$2,845",
                        percentage: "23%",
                        gradient: "from-green-500 to-emerald-500",
                      },
                      {
                        category: "Otros",
                        amount: "$1,140",
                        percentage: "10%",
                        gradient: "from-yellow-500 to-orange-500",
                      },
                    ].map((item, i) => (
                      <motion.div
                        key={item.category}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: i * 0.1 + 0.6 }}
                        className="flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium text-white">{item.category}</p>
                          <p className={`text-sm bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                            {item.amount}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-24 overflow-hidden rounded-full bg-gray-700">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${item.gradient}`}
                              initial={{ width: 0 }}
                              animate={{ width: item.percentage }}
                              transition={{ delay: i * 0.1 + 0.7, duration: 0.5 }}
                            />
                          </div>
                          <span className="text-sm text-gray-400">{item.percentage}</span>
                        </div>
                      </motion.div>
                    ))}
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

