"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, LayoutGroup } from "framer-motion"
import { Search, Edit2, Trash2, UserPlus, Filter, MoreVertical, ChevronUp, ChevronDown, Calendar, CheckCircle, Clock, Mail, Shield, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toast, Toaster } from "react-hot-toast"
import Image from "next/image"

interface Usuario {
  id: string
  nombre: string
  email: string
  fechaRegistro: string
  estado: "Activo" | "Inactivo"
  rol: "Administrador" | "Usuario"
  imagen: string
}

function AddUserForm({ onSubmit }: { onSubmit: (newUser: Omit<Usuario, "id" | "fechaRegistro">) => void }) {
  const [nombre, setNombre] = useState("")
  const [email, setEmail] = useState("")
  const [estado, setEstado] = useState<"Activo" | "Inactivo">("Activo")
  const [rol, setRol] = useState<"Administrador" | "Usuario">("Usuario")
  const [imagen, setImagen] = useState("")
  const [preview, setPreview] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPreview(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ nombre, email, estado, rol, imagen: preview || imagen }) // Usa la imagen subida o la URL manual
    setNombre("")
    setEmail("")
    setImagen("")
    setPreview(null)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400" />
      <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400" />

      {/* Vista previa de imagen */}
      {preview && <Image src={preview} alt="Vista previa" className="w-32 h-32 object-cover rounded-md mx-auto" />}

      {/* Input de archivo */}
      <Input type="file" accept="image/*" onChange={handleFileChange} className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400" />

      <Select value={estado} onValueChange={(value: "Activo" | "Inactivo") => setEstado(value)}>
        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"><SelectValue placeholder="Estado" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="Activo">Activo</SelectItem>
          <SelectItem value="Inactivo">Inactivo</SelectItem>
        </SelectContent>
      </Select>

      <Select value={rol} onValueChange={(value: "Administrador" | "Usuario") => setRol(value)}>
        <SelectTrigger className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"><SelectValue>{rol || "Rol"}</SelectValue></SelectTrigger>
        <SelectContent>
          <SelectItem value="Administrador">Administrador</SelectItem>
          <SelectItem value="Usuario">Usuario</SelectItem>
        </SelectContent>
      </Select>

      <Button type="submit">Agregar</Button>
    </form>
  )
}



function EditUserForm({ user, onSave, onCancel }: { user: Usuario; onSave: (data: FormData) => void; onCancel: () => void }) {
  const [nombre, setNombre] = useState(user.nombre)
  const [email, setEmail] = useState(user.email)
  const [estado, setEstado] = useState(user.estado)
  const [rol, setRol] = useState(user.rol)
  const [imagen, setImagen] = useState<string | null>(user.imagen || null)
  const [imagenFile, setImagenFile] = useState<File | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImagenFile(file)

      // Convertir la imagen a base64 para previsualización
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagen(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Preparar datos para enviar
    const formData = new FormData()
    formData.append("nombre", nombre)
    formData.append("email", email)
    formData.append("estado", estado)
    formData.append("rol", rol)
    if (imagenFile) {
      formData.append("imagen", imagenFile)
    }

    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
      />
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
      />

      {/* Subir Imagen */}
      <div>
        <label className="text-white">Imagen</label>
        <input type="file" accept="image/*" onChange={handleImageChange} className="w-full text-white mt-2" />
        {imagen && <Image src={imagen} alt="Vista previa" className="mt-2 h-24 w-24 object-cover rounded-lg" />}
      </div>

      <Select value={estado} onValueChange={(value: "Activo" | "Inactivo") => setEstado(value)}>
        <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-white">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Activo">Activo</SelectItem>
          <SelectItem value="Inactivo">Inactivo</SelectItem>
        </SelectContent>
      </Select>

      <Select value={rol} onValueChange={(value: "Administrador" | "Usuario") => setRol(value)}>
        <SelectTrigger className="w-full bg-gray-900/50 border-gray-700 text-white">
          <SelectValue>{rol || "Rol"}</SelectValue>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Administrador">Administrador</SelectItem>
          <SelectItem value="Usuario">Usuario</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex justify-end">
        <Button type="button" onClick={onCancel} className="mr-2 bg-gray-700 hover:bg-gray-600 text-white">
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white"
        >
          Guardar
        </Button>
      </div>
    </form>
  )
}


export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<"all" | "Activo" | "Inactivo">("all")
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      id: "1",
      nombre: "Juan Pérez",
      email: "juan.perez@example.com",
      fechaRegistro: "01/01/2025",
      estado: "Activo",
      rol: "Administrador",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcNdEFR29DXre9LTLKm6c4tVsc8hODLXlYg&s",
    },
    {
      id: "2",
      nombre: "María López",
      email: "maria.lopez@example.com",
      fechaRegistro: "15/02/2025",
      estado: "Inactivo",
      rol: "Usuario",
      imagen: "https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png",
    },
  ])

  const [editingUser, setEditingUser] = useState<Usuario | null>(null)
  const [sortField, setSortField] = useState<keyof Usuario>("nombre")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => setIsLoading(false), 1500)
  }, [])

  const filteredUsers = usuarios.filter(
    (usuario) =>
      usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterStatus === "all" || usuario.estado === filterStatus),
  )

  const sortedAndFilteredUsers = filteredUsers.sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === "asc" ? -1 : 1
    if (a[sortField] > b[sortField]) return sortDirection === "asc" ? 1 : -1
    return 0
  })

  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario)
    toast.success("Editando usuario: " + usuario.nombre)
  }

  const handleSaveEdit = () => {
    if (editingUser) {
      setUsuarios(usuarios.map((user) => (user.id === editingUser.id ? editingUser : user)))
      setEditingUser(null)
      toast.success("Usuario actualizado correctamente")
    }
  }

  const handleDelete = (id: string) => {
    setUsuarios((prev) => prev.filter((user) => user.id !== id))
    toast.error("Usuario eliminado")
  }

  const handleAddUser = (newUser: Omit<Usuario, "id" | "fechaRegistro">) => {
    const id = (usuarios.length + 1).toString()
    const fechaRegistro = new Date().toLocaleDateString()
    setUsuarios((prev) => [...prev, { ...newUser, id, fechaRegistro }])
    toast.success("Nuevo usuario agregado")
  }

  const handleSort = (field: keyof Usuario) => {
    if (field === sortField) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  return (
    <div className="flex-1 ">
      <Toaster position="top-right" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">

          <motion.h1
            className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            Gestión de Usuarios
          </motion.h1>
          <div className="flex gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por nombre..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
              />
            </div>
            <Select value={filterStatus} onValueChange={(value: "Activo" | "Inactivo") => setFilterStatus(value)}>
              <SelectTrigger className="w-40 bg-gray-900/50 border-gray-700 text-white">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Activo">Activos</SelectItem>
                <SelectItem value="Inactivo">Inactivos</SelectItem>
              </SelectContent>
            </Select>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white border-0">
                  <UserPlus className="mr-2 h-4 w-4" /> Agregar Usuario
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900 text-white border-gray-700">
                <DialogHeader>
                  <DialogTitle>Agregar Nuevo Usuario</DialogTitle>
                </DialogHeader>
                <AddUserForm onSubmit={handleAddUser} />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <LayoutGroup>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="col-span-full flex justify-center items-center h-64"
                >
                  <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </motion.div>
              ) : (
                sortedAndFilteredUsers.map((usuario) => (
                  <motion.div       //Diseñado de carta
                    key={usuario.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(159, 122, 234, 0.3)"
                    }}
                    className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden border border-gray-700/50 transition-all duration-300 group"
                  >
                    {/* Borde lateral decorativo */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${usuario.rol === "Administrador" ? "bg-gradient-to-b from-cyan-500 to-purple-500" : "bg-gradient-to-b from-purple-500 to-blue-500"}`} />

                    <div className="relative p-6 z-10 flex flex-col md:flex-row gap-6 items-start">
                      {/* Foto a la derecha (versión móvil la muestra arriba) */}
                      <div className="order-2 md:order-1 flex-1 w-full">
                        {/* Contenido textual */}
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-2xl font-bold text-white mb-1">
                                {usuario.nombre}
                              </h2>
                              <p className="text-purple-300 flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                {usuario.email}
                              </p>
                            </div>

                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-gray-400 hover:text-white bg-gray-800/50 hover:bg-purple-500/20 transition-all"
                                >
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-gray-800 border-gray-700 backdrop-blur-lg">
                                <DropdownMenuItem
                                  onClick={() => handleEdit(usuario)}
                                  className="text-white hover:bg-gray-700/50 focus:bg-gray-700/50"
                                >
                                  <Edit2 className="mr-2 h-4 w-4 text-cyan-400" /> Editar
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => handleDelete(usuario.id)}
                                  className="text-red-400 hover:bg-gray-700/50 focus:bg-gray-700/50"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" /> Eliminar
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <motion.span
                              className={`px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 ${usuario.estado === "Activo"
                                ? "bg-cyan-500/20 text-cyan-400"
                                : "bg-purple-500/20 text-purple-400"
                                }`}
                              whileHover={{ scale: 1.05 }}
                            >
                              {usuario.estado === "Activo" ? <CheckCircle className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                              {usuario.estado}
                            </motion.span>

                            <span className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-sm font-medium flex items-center gap-1">
                              {usuario.rol === "Administrador" ? <Shield className="h-4 w-4 text-cyan-400" /> : <User className="h-4 w-4 text-purple-400" />}
                              {usuario.rol}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-gray-700/50 text-gray-300 text-sm font-medium flex items-center gap-1">
                              <Calendar className="h-4 w-4 text-blue-400" />
                              {usuario.fechaRegistro}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Foto a la izquierda (derecha en móvil) */}
                      <div className="order-1 md:order-2 relative group">
                        <motion.img
                          src={usuario.imagen || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                          alt={usuario.nombre}
                          className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover border-2 border-gray-700 group-hover:border-purple-500/60 transition-all duration-300 shadow-lg"
                          whileHover={{ scale: 1.05 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        />
                        {/* Efecto de destello al hacer hover */}
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-transparent via-transparent to-transparent group-hover:via-purple-500/10 group-hover:to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    </div>

                    {/* Efecto de gradiente animado en el fondo */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex justify-center space-x-4"
        >
          <Button onClick={() => handleSort("nombre")} className="bg-gray-800 text-white hover:bg-gray-700">
            Nombre {sortField === "nombre" && (sortDirection === "asc" ? <ChevronUp /> : <ChevronDown />)}
          </Button>
          <Button onClick={() => handleSort("fechaRegistro")} className="bg-gray-800 text-white hover:bg-gray-700">
            Fecha {sortField === "fechaRegistro" && (sortDirection === "asc" ? <ChevronUp /> : <ChevronDown />)}
          </Button>
          <Button onClick={() => handleSort("estado")} className="bg-gray-800 text-white hover:bg-gray-700">
            Estado {sortField === "estado" && (sortDirection === "asc" ? <ChevronUp /> : <ChevronDown />)}
          </Button>
        </motion.div>

        {editingUser && (
          <Dialog open={!!editingUser} onOpenChange={() => setEditingUser(null)}>
            <DialogContent className="bg-gray-900 text-white border-gray-700">
              <DialogHeader>
                <DialogTitle>Editar Usuario</DialogTitle>
              </DialogHeader>
              <EditUserForm user={editingUser} onSave={handleSaveEdit} onCancel={() => setEditingUser(null)} />
            </DialogContent>
          </Dialog>
        )}
      </motion.div>
    </div>
  )
}

