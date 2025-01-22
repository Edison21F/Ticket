'use client';

import React, { useState } from 'react';
import './usuarios.css'; // Importamos el archivo de estilo global


// Definimos la interfaz para el tipo de usuario
interface Usuario {
  nombre: string;
  email: string;
  fechaRegistro: string;
  estado: string;
  rol: string;
  imagen: string;
}

const UsuariosPage = () => {
  const [searchTerm, setSearchTerm] = useState(''); // Estado para almacenar el término de búsqueda
  const [usuarios, setUsuarios] = useState<Usuario[]>([
    {
      nombre: 'Juan Pérez',
      email: 'juan.perez@example.com',
      fechaRegistro: '01/01/2025',
      estado: 'Activo',
      rol: 'Administrador',
      imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcNdEFR29DXre9LTLKm6c4tVsc8hODLXlYg&s',
    },
    {
      nombre: 'María López',
      email: 'maria.lopez@example.com',
      fechaRegistro: '15/02/2025',
      estado: 'Inactivo',
      rol: 'Usuario',
      imagen: 'https://vivolabs.es/wp-content/uploads/2022/03/perfil-mujer-vivo.png',
    },
    {
      nombre: 'Pepe Fulano',
      email: 'pepefulano@example.com',
      fechaRegistro: '18/02/2025',
      estado: 'Activo',
      rol: 'Usuario',
      imagen: 'https://st3.depositphotos.com/12985790/15794/i/450/depositphotos_157947226-stock-photo-man-looking-at-camera.jpg',
    },
    {
      nombre: 'Jombriel Choke',
      email: 'jombriefchoke@example.com',
      fechaRegistro: '28/03/2025',
      estado: 'Inactivo',
      rol: 'Usuario',
      imagen: 'https://st4.depositphotos.com/1017228/20766/i/450/depositphotos_207663178-stock-photo-image-happy-young-man-standing.jpg',
    },
    {
        nombre: 'Dana Quimbita',
        email: 'danaQ@example.com',
        fechaRegistro: '28/03/2025',
        estado: 'Inactivo',
        rol: 'Usuario',
        imagen: 'https://imagenes.20minutos.es/files/admin_user_avatar/files/fp/uploads/imagenes/2020/09/10/seray-kaya.r_d.693-430-880.jpeg',
      },
      {
        nombre: 'Steven Farinango',
        email: 'steven11@example.com',
        fechaRegistro: '28/03/2025',
        estado: 'Inactivo',
        rol: 'Usuario',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH_q5YVaicMKAFJPdvF-CLVHBleCBR4cq64Q&s',
      },
      {
        nombre: 'Diego Ortiz',
        email: 'diegoO@example.com',
        fechaRegistro: '28/03/2025',
        estado: 'Inactivo',
        rol: 'Usuario',
        imagen: 'https://st2.depositphotos.com/3776273/42867/i/450/depositphotos_428678700-stock-photo-close-up-of-handsome-adult.jpg',
      },
      {
        nombre: 'Samantha Lima',
        email: 'diegoO@example.com',
        fechaRegistro: '28/03/2025',
        estado: 'Inactivo',
        rol: 'Usuario',
        imagen: 'https://cdn.aglty.io/scotiabank-chile/sitio-publico/2024/iniciativa-mujeres/planes-lidera-mujer.png',
      },
    // Agrega más usuarios si es necesario
  ]);

  const [editingUser, setEditingUser] = useState<Usuario | null>(null); // Estado para controlar si un usuario está siendo editado
  const [editedData, setEditedData] = useState<Omit<Usuario, 'imagen' | 'fechaRegistro'> | null>(null); // Omitimos campos no editables

  // Filtramos los usuarios por nombre en función del término de búsqueda
  const filteredUsers = usuarios.filter(usuario =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para editar un usuario
  const handleEdit = (usuario: Usuario) => {
    setEditingUser(usuario);
    setEditedData({ nombre: usuario.nombre, email: usuario.email, estado: usuario.estado, rol: usuario.rol });
  };

  // Función para guardar los cambios de edición
  const handleSaveEdit = () => {
    if (editedData && editingUser) {
      setUsuarios(usuarios.map(user =>
        user === editingUser ? { ...user, ...editedData } : user
      ));
      setEditingUser(null); // Cerrar la tarjeta de edición
    }
  };

  // Función para eliminar un usuario
  const handleDelete = (usuario: Usuario) => {
    setUsuarios(usuarios.filter(user => user !== usuario));
  };

  return (
    <div className="container">
      <div className="cardHeader">Gestión de Usuarios</div>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="searchInput"
        />
      </div>

      {/* Tarjeta de edición flotante */}
      {editingUser && (
        <div className="editCard">
          <h2>Editar Usuario</h2>
          <label>
            Nombre:
            <input 
              type="text" 
              value={editedData?.nombre} 
              onChange={(e) => setEditedData({ ...editedData!, nombre: e.target.value })} 
            />
          </label>
          <label>
            Email:
            <input 
              type="email" 
              value={editedData?.email} 
              onChange={(e) => setEditedData({ ...editedData!, email: e.target.value })} 
            />
          </label>
          <label>
            Estado:
            <input 
              type="text" 
              value={editedData?.estado} 
              onChange={(e) => setEditedData({ ...editedData!, estado: e.target.value })} 
            />
          </label>
          <label>
            Rol:
            <input 
              type="text" 
              value={editedData?.rol} 
              onChange={(e) => setEditedData({ ...editedData!, rol: e.target.value })} 
            />
          </label>
          <div className="editCardButtons">
            <button onClick={handleSaveEdit}>Guardar Cambios</button>
            <button onClick={() => setEditingUser(null)}>Cancelar</button>
          </div>
        </div>
      )}

      <div className="cardContainer">
        {filteredUsers.map((usuario, index) => (
          <div key={index} className="card">
            <div className="cardInner">
              {/* Parte delantera */}
              <div className="cardFront">
                {/* Encabezado con el nombre del usuario */}
                <div className="cardTitle">{usuario.nombre}</div>
                <img
                  src={usuario.imagen}
                  alt={`${usuario.nombre}`}
                  className="image"
                />
                <div className="cardContent">
                  <p>
                    <strong>Correo:</strong> {usuario.email}
                  </p>
                  <p>
                    <strong>Fecha de Registro:</strong> {usuario.fechaRegistro}
                  </p>
                  <p>
                    <strong>Estado:</strong> {usuario.estado}
                  </p>
                  <p>
                    <strong>Rol:</strong> {usuario.rol}
                  </p>
                </div>
              </div>

              {/* Parte trasera */}
              <div className="cardBack">
                {/* Encabezado con el título "Acciones" */}
                <div className="cardTitle">Acciones</div>
                <div className="buttonContainer">
                  <button className="editButton" onClick={() => handleEdit(usuario)}>Editar</button>
                  <button className="deleteButton" onClick={() => handleDelete(usuario)}>Eliminar</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsuariosPage;
